import {createElement, createRoot} from "axii";
import {Playground} from "./src/Playground";


const root = document.getElementById('root')!
const appRoot = createRoot(root)
appRoot.render(<Playground/>)
