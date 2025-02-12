/* @jsx createElement */
import {atom, autorun, once, RenderContext, reactiveSize, reactiveScrollPosition, createReactivePosition, createReactiveDragPosition, createReactiveDragTarget} from 'axii'
export function App({}, { createElement, createStateFromRef }: RenderContext) {

    // TODO 演示 drag
    const innerScrollPosition = createStateFromRef(reactiveScrollPosition)


    return <div style={{display:'flex', flexDirection:'column', alignItems:'center'}} >
        <div>{() => `position: ${innerScrollPosition()?.scrollLeft}, ${innerScrollPosition()?.scrollTop}`}</div>
        <div  ref={innerScrollPosition.ref} style={{height:100, width:100, overflow:'scroll', border:'1px solid #fff'}}>
            <div style={{height:200, width:100, background:'gray'}}> scroll this </div>
        </div>
    </div>
}