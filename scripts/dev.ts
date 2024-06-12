import { cp, readdir, readFile, writeFile } from 'fs/promises'
import { execSync } from "node:child_process";
import {createServer} from "vite";

async function generateFilesJSON(folder: string) {
    const contents: {[k:string]: string} = {}
    // 获取  folder 下的所有文件及内容
    const files = await readdir(folder)
    for (const file of files) {
        contents[file] = await readFile(`${folder}/${file}`, 'utf-8')

    }
    return contents
}


// 1. copy docs/tutorials 下所有文件到 public 下
execSync('rm -rf public/docs')
execSync('cp -r docs public/docs')

// 2. 将 public/docs/tutorial 下所有文件夹里的 code 下的所有文件合成一个 files.json 文件
// 遍历 tutorial 下的所有文件夹
const tutorialFolders = await readdir('public/docs/tutorial')
for (const folder of tutorialFolders) {
    const codeFolder = `public/docs/tutorial/${folder}/code`
    // 判断是否存在 codeFolder
    try {
        await readdir(codeFolder)
    } catch (e) {
        continue
    }
    const files = await generateFilesJSON(codeFolder)
    // 在同一个目录下创建 files.json 并写入
    await writeFile(`${codeFolder}/files.json`, JSON.stringify(files, null, 2))
}


const server = await createServer({})
await server.listen()

server.printUrls()
server.bindCLIShortcuts({ print: true })