import {atom, autorun, computed, createElement, RenderContext, RxMap} from "axii";
import {compileApp} from "./compile";
import {renderSandbox} from "../sandbox";
import {common} from "axii-ui/themes/inc.js";
import {CodeMirror} from "./component/CodeMirror";

export function Playground({}, {useLayoutEffect}: RenderContext) {
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
        sandboxContent(renderSandbox(compileApp(Object.fromEntries(files.data.entries()))!))
    }

    const fileNames = files.keys()
    const filesWithSelected = fileNames.createSelection(editingFile)

    const colors = {
        body: 'rgba(11,11,11)',
        panel: 'rgba(20,20,20)',
        separator: 'rgba(44,44,44)',
    }

    useLayoutEffect(() => {
        computed(() => {
            if (!sandboxContent() && files.size()!==0) {
                sandboxContent(renderSandbox(compileApp(Object.fromEntries(files.data.entries()))!))
            }
        })
    });

    return (
        <div style={{
            height: '100%',
            color: 'white',
            background: colors.body,
            ...common.layout.middleGrow(true, 2)
        }}>
            <div style={{height: 50, borderBottom:`1px solid ${colors.separator}`}}> header</div>
            <div style={{background: colors.panel, ...common.layout.middleGrow(false, 2)}}>
                <div style={{width: 100, borderRight:`1px solid ${colors.separator}`}}>docs</div>
                <div style={{...common.layout.flexColumnStretched({gap: 0})}}>
                    <div style={{height: '50%', overflow: 'scroll', borderBottom:`1px solid ${colors.separator}`, ...common.layout.flexRow({gap: 0})}}>
                        <div style={{
                            flexGrow: 0,
                            flexShrink: 0,
                            ...common.layout.flexColumnStretched({gap: common.sizes.space.itemGap()})
                        }}>
                            <div>{filesWithSelected.map(([file, selected]) => {
                                const style = () => ({
                                    padding: '10px',
                                    cursor: 'pointer',
                                    color: selected() ? 'rgba(120, 86, 255, 1)': 'white',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
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
                                    style={{width: '100%', height: '100%', 'borderWidth': 0}}/> as HTMLIFrameElement :
                            <div style={{...common.layout.center()}}>loading...</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}