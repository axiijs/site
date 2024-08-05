import {RenderContext} from "axii";
import {SingleAction} from 'data0-action'


function wait(time: number) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

export function SingleActions({}, {createElement}:RenderContext) {
    const parallelAction = new SingleAction(async (input:number) => {
        await wait(2000)
        return input+1
    })
    const p1 = parallelAction.run(1)
    const p2 = parallelAction.run(2)
    const p3 = parallelAction.run(3)

    return <div>
        <h1>single action</h1>
        <table>
            <thead>
            <tr>
                <th>name</th>
                <th>status</th>
                <th>data</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>p1</td>
                <td>{p1.status}</td>
                <td>{p1.data}</td>
            </tr>
            <tr>
                <td>p2</td>
                <td>{p2.status}</td>
                <td>{p2.data}</td>
            </tr>
            <tr>
                <td>p3</td>
                <td>{p3.status}</td>
                <td>{p3.data}</td>
            </tr>
            </tbody>
        </table>
    </div>
}
