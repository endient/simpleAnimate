import BubbleControl from "./BubbleControl.js"
import SquareControl from "./SquareControl.js"

class Main {
    constructor() {
        this.scapes = {
            bubble: { name: "Bubble", func: BubbleControl.init },
            square: { name: "Square", func: SquareControl.init },
        }
    }
    static get init() { return new Main() }

    changeType() {
        const buttons = document.getElementsByClassName("buttons")
        for (let i = 0; i < buttons.length; i++)
            buttons[i].addEventListener("click", e => console.log(e.target.id))

        return this
    }
}

BubbleControl.init.loop()
Main.init.changeType()