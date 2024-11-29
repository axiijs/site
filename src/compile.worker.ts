/* @vite-ignore */
// import Babel from "@babel/standalone";
// const Babel = require("@babel/standalone");
import * as Babel from '@babel/standalone'
import {PluginObj} from "@babel/core";
import {createWorkerHost} from "data0-worker";

const INDEX_FILE = 'index.tsx'

function compileFile(filename: string, code: string, plugins: any[] = []) {
    console.log('compiling file', filename)
    return Babel.transform(code, {
        presets: [
            ['react', {
                pragma: 'createElement',
                pragmaFrag: 'Fragment',
                throwIfNamespace: false,
                development: true,
                useBuiltIns: true,
                isTSX: true,
                allExtensions: true
            }],
            [
                'typescript',
                {jsxPragma: 'createElement', jsxPragmaFrag: 'Fragment', isTSX: true, allExtensions: true}
            ]
        ],
        filename,
        plugins,
    }).code
}

export class AppCompiler {
    compile(files: { [k: string]: string }) {
        console.log("compiling", files)
        const indexCode = files[INDEX_FILE]!

        const compiledFiles = Object.fromEntries(
            [...Object.entries(files)]
                .filter(([filename]) => filename !== INDEX_FILE)
                .map(([filename, code]) => {
                    const replacedFileName = filename.replace(/\.(ts|tsx|jsx)$/, '.js')
                    return [replacedFileName.replace(/\.(ts|tsx|jsx)$/, '.js'), compileFile(replacedFileName, code)]
                })
        )


        const importTransformedFileBlobURLs: { [k: string]: string } = {}

        const importTransformPlugin: PluginObj = {
            visitor: {
                ImportDeclaration(path) {
                    const originalUrl = path.node.source.value
                    if (!originalUrl.startsWith('./')) return

                    const filename = originalUrl.replace(/^\.\//, '')
                    if (!importTransformedFileBlobURLs[filename] && compiledFiles[filename]) {
                        // 这里再调用一次 compileFile 是为了使用 importTransformPlugin 递归替换其中的 import 引用。
                        const compiledFile = compileFile(filename, compiledFiles[filename]!, [importTransformPlugin])!
                        console.log('compiling file', filename, 'for import', originalUrl)
                        console.log('compiled file', filename, compiledFile)

                        importTransformedFileBlobURLs[filename] = URL.createObjectURL(new Blob([compiledFile], {type: 'text/javascript'}))
                    }

                    if (importTransformedFileBlobURLs[filename]) {
                        path.node.source.value = importTransformedFileBlobURLs[filename];
                    } else {
                        console.warn(`file ${filename} not found`)
                    }
                }
            },
        }

        return compileFile(INDEX_FILE, indexCode, [importTransformPlugin])
    }
}

createWorkerHost(new AppCompiler())