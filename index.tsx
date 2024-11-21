import {
    createElement,
    createRoot
} from "axii";

function App() {



    return <div>
        <div>
            <div>Axii</div>
            <div>2.6.33</div>
        </div>
        <div>
            <div>
                <div>Docs</div>
                <div></div>
            </div>
            <div>
                <div>Playground</div>
                <div>Talk is cheap, show me the code!</div>
            </div>
            <div>
                <div>API</div>
                <div></div>
            </div>
            <div>
                <div>GitHub</div>
                <div></div>
            </div>
        </div>
    </div>
}

const root = createRoot(document.getElementById('root')!)
root.render(<App/>)
