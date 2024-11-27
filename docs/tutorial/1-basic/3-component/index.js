
import {createRoot, createElement} from 'axii';
import Content from './doc.js';

export function render(el){
    createRoot(el).render(createElement(Content))
}

