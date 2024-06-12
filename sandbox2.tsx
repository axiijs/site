import * as axii from "axii";
import typescript from 'typescript'

const globalImports: {[k:string]: any} = {
    axii
}

// 1. parse code id from query
const searchObj = Object.fromEntries(
    window.location.search.slice(1).split('&').map(pair => pair.split('='))
)
const codeId = searchObj.codeId || 'sandbox'

// 从 localStorage 中获取代码
const rawCode = localStorage.getItem(codeId) || ''

const code = typescript.transpile(rawCode, {
    jsx: typescript.JsxEmit.React,
    "jsxFactory": "createElement",
    "jsxFragmentFactory": "Fragment"
})

eval(`
    const require = function (path) {
        return globalImports[path]
    };
    const exports = {};
    ${code}
`)


