import {
    atom,
    autorun,
    computed,
    createElement,
    createReactivePosition,
    RenderContext,
    RxList,
    RxMap,
    STATUS_CLEAN
} from "axii";
import {renderSandbox} from "./sandbox";
import {CodeMirror} from "./component/CodeMirror";
import {Button, Popover} from "axii-ui";
import {common} from "./theme";
import {Router, createBrowserHistory} from 'router0'
import DownIcon from "./icons/Down";
import {createWorkerClient} from 'data0-worker'
import {SingleAction, STATUS_ERROR, STATUS_PROCESSING, STATUS_SUCCESS} from 'data0-action'
import {LogoText} from "./icons/Text";
import '@wooorm/starry-night/style/dark'


type Section = {name: string, files: {[k:string]: string}}

type ChapterData = {
    name: string
    sections: Section[]
}

type Compiler = {
    compile(files: { [k: string]: string }): Promise<string>
}

type FlatSection = Section & {chapter:string}

type DocSection = {name: string, content: string}
type DocChapter = {name: string, sections: DocSection[]}

const BASE_URL = '/playground'


const docStyle = {
    lineHeight:1.8,
    padding:20,
    '& ul': {
        paddingLeft: 16,
        margin:0,
        display:'flex',
        flexDirection:'column',
        gap: 16
    },
    '& a': {
        color: 'white'
    },
    '& a:link': {
        color: 'white'
    },
    '& a:visited': {
        color: 'white'
    },

    '& pre': {
        border: `1px solid #fff`,
        background: 'rgba(255,255,255,0.1)',
        padding: 10,
        borderRadius: 4,
        overflow:'auto',
        fontSize: 14,
        fontFamily: 'monospace'
    }
}

const colors = {
    body: 'rgba(11,11,11)',
    panel: 'rgba(20,20,20)',
    separator: 'rgba(44,44,44)',
}

const chapterMenuStyle = {
    boxSizing:'border-box',
    width:'100%',
    padding: [20],
    fontSize:18,
    fontWeight:500,
    borderBottom: `1px solid ${colors.separator}`,
    cursor:'pointer',
    overflow:'hidden',
    ...common.layout.flexRow({gap:10, align:'center'}),
    flexWrap:'nowrap'
}

const localeMenuStyle = {
    borderRadius: 6,
    border: `1px solid ${common.colorScheme.blacks.outline}`,
    background: '#191919',
    ...common.layout.flexColumn({gap:10}),
    '& > div': {
        padding: [10, 20],
        cursor: 'pointer',
        '&:hover': {
            background: '#676767'
        }
    }
}

const locales = ['en', 'zh', 'ja']

function capitalize(str:string) {
    return `${str[0].toUpperCase()}${str.slice(1)}`
}


export function Playground({locale = 'en'} , {useLayoutEffect, createStateFromRef}: RenderContext) {

    // 1. parse url 的 query， 得到 codeURL
    const chapterURL = `/docs/tutorial/files.json`
    const chapters = new RxList<ChapterData>(async function () {
        return (await fetch(chapterURL)).json()
    })

    const docURL = `/docs/tutorial/doc.${locale}.json`
    const docChapters = new RxList<DocChapter>(async function () {
        return (await fetch(docURL)).json()
    })

    const compiler = createWorkerClient<Compiler>(new Worker(new URL('./compile.worker.ts', import.meta.url), { type:'module'}))
    // const compiler:any = {}

    const router = computed<Router<FlatSection>>(() => {
        if (chapters.status() === STATUS_CLEAN) {
            const sections: FlatSection[] = chapters.data.reduce<FlatSection[]>((last, chapter) => {
                return last.concat(chapter.sections.map(section => ({...section, chapter: chapter.name})))
            }, [])
            const router = new Router(
                sections.map(section => ({
                    path: `/${section.chapter}/${section.name}`,
                    handler: section
                })),
                createBrowserHistory(),
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

    const docContent = computed(() => {
        if (router()?.handler() && docChapters.status() === STATUS_CLEAN) {
            console.log(router()?.handler()!.chapter, router()?.handler()!.name, docChapters.data)
            return docChapters.find(chapter => chapter.name === router()!.handler()!.chapter)?.().sections.find(section => section.name === router()!.handler()!.name)?.content
        }
    })


    const files = new RxMap<string, string>(() => {
        if (!router()) return {}
        return router()!.handler()?.files || {}
    })


    const editingFile = computed<string>(() => {
        console.log('rerender editing file', router()?.searchParams().file)
        if (router()?.searchParams().file) return router().searchParams().file
        if (files.data.get('App.tsx')) return 'App.tsx'
        if (files.data.get('App.ts')) return 'App.ts'
        if (files.data.get('index.ts')) return 'index.ts'
        if (files.data.get('index.tsx')) return 'index.tsx'
        return ''
    })


    const compileAction = new SingleAction(()=> {
        return compiler.compile(Object.fromEntries(files.data.entries()))
    })

    const sandboxContent = computed<string>(() => {

        if (compileAction.latest()?.status() === STATUS_SUCCESS) {
            return renderSandbox(compileAction.latest()?.data())
        } else {
            return ''
        }
    })

    const onCodeSave = (code: string) => {
        files.set(editingFile(), code)
        compileAction.run()
    }

    autorun( () => {
        // 每次 router 变换的时候，重新编译 app
        if (router()?.handler()) {
            compileAction.run()
        }
    })

    autorun(() => {
        if (chapters.length() && !router()?.handler() ) {
            onSelectChapter(`/${chapters.at(0)!.name}/${chapters.at(0)!.sections[0].name}`)
        }
    })

    const fileNames = files.keys()
    const filesWithSelected = fileNames.createSelection(editingFile)




    const selectorPosition = createStateFromRef(createReactivePosition({type: 'interval', duration: 100}))
    const popoverVisible = atom(false)
    const align = {
        right:'right',
        top: 'bottom'
    }

    const localeButtonPosition = createStateFromRef(createReactivePosition({type: 'interval', duration: 100}))
    const localePopoverVisible = atom(false)



    const onSelectChapter = (chapterUrl:string ) => {
        // change title to `Axii Tutorial - ${chapterUrl}`
        document.title = `Axii Tutorial - ${chapterUrl}`

        router().push(chapterUrl)
        popoverVisible(false)
    }


    const onChangeLanguages = (locale:string) => {
        // 修改该 url query string locale
        router().updateSearchParams({locale})
    }

    const changeEditingFile = (file:string) => {
        router().updateSearchParams({file})
    }

    return (
        <div style={{
            height: '100%',
            color: 'white',
            background: colors.body,
            ...common.layout.middleGrow(true, 2)
        }}>
            <div style={{padding: [10, 20], borderBottom:`1px solid ${colors.separator}`, ...common.layout.flexRow({align:'center'}),...common.layout.twoSide(false), }}>
                <div style={{...common.layout.flexRow({gap:20, align:'center'})}}>
                    <a href={'/'}>
                        <img src={'/logos/axii-logo-white.svg'} width={40}/>
                    </a>
                    <a style={{...common.link}} href={'https://axii.dev/reference'}>Reference</a>
                    <a style={{...common.link}} href={'https://github.com/axiijs/axii'}>Github</a>
                </div>
                <div>
                    <Button $root:style={{...common.button}} $root:ref={localeButtonPosition.ref} $root:onClick={() => localePopoverVisible(true)}>
                        <span style={{marginRight: 10}}>Language</span>
                        <DownIcon />
                    </Button>
                    <Popover targetPosition={localeButtonPosition} visible={localePopoverVisible} align={{right:'right', top:'bottom'}}>
                        {() => (
                            <div style={localeMenuStyle}>
                                {locales.map(lang => (
                                    <div onClick={() => onChangeLanguages(lang)}>
                                        <div>{lang}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Popover>
                </div>
            </div>
            <div style={{background: colors.panel, ...common.layout.middleGrow(false, 2)}}>
                <div style={{width:'30%',borderRight:`1px solid ${colors.separator}`, background: common.colorScheme.blacks.light, overflow:'auto'}}>
                    <div>
                        <div style={chapterMenuStyle} ref={selectorPosition.ref} onclick={() => popoverVisible(true)}>
                            <span style={{flex:1, }}>
                                {() => router()?.handler() ?
                                    `${capitalize(router().handler()!.chapter.replace(/\d+-/, ''))} / ${capitalize(router().handler()!.name.replace(/\d+-/, '').replaceAll('_', ' '))}` :
                                    null
                                }
                            </span>
                            <DownIcon/>
                        </div>
                        <Popover targetPosition={selectorPosition} visible={popoverVisible} align={align}
                                 $root:style={{backgroundColor: 'rgba(0,0,0, 0.1)', backdropFilter: 'blur(1px)'}}
                        >
                            {() => (
                                <div style={{
                                    padding: 20,
                                    borderRadius: 6,
                                    border: `1px solid ${common.colorScheme.blacks.outline}`,
                                    background: '#191919',
                                    ...common.layout.flexColumn({gap:10})}}>
                                    {chapters.map(chapter => {
                                        const chapterNameArr = chapter.name.split('-')
                                        return (
                                            <div style={{}}>
                                                <div style={{marginBottom: 10, color: '#aaa', fontWeight:'bold'}}>
                                                    {chapterNameArr[0]}. {chapterNameArr[1].split('_').map(capitalize).join(' ')}
                                                </div>
                                                <div style={{paddingLeft:9, ...common.layout.flexColumn({gap:4})}}>
                                                    {chapter.sections.map(section => {
                                                        const sectionNameArr = section.name.split('-')
                                                        const style = () => ({
                                                            padding: [6, 14],
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                backgroundColor: router()?.handler()?.name === section.name ? '#fff': '#666',
                                                            },
                                                            backgroundColor: router()?.handler()?.name === section.name ? '#fff': 'transparent',
                                                            color: router()?.handler()?.name === section.name ? '#000': '#fff',
                                                        })

                                                        return (
                                                            <div
                                                                style={style}
                                                                onClick={() => onSelectChapter(`/${chapter.name}/${section.name}`)}
                                                            >
                                                                {sectionNameArr[0]}. {sectionNameArr[1].split('_').map(capitalize).join(' ')}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </Popover>
                        <div style={docStyle} dangerouslySetInnerHTML={docContent}>

                        </div>
                    </div>
                </div>

                <div style={{...common.layout.flexColumnStretched({gap: 0}), maxWidth:'100%', minWidth:0}}>
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
                                    padding: [6, 10],
                                    cursor: 'pointer',
                                    color: selected() ? '#000': '#fff',
                                    backgroundColor: selected() ? '#fff': 'transparent',
                                    '&:hover': {
                                        backgroundColor: selected() ? '#fff': '#666'
                                    }
                                })
                                return (
                                    <div style={style} onClick={() => changeEditingFile(file)}>{file}</div>
                                )
                            })}</div>
                        </div>
                        <div style={{position:'relative',flexGrow: 1, overflow:'auto', maxWidth:'100%',minWidth:0, background: common.colorScheme.blacks.dark}}>
                            {() => {
                                const ext = editingFile().split('.').pop()
                                return <CodeMirror value={files.get(editingFile())} language={ext} onSave={onCodeSave}/>
                            }}
                            <div style={{position:'absolute', right:0, bottom:0, background:'#000', color:'#999', padding:[0, 8]}}>press cmd+s to rerun</div>
                        </div>
                    </div>
                    <div style={{
                        position: 'relative',
                        height: '50%',
                        overflow: 'scroll',
                        background: common.colorScheme.blacks.dark, ...common.layout.center()
                    }}>

                        {() => {
                            const status = compileAction.latest()?.status()

                            if (sandboxContent() && status === STATUS_SUCCESS) {
                                return <iframe src={URL.createObjectURL(new Blob([sandboxContent()], {type: 'text/html'}))}
                                               style={{width: '100%', height: '100%', 'borderWidth': 0}}/> as HTMLIFrameElement
                            }

                            if( status === STATUS_ERROR) return <div>compile error</div>
                            if (status === STATUS_PROCESSING) return <div>compiling</div>
                            return <div>{status}</div>
                        }}


                        <Button
                            $root:style={{...common.button, position: 'fixed', right: 20, bottom: 20}}
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