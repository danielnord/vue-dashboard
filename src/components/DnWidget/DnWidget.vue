<template>
    <div
        :class="classes"
        :style="style"
        ref="dragHandle">
        <b-icon v-if="readOnly"
            class="icon view"
            icon="info"
            @click="viewBox" />
        <template v-else>
            <b-icon class="icon edit"
                icon="pencil-square"
                @click="editBox" />
            <b-icon class="icon close"
                icon="dash-circle"
                @click="removeBox" />
        </template>
        <slot></slot>
        <div
            class="resize-handle"
            ref="resizeHandle">
            ⌟
        </div>
    </div>
</template>

<script>
import { List as ContainerList } from '../Common/Container'
import Widget from './widget'
import * as utils from '../../helpers/utils'

export default {
    name: 'dn-widget',
    props: {
        widget: {
            type: Widget,
            required: true
        },
        dragSelector: {
            type: String,
            default: '*'
        },
        readOnly: {
            type: Boolean,
            required: false,
            default: false
        },
        highlight: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            container: null,
            dragging: false,
            resizing: false
        }
    },
    beforeDestroy() {
        // register component on parent
        if (this.container) {
            this.container.unregisterBox(this)
        }
    },
    mounted() {
        this.container = this.findContainer()
        if (!this.container) {
            throw new Error('Can not find container')
        }

        // register component on parent
        this.container.registerBox(this)

        // moving
        this.$dragHandle = this.$el || this.$refs.dragHandle

        const dragStart = evt => {
            if (this.readOnly) {
                return
            }

            console.log('dragStart', evt.target, this.dragSelector)
            if (!utils.matchesSelector(evt.target, this.dragSelector)) {
                return
            }

            evt.preventDefault()
            this.dragging = true
            this.$emit('dragStart')
            let mouseX = evt.clientX
            let mouseY = evt.clientY

            const handleMouseUp = evt => {
                window.removeEventListener('mouseup', handleMouseUp, true)
                window.removeEventListener('mousemove', handleMouseMove, true)

                this.dragging = false

                var offset = {
                    x: evt.clientX - mouseX,
                    y: evt.clientY - mouseY
                }
                this.$emit('dragEnd', { offset, widget: this.widget })
            }

            const handleMouseMove = evt => {
                var offset = {
                    x: evt.clientX - mouseX,
                    y: evt.clientY - mouseY
                }

                this.$emit('dragUpdate', { offset })
            }

            window.removeEventListener('mouseup', handleMouseUp, true)
            window.removeEventListener('mousemove', handleMouseMove, true)
            window.addEventListener('mouseup', handleMouseUp, true)
            window.addEventListener('mousemove', handleMouseMove, true)
        }

        var supportsTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0))
        if (supportsTouch) {
            this.$dragHandle.addEventListener('touchstart', dragStart)
        }

        this.$dragHandle.addEventListener('mousedown', dragStart)

        // resizing
        this.$resizeHandle = this.$refs.resizeHandle
        if (this.$resizeHandle) {
            const resizeStart = evt => {
                if (this.readOnly) {
                    return
                }
                evt.preventDefault()
                evt.stopPropagation()
                this.resizing = true
                this.$emit('resizeStart')
                let mouseX = evt.clientX
                let mouseY = evt.clientY

                const handleMouseUp = evt => {
                    window.removeEventListener('mouseup', handleMouseUp, true)
                    window.removeEventListener('mousemove', handleMouseMove, true)

                    this.resizing = false

                    var offset = {
                        x: evt.clientX - mouseX,
                        y: evt.clientY - mouseY
                    }
                    this.$emit('resizeEnd', { offset })
                }

                const handleMouseMove = evt => {
                    var offset = {
                        x: evt.clientX - mouseX,
                        y: evt.clientY - mouseY
                    }
                    this.$emit('resizeUpdate', { offset })
                }

                window.addEventListener('mouseup', handleMouseUp, true)
                window.addEventListener('mousemove', handleMouseMove, true)
            }

            if (supportsTouch) {
                this.$dragHandle.addEventListener('touchstart', resizeStart)
            }
            this.$resizeHandle.addEventListener('mousedown', resizeStart)
        }
    },
    computed: {
        style() {
            if (this.container && this.widget && this.container.isBoxVisible(this.widget.id)) {
                var pixelPosition = this.container.getPixelPositionById(this.widget.id)
                return {
                    display: 'block',
                    width: pixelPosition.w + 'px',
                    height: pixelPosition.h + 'px',
                    transform: `translate(${pixelPosition.x}px, ${pixelPosition.y}px)`
                }
            }

            return {
                display: 'none'
            }
        },
        classes() {
            return {
                'dn-grid-widget': true,
                'highlight': this.highlight,
                'dragging': this.dragging,
                'resizing': this.resizing
            }
        }
    },
    methods: {
        findContainer() {
            let current = this
            while (current.$parent) {
                current = current.$parent
                if (ContainerList.has(current)) {
                    return current
                }
            }
            return null
        },
        removeBox() {
            this.$emit('removeClicked', this.widget.id)
        },
        editBox() {
            this.$emit('editClicked', this.widget.id)
        },
        viewBox() {
            this.$emit('viewClicked', this.widget.id)
        },
        showProperties(data) {
            if (!this.gallery.active) {
                // this.toggleGallery(true)
            }
            this.currentWidget = data.widget
            this.gallery.showCustomize = true
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/sass/colors";
@import "../../assets/sass/grid";
    .dn-grid-widget {
        position: absolute;
        z-index: 1;
        box-sizing: border-box;

        .icon {
            position: absolute;
            z-index: 5;
            color: $sip_color13;
            opacity: 0.5;
            cursor: pointer;

            border-radius: 50%;
            background: #f9f9f9;
            box-shadow:  1px 1px 1px #d4d4d4,
             -1px -1px 1px #ffffff;
            &.close, &.view {
                position: absolute;
                right: 10px;
                top: 12px;
            }

            &.view {
                background: transparent;
                box-shadow: 1px 1px 1px transparent,
             -1px -1px 1px transparent;

                &:hover {
                    background: #f9f9f9;
                    box-shadow:  1px 1px 1px #d4d4d4,
                -1px -1px 1px #ffffff;
                }
            }

            &.edit {
                position: absolute;
                right: 36px;
                top: 12px;
            }

            &:hover {
                color: $sip_color2 !important;
                text-decoration: none;
                opacity: .5 !important;
            }
        }
    }

    .dn-grid-widget.dragging,
    .dn-grid-widget.resizing {
        z-index: 2;
        opacity: 0.7;
    }

    .dn-grid-widget.highlight {
        box-shadow: $boxShadowLevel4;
    }

    .dn-grid-widget:not(.dragging):not(.resizing) {
        transition: transform ease-out 0.1s, width ease-out 0.1s, height ease-out 0.1s;
    }

    .dn-grid-widget .resize-handle {
        position: absolute;
        right: 1px;
        bottom: 21px;
        width: 15px;
        height: 15px;
        color: lightslategrey;
        cursor: se-resize;
        font-size: 26px;
    }
</style>
