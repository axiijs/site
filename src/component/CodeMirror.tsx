import {createElement, atom, Atom, FixedCompatiblePropsType, RenderContext, PropTypes, PropsType, onKey} from 'axii'

import {basicSetup} from "codemirror"
import {EditorView, keymap} from "@codemirror/view"
import {javascript,} from "@codemirror/lang-javascript"
import {dracula as theme} from "thememirror"

const CodeMirrorPropTypes = {
    value: PropTypes.atom<string>().default(() => atom('')),
    language: PropTypes.atom<string>().default(() => atom('javascript')),
    onSave: PropTypes.function,
}


function langToPlugin(lang: string) {
    if (lang === 'javascript' || lang === 'js') {
        return javascript()
    } else if (lang === 'typescript' || lang === 'ts') {
        return javascript({ typescript: true})
    } else if (lang === 'jsx') {
        return javascript({ jsx: true})
    } else if (lang === 'tsx') {
        return javascript({ jsx: true, typescript: true})
    }
}


export function CodeMirror(props:  FixedCompatiblePropsType<typeof CodeMirrorPropTypes>, {createElement, createRef, useLayoutEffect}: RenderContext) {
    const { value, language, onSave } = props as PropsType<typeof CodeMirrorPropTypes>
    const container = createRef()
    let editor:EditorView|undefined

    useLayoutEffect(() => {
        editor = new EditorView({
            doc: value(),
            extensions: [
                basicSetup,
                theme,
                langToPlugin(language()) ?? javascript(),
            ],
            parent: container.current
        })

        return () => {
            editor!.destroy()
        }
    })

    const onSaveKeyDown = onKey('s', {meta: true})((e:KeyboardEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onSave?.(editor!.state.doc.toString())
    })
    return <div as='root' ref={container} onkeydown={onSaveKeyDown}></div>

}

CodeMirror.propTypes = CodeMirrorPropTypes

