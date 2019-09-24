class Bubble {
    constructor() {
        const winH = window.innerHeight
        const winW = window.innerWidth
        const random = (max, min = 0) => Math.random() * (max - min) + min

        const radiusList = [30, 40, 50]
        this.radius = random(radiusList[Math.floor(random(radiusList.length))], 20)

        this.site = {
            x: random(winW - this.radius, this.radius),
            y: random(winH - this.radius, winH / 3 * 2),
        }
        this.direction = {
            x: random(0, -0.1),
            y: random(-0.1, -0.6),
        }

        this.alpha = {
            val: 0,
            times: 0,
            timesLimit: 1,
            speed: random(0.0004, 0.0002),
            max: 0.2,
            min: 0
        }
        this.color = { r: 0, g: 0, b: 0 }
    }
    static get init() {
        return new Bubble()
    }
    get Rgba() {
        const { r, g, b } = this.color
        const a = this.alpha.val
        return `rgba(${255 - r}, ${255 - g}, ${255 - b}, ${a})`
    }
    get Site() {
        const { x, y } = this.site
        const r = this.radius
        return { x, y, r }
    }
    get IsFadeTimesOver() {
        const { times, timesLimit } = this.alpha
        return times > timesLimit
    }
    /** 淡入淡出 */
    fade(type) {
        const typeList = {
            in: () => this.alpha.val = this.alpha.min + this.alpha.speed,
            out: () => this.alpha.val = this.alpha.max + this.alpha.speed,
        }

        this.alpha.speed = -this.alpha.speed
        typeList[type]()
        this.alpha.times += 1

        return this
    }

    /** 更新狀態 */
    update() {
        this.alpha.val += this.alpha.speed
        this.site.y += this.direction.y

        if (this.alpha.val >= this.alpha.max)
            this.fade("out")

        if (this.alpha.val <= this.alpha.min)
            this.fade("in")

        return this
    }
}

export default Bubble