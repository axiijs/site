import {RenderContext} from "axii";
import {editor} from "monaco-editor";

// self.MonacoEnvironment = {
//     getWorker: function (workerId, label) {
//         const getWorkerModule = (moduleUrl: string, label: string) => {
//             // @ts-ignore
//             return new Worker(self!.MonacoEnvironment!.getWorkerUrl!(moduleUrl), {
//                 name: label,
//                 type: 'module'
//             });
//         };
//
//         switch (label) {
//             case 'json':
//                 return getWorkerModule('/monaco-editor/esm/vs/language/json/json.worker?worker', label);
//             case 'css':
//             case 'scss':
//             case 'less':
//                 return getWorkerModule('/monaco-editor/esm/vs/language/css/css.worker?worker', label);
//             case 'html':
//             case 'handlebars':
//             case 'razor':
//                 return getWorkerModule('/monaco-editor/esm/vs/language/html/html.worker?worker', label);
//             case 'typescript':
//             case 'javascript':
//                 return getWorkerModule('/monaco-editor/esm/vs/language/typescript/ts.worker?worker', label);
//             default:
//                 return getWorkerModule('/monaco-editor/esm/vs/editor/editor.worker?worker', label);
//         }
//     }
// };

type MonacoProps = {
    code: string;
    options: any
    onSave?: (value: string) => void;
}

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

    })
    return container
}
