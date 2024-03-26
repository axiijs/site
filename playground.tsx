import { createRoot, createElement } from "axii";
import {Monaco} from "./src/component/AxiiSandbox/Monaco.js";
import {i} from "vite/dist/node/types.d-aGj9QkWt.js";

const searchObj = Object.fromEntries(
    window.location.search.slice(1).split('&').map(pair => pair.split('='))
)
const codeId = searchObj.codeId || 'sandbox'

const  initialCode = `
import {createRoot, createElement, atom} from 'axii'
function App({}, { createElement }) {
    const name = atom('world')
    setTimeout(() => {
        name('axii')
    }, 500)
    return <div>hello <span>{name}</span></div>
}
const root = document.getElementById('root')!
const appRoot = createRoot(root)
appRoot.render(<App/>)
`


function App() {
    let iframeRef: HTMLIFrameElement | null = null

    const onCodeSave = (code: string) => {
        console.log('code saved', code)
        console.log('set  codeId', codeId, code)
        localStorage.setItem(codeId, code)
        // reload iframe
        iframeRef!.contentWindow!.location.reload();
    }

    const rawCode = (searchObj.codeId && localStorage.getItem(codeId)) || initialCode

    const monacoOptions = {
        language:'typescript',
        value: rawCode,
        minimap:{enabled: false},
        automaticLayout: true,
        theme: 'vs-dark',
    }

    return <div style={{height:'100%', display: 'flex', alignItems:'stretch'}}>
        <div style={{width:'50%', overflow:'scroll'}}>
            <Monaco code={`console.log('hello world')`} options={monacoOptions} onSave={onCodeSave}/>
        </div>
        <div style={{width:'50%', overflow:'scroll'}}>
            {iframeRef = <iframe src={`/sandbox.html?codeId=${codeId}`} style={{width: '100%', height: '100%'}}/> as HTMLIFrameElement }
        </div>
    </div>
}

const root = document.getElementById('root')!
const appRoot = createRoot(root)
appRoot.render(<App/>)
