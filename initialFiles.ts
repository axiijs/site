export const initialFiles = {
    'index.ts': `
import {createRoot, createElement, atom} from 'axii'
import { App } from './App.tsx'
const root = document.getElementById('root')!
const appRoot = createRoot(root)
appRoot.render(<App/>)
`,
   'App.tsx': `
import {createElement, atom} from 'axii'
export function App({}, { createElement }) {
    const name = atom('world')
    setTimeout(() => {
        name('axii')
    }, 500)
    return <div>hello <span>{name}</span></div>
} 
`
}