/* @jsx createElement */
import {atom, autorun, once, RenderContext} from 'axii'
export function App({}, { createElement, useEffect, useLayoutEffect, createRef, createRxRef }: RenderContext) {

    const title = atom('world')
    // 说明 autorun 默认在 next micro task 中执行
    autorun(() => {
        // 修改浏览器标题
        document.title = `hello ${title()}`
    })

    once(() => {
        // return true 的时候就不执行了
    })

    useEffect(() => {
        // 一开始就执行
        return () => {
            // 卸载的时候执行
        }
    })

    useLayoutEffect(() => {
        // 挂载后就执行
        return () => {
            // 卸载的时候执行
        }
    });

    return <div style={{}}>
        <input value={title} onInput={(e: InputEvent) => title((e.target as HTMLInputElement)!.value)}/>
    </div>
}