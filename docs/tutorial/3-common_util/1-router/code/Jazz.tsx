/* @jsx createElement */
import {atom, autorun, Component, once, RenderContext} from 'axii'
import { Router } from 'data0-router'
import {RouterContext} from "./RouterContext";
export function Jazz({}, { createElement, createPortal, context }: RenderContext) {

    const router = context.get(RouterContext) as Router<Component>



    return <div style={{}}>
        jazz
    </div>
}