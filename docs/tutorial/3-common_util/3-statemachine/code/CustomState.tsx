import {atom, RenderContext} from "axii";
import {State} from 'statemachine0'

export class CustomState extends State {
    public entered = atom(0)
    constructor(public name = 'custom') {
        super(name)
    }

    onEnter() {
        this.entered(this.entered.raw + 1)
    }

    onExit() {
    }
}

