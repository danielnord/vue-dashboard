<template>
    <div>
        <dn-grid
            :layout="layout"
            :readOnly="readOnly"
            :cellSize="cellSize"
            @changed="changed"
        >
        </dn-grid>
        <button @click="readOnly = !readOnly">{{ readOnly ? 'Edit grid' : 'Read only grid' }}</button>
        <button @click="addWidget">Add widget</button>
        cellSize.w: <input type="text" v-model.number="cellSize.w" />
        cellSize.h: <input type="text" v-model.number="cellSize.h" />
    </div>
</template>
<script>
import Widget from '../../../../src/components/DnWidget/widget'
export default {
    data() {
        return {
            dashboardId: null,
            cellSize: {
                w: 46,
                h: 46,
                margin: 16
            },
            maxColumnCount: window.innerWidth > 768 ? 48 : 6,
            maxRowCount: Infinity,
            outerMargin: 16,
            widgets: {
            },
            layout: [new Widget({
                id: '1234-0',
                position: {
                    x: 0,
                    y: 0,
                    h: 2,
                    w: 4
                },
                title: 'Widget 1',
                component: 'DemoWidget',
                pinned: false
            }), new Widget({
                id: '1234-1',
                position: {
                    x: 4,
                    y: 0,
                    h: 4,
                    w: 2
                },
                title: 'Widget 2',
                component: 'DemoWidget',
                pinned: false
            })],
            readOnly: true
        }
    },
    methods: {
        changed(grid) {
            this.layout = grid
        },
        async addWidget() {
            const w = new Widget({
                id: '1234-' + Math.floor(Math.random() * 999999),
                position: {
                    x: 4,
                    y: 0,
                    h: 4,
                    w: 2
                },
                title: 'Widget ' + (this.layout.length + 1),
                component: 'DemoWidget',
                pinned: false
            })
            w.isProcessed = true // To update positions for other widgets
            this.$set(this.layout, this.layout.length, w)
        }
    }
}
</script>
