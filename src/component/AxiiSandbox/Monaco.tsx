import {RenderContext} from "axii";
import {editor, languages} from "monaco-editor";
// @ts-ignore
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
// @ts-ignore
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
// @ts-ignore
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
// @ts-ignore
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === 'json') {
            return new jsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker()
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker()
        }
        return new editorWorker()
    }
}
type MonacoProps = {
    code: string;
    options: any
    onSave?: (value: string) => void;
}

// TODO language options
languages.typescript.typescriptDefaults.setCompilerOptions({
    jsx: languages.typescript.JsxEmit.React,
    jsxFactory: 'createElement',
    jsxFragmentFactory: 'Fragment',
})

export function Monaco({ code, options, onSave }: MonacoProps, { createElement, useLayoutEffect }: RenderContext) {
    let editorInstance: ReturnType<typeof editor.create>
    const container = <div
        style={{height:'100%', width:'100%'}}
        onResize={() => editorInstance?.layout()}
    ></div> as HTMLElement
 

    useLayoutEffect(() => {
        editorInstance = editor.create(container, options);
        editorInstance.layout()
        editorInstance.onKeyDown((e) => {
            if (e.keyCode === 49 /** KeyCode.KeyS */ && (e.ctrlKey||e.metaKey)) {
                e.preventDefault()
                onSave?.(editorInstance.getValue());
            }
        });


        return () => {
            editor.getModels().forEach(model => model.dispose());
            editorInstance.dispose()
        }
    })
    return container
}
