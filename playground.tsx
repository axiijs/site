import {createElement, createRoot} from "axii";
import {Playground} from "./src/Playground";

// 从 url query string 中读取 locale
const urlParams = new URLSearchParams(window.location.search);
const locale = urlParams.get('locale') || 'en'

const root = document.getElementById('root')!
const appRoot = createRoot(root)
appRoot.render(<Playground locale={locale}/>)
console.log('rendering.....')