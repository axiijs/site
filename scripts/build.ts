import {cp, readdir, readFile, writeFile, rm} from 'fs/promises'
import {execSync} from "node:child_process";
import { fileURLToPath} from "url";
import rehypeStarryNight from 'rehype-starry-night'
import {mkdirSync, existsSync} from "fs";
import { compile } from '@mdx-js/mdx'
import {build, defineConfig} from 'vite'
import * as path from "node:path";
import { JSDOM } from 'jsdom'
const globalDOM = new JSDOM(`<!DOCTYPE html>`)
global.document = globalDOM.window.document
global.Comment = globalDOM.window.Comment;
global.Text = globalDOM.window.Text;
global.HTMLElement = globalDOM.window.HTMLElement;
global.SVGElement = globalDOM.window.SVGElement;
global.DocumentFragment = globalDOM.window.DocumentFragment;
global.Node = globalDOM.window.Node;
global.HTMLOptionElement = globalDOM.window.HTMLOptionElement;
global.HTMLSelectElement = globalDOM.window.HTMLSelectElement;

import ResizeObserver from 'resize-observer-polyfill'
global.ResizeObserver = ResizeObserver
const { createRoot, createElement } = await import("axii");



const locales = ['zh', 'en', 'ja']

async function generateFilesJSON(folder: string) {
    const contents: {[k:string]: string} = {}
    // 获取  folder 下的所有文件及内容
    const files = await readdir(folder)
    for (const file of files) {
        contents[file] = await readFile(`${folder}/${file}`, 'utf-8')
    }
    return contents
}


async function writeEntries(entryFolder:string, entryJsContent:string) {
    const jsEntry = path.join(entryFolder, 'index.js')
    const docEntry = path.join(entryFolder, 'doc.js')
    await writeFile(jsEntry, `
import {createRoot, createElement} from 'axii';
import Content from './doc.js';

export function render(el){
    createRoot(el).render(createElement(Content))
}

`)
    await writeFile(docEntry, entryJsContent)

    return { jsEntry, docEntry}
}

async function generateHTML(inputFile: string) {
    if (existsSync(inputFile)) {
        const content = (await readFile(inputFile, 'utf-8')) || ''
        console.log(content)

        const compiledContent = String(await compile(content, {jsxImportSource:'axii', rehypePlugins: [rehypeStarryNight]}))
        const docEntry = path.join(path.dirname(inputFile), 'doc.js')
        await writeFile(docEntry, compiledContent)


        const outDir = path.join( path.dirname(inputFile), 'dist')
        console.log(`build for ${inputFile}`)
        await build({
            configFile:false,
            root: path.dirname(inputFile),
            esbuild: {
                jsxFactory: 'createElement',
                jsxFragment: 'Fragment',
            },
            build: {
                emptyOutDir:true,
                copyPublicDir:false,
                lib:false,
                rollupOptions: {
                    input: {
                        index: docEntry
                    }
                },
                outDir:outDir,
                ssr: true,
            },
        })

        console.log(await readFile(path.join(outDir, 'index.js'), 'utf-8'))
        const Content = (await import(`${path.join(outDir, 'index.js')}?t=${performance.now()}`)).default
        const dom = new JSDOM(`<html><body><div></div></body></html>`)
        dom.window.document.body.firstElementChild!.innerHTML = ''
        createRoot(dom.window.document.body.firstElementChild as HTMLElement).render(createElement(Content, {}))
        // const [appHTML] = await render(path.join(outDir, 'index.html'), ssrManifest)

        await rm(docEntry)
        await rm(outDir, { force:true, recursive:true})
        console.log(dom.window.document.body.innerHTML.replace(/<!--[\s\S]*?-->/g, ''))
        return dom.window.document.body.innerHTML.replace(/<!--[\s\S]*?-->/g, '')

        // return appHTML
    }

    return ''
}

type DocSection = {name:string, content:string}
type DocChapter = {name:string, sections:DocSection[]}

// 2. 将 public/docs/tutorial 下所有文件夹里的 code 下的所有文件合成一个 files.json 文件
// 遍历 tutorial 下的所有文件夹
const tutorialBase = path.join(process.cwd(), 'docs/tutorial')
const codeByChapters = []
const docByChapters = Object.fromEntries(locales.map(l => [l, [] as DocChapter[]]))
for (const chapter of await readdir(tutorialBase)) {
    const codeSections = []
    const docSections = Object.fromEntries(locales.map(l => [l, [] as DocSection[]]))
    for(const section of await readdir(`${tutorialBase}/${chapter}`)) {
        const codeFolder = `${tutorialBase}/${chapter}/${section}/code`
        // 判断是否存在 codeFolder
        try {
            await readdir(codeFolder)
        } catch (e) {
            continue
        }
        const files = await generateFilesJSON(codeFolder)

        codeSections.push({
            name: section,
            files,
        })

        for(const locale of locales) {
            const inputDoc = `${tutorialBase}/${chapter}/${section}/doc.${locale}.mdx`
            console.log(locale, inputDoc)
            const docContent = await generateHTML(inputDoc)

            docSections[locale].push({
                name:section,
                content:docContent
            })
        }
    }
    codeSections.sort((a, b) => {
        return parseInt(a.name.split('-')[0], 10) - parseInt(b.name.split('-')[0], 10)
    })
    codeByChapters.push({
        name:chapter,
        sections: codeSections
    })

    for(const locale of locales) {
        docSections[locale].sort((a, b) => {
            return parseInt(a.name.split('-')[0], 10) - parseInt(b.name.split('-')[0], 10)
        })
        docByChapters[locale].push({
            name:chapter,
            sections: docSections[locale]
        })
    }
}

codeByChapters.sort((a, b) => {
    return parseInt(a.name.split('-')[0], 10) - parseInt(b.name.split('-')[0], 10)
})

for(const local of locales) {
    docByChapters[local].sort((a, b) => {
        return parseInt(a.name.split('-')[0], 10) - parseInt(b.name.split('-')[0], 10)
    })
}


// 1. copy docs/tutorials 下所有文件到 public 下
const publicBase = 'public/docs/tutorial'
execSync(`rm -rf ${publicBase}`)
// 如果 public/docs/tutorial 不存在，创建它
await mkdirSync(publicBase, {recursive: true})
await writeFile(`${publicBase}/files.json`, JSON.stringify(codeByChapters, null, 2))
// console.log(JSON.stringify(docByChapters, null, 2))
for(const local of locales) {
    await writeFile(`${publicBase}/doc.${local}.json`, JSON.stringify(docByChapters[local], null, 2))
}

// 2. copy api dir
const apiBase = 'docs/api'
const publicApiBase = 'public/docs/api'
execSync(`rm -rf ${publicApiBase}`)
await mkdirSync(publicApiBase, {recursive: true})
await cp(apiBase, publicApiBase, { recursive: true })
