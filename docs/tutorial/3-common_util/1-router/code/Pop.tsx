/* @jsx createElement */
import {atom, autorun, Component, ContextProvider, once, RenderContext} from 'axii'
import { Router } from 'data0-router'
import {RouterContext} from "./RouterContext";
import {PopItem} from "./PopItem";
export function Pop({}, { createElement, createPortal, context }: RenderContext) {

    const router = context.get(RouterContext) as Router<Component>
    router.add([{
        path: '/:id',
        handler: PopItem
    }, {
        path: '/',
        redirect: '/1'
    }])

    return <div style={{}}>
        <button onClick={() => router.push('/1')}>1</button>
        <button onClick={() => router.push('/2')}>2</button>
        <button onClick={() => router.push('/3')}>3</button>
        <button onClick={() => router.push('/4')}>4</button>
        <button onClick={() => router.push('/5')}>5</button>
        {() => {
            const Content = router.handler()
            if (!Content) {
                return <div>not found</div>
            }
            return <Content {...router.params()}/>
        }}
    </div>
}