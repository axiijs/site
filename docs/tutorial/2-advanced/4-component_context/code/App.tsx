/* @jsx createElement */
import {atom, RenderContext} from 'axii'
export function App({}, { createElement }: RenderContext) {
    const name = atom('world')
    setTimeout(() => {
        name('axii')
    }, 500)
    return <div>hello <span>{name}</span></div>
}