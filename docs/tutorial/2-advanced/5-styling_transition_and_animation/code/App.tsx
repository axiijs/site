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
            background:'blue'
        },
        // 支持嵌套
        '& span': {
            color: 'white'
        },
        // 支持 @ rule
        '@keyframes': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(359deg)' }
        },
        lineHeight: 0,
        animation: `@self 4s linear infinite`,
        transformOrigin: 'center center',
    }

    // TODO 通过数组实现开始形式的 transition

    return <div style={style}><span>in component</span></div>
}