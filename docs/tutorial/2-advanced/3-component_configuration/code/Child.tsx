import {RenderContext} from "axii";

export function Child({}, {createElement}: RenderContext) {
    return (
        <div as="root">
            <input as={"main"}></input>
            <button as={"trigger"}></button>
        </div>
    )
}
