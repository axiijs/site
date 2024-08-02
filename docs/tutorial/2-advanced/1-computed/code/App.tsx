/* @jsx createElement */
import {atom, computed, RenderContext, RxList} from 'axii'
export function App({}, { createElement }: RenderContext) {

    const name = atom('world')
    const greeting = computed(() => `hello ${name()}`)

    const list = new RxList([1, 2, 3])
    const computedList = new RxList(() => list.map(i => i * 2))

    const remoteList = new RxList<number>(async function() {
        // TODO 提供一个远程地址
        return new Promise((resolve) => {})
    })

    return <div>
        <div>{greeting}</div>
        <div>
            {list.map((item) => <div>{item}</div>)}
        </div>
        <div>
            {computedList.map((item) => <div>{item}</div>)}
        </div>
        <div>
            <div>{() => `status: ${remoteList.status()}`}</div>
            <div>
                {remoteList.map((item) => <div>{item}</div>)}
            </div>
        </div>
    </div>
}