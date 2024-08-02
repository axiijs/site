/* @jsx createElement */
import {atom, RenderContext} from 'axii'
export function App({}, { createElement }: RenderContext) {

    const style= {
        // 普通形式，支持 数组
        margin: 10,
        // 支持数组形式
        padding: [10, 20],
        // 支持嵌套+伪类
        '&:hover': {
            background:'red'
        },
        // 支持嵌套
        '& span': {
            color: 'red'
        },
        // 支持 @ rule
        '@keyframes': {
            'from': {
                opacity: 0
            },
            'to': {
                opacity: 1
            }
        },
        animation: '1s @self infinite infinite'
    }

    // TODO 通过数组实现开始形式的 transition

    return <div style={style}><span>in component</span></div>
}