/* @jsx createElement */
import {atom, RenderContext} from 'axii'
import {Advanced} from "./Advanced";
import {Simple} from "./Simple";

export function App({}, { createElement }: RenderContext) {
    const name = atom('world')
    return <div>
        <Simple foo={name}>children from parent</Simple>
        <Advanced/>
    </div>
}