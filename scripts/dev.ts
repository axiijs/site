import { cp, readdir, readFile, writeFile } from 'fs/promises'
import { execSync } from "node:child_process";
import {createServer, InlineConfig} from "vite";
import {default as config} from '../vite.config'
import {mkdirSync} from "fs";

async function generateFilesJSON(folder: string) {
    const contents: {[k:string]: string} = {}
    // 获取  folder 下的所有文件及内容
    const files = await readdir(folder)
    for (const file of files) {
        contents[file] = await readFile(`${folder}/${file}`, 'utf-8')

    }
    return contents
}




// 2. 将 public/docs/tutorial 下所有文件夹里的 code 下的所有文件合成一个 files.json 文件
// 遍历 tutorial 下的所有文件夹
const tutorialBase = 'docs/tutorial'
const chapters = []
for (const chapter of await readdir(tutorialBase)) {
    const sections = []
    for(const section of await readdir(`${tutorialBase}/${chapter}`)) {
        const codeFolder = `${tutorialBase}/${chapter}/${section}/code`
        // 判断是否存在 codeFolder
        try {
            await readdir(codeFolder)
        } catch (e) {
            continue
        }
        const files = await generateFilesJSON(codeFolder)
        sections.push({
            name: section,
            files
        })
    }
    chapters.push({
        name:chapter,
        sections
    })
}

// 1. copy docs/tutorials 下所有文件到 public 下
const publicBase = 'public/docs/tutorial'
execSync(`rm -rf ${publicBase}`)
// 如果 public/docs/tutorial 不存在，创建它
await mkdirSync(publicBase, {recursive: true})
await writeFile(`${publicBase}/files.json`, JSON.stringify(chapters, null, 2))


const server = await createServer({
    plugins: [
        {
            name: 'rewrite-middleware',
            configureServer(serve) {
                serve.middlewares.use((req, res, next) => {
                    if (req.url?.startsWith('/playground/')) {
                        req.url = '/playground.html'
                    }
                    next()
                })
            }
        }
    ]
})
await server.listen()

server.printUrls()
server.bindCLIShortcuts({ print: true })