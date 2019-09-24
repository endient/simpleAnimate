import Bubble from "./Bubble.js"

class Draw {
    constructor(canvas) {
        this.canvas = canvas
    }
    static init(canvas) { return new Draw(canvas) }

    /** 清除 canvas 畫面 */
    clear() {
        const ctx = this.canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        return this
    }

    /**
     * 繪製圓圈
     * @param {Bubble} bub 
     */
    bubble(bub) {
        const ctx = this.canvas.getContext("2d")
        const rgba = bub.Rgba
        const site = bub.Site

        ctx.beginPath()
        ctx.fillStyle = rgba
        // ctx.strokeStyle = rgba
        // ctx.lineWidth = 5

        ctx.arc(site.x, site.y, site.r, 0, Math.PI * 2)
        ctx.fill()
        // ctx.stroke()

        return true
    }
}

export default Draw