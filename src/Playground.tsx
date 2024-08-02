import {
    atom,
    autorun,
    computed,
    createElement,
    createReactivePosition,
    once,
    RenderContext,
    RxList,
    RxMap,
    STATUS_CLEAN
} from "axii";
import {compileApp} from "./compile";
import {renderSandbox} from "./sandbox";
import {CodeMirror} from "./component/CodeMirror";
import {Button, Popover, Select} from "axii-ui";
import { common } from "./theme";
import { RxRouter } from 'axii-router'
import DownIcon from "./icons/Down";

type Section = {name: string, files: {[k:string]: string}}

type ChapterData = {
    name: string
    sections: Section[]
}

type FlatSection = Section & {chapter:string}

const BASE_URL = '/playground'

export function Playground({}, {useLayoutEffect, createStateFromRef}: RenderContext) {

    // 1. parse url 的 query， 得到 codeURL
    const chapterURL = `/docs/tutorial/files.json`
    const chapters = new RxList<ChapterData>(async function () {
        return (await fetch(chapterURL)).json()
    })


    const router = computed<RxRouter<FlatSection>>(() => {
        if (chapters.status() === STATUS_CLEAN) {
            const sections: FlatSection[] = chapters.data.reduce<FlatSection[]>((last, chapter) => {
                return last.concat(chapter.sections.map(section => ({...section, chapter: chapter.name})))
            }, [])
            const router = new RxRouter(
                sections.map(section => ({
                    path: `/${section.chapter}/${section.name}`,
                    handler: section
                })),
                undefined,
                BASE_URL
            )
            router.add([{
                path: `/`,
                redirect: `/${sections[0].chapter}/${sections[0].name}`
            }])

            return router
        } else {
            return null
        }
    })


    const files = new RxMap<string, string>(() => {
        if (!router()) return {}
        console.log(router()!)
        console.log(router()!.handler())
        return router()!.handler()?.files || {}
    })

    const sandboxContent = atom('')
    const editingFile = atom('App.tsx')

    const onCodeSave = (code: string) => {
        files.set(editingFile(), code)
        sandboxContent(renderSandbox(compileApp(Object.fromEntries(files.data.entries()))!))
    }

    autorun(() => {
        // 每次 router 变换的时候，重新编译 app
        if (router()?.handler()) {
            sandboxContent(renderSandbox(compileApp(Object.fromEntries(files.data.entries()))!))
            return true
        }
    })

    const fileNames = files.keys()
    const filesWithSelected = fileNames.createSelection(editingFile)

    const colors = {
        body: 'rgba(11,11,11)',
        panel: 'rgba(20,20,20)',
        separator: 'rgba(44,44,44)',
    }


    const selectorPosition = createStateFromRef(createReactivePosition({type: 'interval', duration: 100}))
    const popoverVisible = atom(false)
    const align = {
        left:'left',
        top: 'bottom'
    }



    const onSelectChapter = (chapterUrl:string ) => {
        router().push(chapterUrl)
        popoverVisible(false)
    }

    return (
        <div style={{
            height: '100%',
            color: 'white',
            background: colors.body,
            ...common.layout.middleGrow(true, 2)
        }}>
            <div style={{padding: [10, 20], borderBottom:`1px solid ${colors.separator}`, ...common.layout.flexRow({align:'center'}),...common.layout.twoSide(false), }}>
                <div style={{...common.layout.flexRow({gap:20})}}>
                    <div>
                        Axii
                    </div>
                    <div>Tutorial</div>
                    <div>Reference</div>
                    <div>Axii UI</div>
                    <div>Axii Util</div>
                </div>
                <div>
                    <Button $root:style={{...common.textBox({ color: '#fff'})}}>Get Started</Button>
                </div>
            </div>
            <div style={{background: colors.panel, ...common.layout.middleGrow(false, 2)}}>
                <div style={{ padding: 20, borderRight:`1px solid ${colors.separator}`, background: common.colorScheme.blacks.light}}>
                    <div>
                        <div style={{cursor:'pointer',...common.layout.flexRow({gap:10, align:'center'})}} ref={selectorPosition.ref} onclick={() => popoverVisible(true)}>
                            <span>
                                {() => router()?.handler()?
                                    `${router().handler()!.chapter.replace(/\d-/, '')}/${router().handler()!.name.replace(/\d-/, '')}` :
                                    null
                                }
                            </span>
                            <DownIcon />
                        </div>
                        <Popover targetPosition={selectorPosition} visible={popoverVisible} align={align}>
                            {() => (
                                <div style={{padding: 20, borderRadius:4, border:`1px solid ${common.colorScheme.blacks.outline}`, background: common.colorScheme.blacks.lighter,...common.layout.flexColumn({gap:10})}}>
                                    {chapters.map(chapter => (
                                        <div style={{}}>
                                            <div style={{marginBottom: 10}}>{chapter.name.replace('-', '. ')}</div>
                                            <div style={{paddingLeft:20, ...common.layout.flexColumn({gap:10})}}>
                                                {chapter.sections.map(section => (
                                                    <div
                                                        style={() => ({cursor:'pointer',textDecoration: router()?.handler()?.name === section.name ? 'underline' : 'none'})}
                                                        onClick={() => onSelectChapter(`/${chapter.name}/${section.name}`)}
                                                    >
                                                        {section.name.replace('-', '. ')}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Popover>

                    </div>
                </div>

                <div style={{...common.layout.flexColumnStretched({gap: 0})}}>
                    <div style={{
                        height: '50%',
                        overflow: 'scroll',
                        borderBottom: `1px solid ${colors.separator}`,
                        ...common.layout.flexRow({gap: 0}),
                        flexWrap: 'nowrap'
                    }}>
                        <div style={{
                            flexGrow: 0,
                            flexShrink: 0,
                            borderRight: `1px solid ${colors.separator}`,
                            background: common.colorScheme.blacks.light,
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
                        <div style={{flexGrow: 1, background: common.colorScheme.blacks.dark}}>
                            {() => {
                                const ext = editingFile().split('.').pop()
                                return <CodeMirror value={files.get(editingFile())} language={ext} onSave={onCodeSave}/>
                            }}
                        </div>
                    </div>
                    <div style={{position: 'relative',height: '50%', overflow: 'scroll', background: common.colorScheme.blacks.dark, ...common.layout.center()}}>
                        {() => sandboxContent() ?
                            <iframe src={URL.createObjectURL(new Blob([sandboxContent()], {type: 'text/html'}))}
                                    style={{width: '100%', height: '100%', 'borderWidth': 0}}/> as HTMLIFrameElement :
                            <div style={{...common.layout.center(),color:'#fff'}}>loading...</div>
                        }
                        <Button
                            $root:style={{position:'fixed', right:20, bottom:20}}
                            $root:onClick={() => window.open(`/sandbox.html?code=${router().handler()!.chapter}/${router()!.handler()!.name}`)}
                        >
                            open
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}