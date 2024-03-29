const direction = {
    up: 1,
    right: 2,
    down: 3,
    left: 4
}
export default class Widget {
    constructor(box) {
        this.dashboardCompatibility = box.dashboardCompatibility
        this.address = box.address
        this.hidden = box.hidden
        this.id = box.id
        this.minSize = box.minSize
        this.pinned = box.pinned
        this.position = box.position
        this.title = box.title
        this.data = box.data
        this.description = box.description
        this.component = box.component
        this.originalPosition = Object.assign({}, box.position)
        this.isProcessed = false // If set to true this box will be ignored when moving around boxes
    }

    moveBox(vector, distance = 1) {
        if (vector === direction.left) {
            this.position.x -= distance
        } else if (vector === direction.up) {
            this.position.y -= distance
        } else if (vector === direction.right) {
            this.position.x += distance
        } else if (vector === direction.down) {
            this.position.y += distance
        }
    }

    // reactive box layout update
    updateBoxLayout(data) {
        return {
            ...this,
            ...data
        }
    }

    // reactive box position update
    updateBoxPosition(data) {
        return this.updateBoxLayout({
            position: {
                ...this.position,
                ...data
            }
        })
    }

    /**
     * Returns a copy as a Widget object
    */
    copy() {
        return new Widget(JSON.parse(JSON.stringify(this)))
    }

    /**
     * Returns true if it has valid data
     */
     hasValidData() {
        if (!this.validators) {
            return
        }

        for (let i = 0; i < this.validators.length; i++) {
            if (!this.validators[i]()) {
                return false
            }
        }

        return true
    }
}
