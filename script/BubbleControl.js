import Draw from "./Draw.js"
import Bubble from "./Bubble.js"

class BubbleControl {
    constructor(canvas) {
        this.canvas = canvas
                /** 所有圓圈 */ this.bubbles = []
                /** 產生新圓圈的機率 */ this.buildbubbleRate = { rate: 0.992, num: 1 }
                /** 動畫開關（關閉不會直接消失） */ this.animateSwitch = true
                /** 直接中止 */ this.terminate = false
    }
    static get init() {
        const canvas = document.getElementById("canvas")
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth

        return new BubbleControl(canvas).resetSize()
    }
    set Switch(bool) {
        this.animateSwitch = !!bool
        return this
    }

    /** 令視窗尺寸改變時可以同步調整 canvas 的大小 */
    resetSize() {
        window.addEventListener("resize", () => {
            this.canvas.height = window.innerHeight
            this.canvas.width = window.innerWidth
        })

        return this
    }

    /** 增加圓圈進列表中 */
    addBubble(num) {
        for (let i = 0; i < num; i += 1)
            this.bubbles.push(Bubble.init)

        return this
    }

    /** 更新所有 bubbles 列表中的圓圈，並刪除其中不合條件的 */
    updateList() {
        const updateBubble = idx => {
            const bubble = this.bubbles[idx]
            if (!bubble) return

            bubble.update()
            if (bubble.IsFadeTimesOver) {
                this.bubbles.splice(idx, 1)
                updateBubble(idx)
            }
        }
        for (let i = 0; i < this.bubbles.length; i += 1)
            updateBubble(i)

        return this
    }

    /** 繪製所有 bubbles 列表中的圓圈 */
    drawList() {
        const draw = Draw.init(this.canvas).clear()
        this.bubbles.map(bubble => draw.bubble(bubble))

        return this
    }

    /** 動畫循環 */
    loop() {
        const { rate, num } = this.buildbubbleRate
        if (this.animateSwitch && Math.random() > rate)
            this.addBubble(num)

        this.updateList().drawList()

        if (!(this.terminate && (!this.animateSwitch && this.bubbles.length === 0)))
            window.requestAnimationFrame(this.loop.bind(this))
    }

    close() {
        this.animateSwitch = false

        return this
    }
}

export default BubbleControl