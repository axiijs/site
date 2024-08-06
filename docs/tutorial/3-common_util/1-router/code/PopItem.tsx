/* @jsx createElement */
import {atom, autorun, Component, once, RenderContext} from 'axii'
import { Router } from 'data0-router'
import {RouterContext} from "./RouterContext";

type Props = {
    id:string
}
export function PopItem({ id }:Props, { createElement, createPortal, context }: RenderContext) {

    return <div style={{}}>
        {`pop item ${id}`}
    </div>
}