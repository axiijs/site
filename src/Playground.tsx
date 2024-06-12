import {atom, autorun, createElement, RxMap} from "axii";
import {compileApp} from "./compile";
import {renderSandbox} from "../sandbox";
import {common} from "axii-ui/themes/inc.js";
import {CodeMirror} from "./component/CodeMirror";

export function Playground() {
    // 1. parse url 的 query， 得到 codeURL
    const codeURL = (new URLSearchParams(window.location.search).get('codeURL')) || 'docs/tutorial/1_1_introduction/code'


    const files = new RxMap<string, string>(async function () {
        console.log('fetching', `${codeURL}/files.json`)
        return (await fetch(`${codeURL}/files.json`)).json()
    })

    const sandboxContent = atom('')
    const editingFile = atom('index.tsx')

    const onCodeSave = (code: string) => {
        files.set(editingFile(), code)
        const codeTransformed = compileApp(
            Object.fromEntries(files.data.entries())
        )
        sandboxContent(renderSandbox(codeTransformed!))
    }

    const fileNames = files.keys()

    autorun(() => {
        console.log('111 files', files.entries().toArray())
        console.log('2222', fileNames.toArray())
    })


    const filesWithSelected = fileNames.createSelection(editingFile)

    return <div style={{height: '100%', ...common.layout.flexColumnStretched({gap: 0})}}>
        <div style={{height: '50%', overflow: 'scroll', ...common.layout.flexRow({gap: 0})}}>
            <div style={{
                flexGrow: 0,
                flexShrink: 0, ...common.layout.flexColumnStretched({gap: common.sizes.space.itemGap()})
            }}>
                <div>{filesWithSelected.map(([file, selected]) => {
                    const style = () => ({
                        ...common.listItem,
                        textDecoration: selected() ? 'underline' : 'none',
                    })
                    return (
                        <div style={style} onClick={() => editingFile(file)}>{file}</div>
                    )
                })}</div>
            </div>
            <div style={{flexGrow: 1, background: '#2d2f3f'}}>
                {() => {
                    const ext = editingFile().split('.').pop()
                    return <CodeMirror value={files.get(editingFile())} language={ext} onSave={onCodeSave}/>
                }}
            </div>
        </div>
        <div style={{height: '50%', overflow: 'scroll', color: 'black', ...common.layout.center()}}>
            {() => sandboxContent() ?
                <iframe src={URL.createObjectURL(new Blob([sandboxContent()], {type: 'text/html'}))}
                        style={{width: '100%', height: '100%'}}/> as HTMLIFrameElement :
                <div style={{...common.layout.center()}}>loading...</div>
            }
        </div>
    </div>
}