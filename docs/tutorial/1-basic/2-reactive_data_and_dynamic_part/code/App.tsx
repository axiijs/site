/* @jsx createElement */
import {atom, RenderContext, RxList} from 'axii'
export function App({}, { createElement }: RenderContext) {
    const newItem = atom('')
    const items = new RxList<string>([])
    const onClickAdd = (e:any) => {
        items.push(newItem())
        newItem('')
    }
    return (
        <div>
            <div>
                <input value={newItem} onInput={(e:any) => newItem(e.target.value)}/>
                <button onClick={onClickAdd}>add</button>
            </div>
            <div>
                {items.map((item) => {
                    return <div>{item}</div>
                })}
            </div>
        </div>
    )
}