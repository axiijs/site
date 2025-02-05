/* @jsx createElement */
import {atom, RenderContext} from 'axii'
import { Child } from "./Child";

export function App({}, { createElement }: RenderContext) {
    const name = atom('world')


    return (
        <Child
            $main:value ={name}
            $root:style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
            $main:_style={() => ({border: '1px solid black', padding: '10px'})}
            // TODO use/props/_props 还有什么？？？
        />
    )
}