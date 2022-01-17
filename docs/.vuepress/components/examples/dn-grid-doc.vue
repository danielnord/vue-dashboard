<template>
    <div>
        <dn-grid
            :layout="layout"
            :readOnly="readOnly"
            @changed="changed"
        >
            This is slot content 4.
        </dn-grid>
        <button @click="readOnly = !readOnly">{{ readOnly ? 'Edit grid' : 'Read only grid' }}</button>
        <button @click="addWidget">Add widget</button>
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
                type: 'DemoWidget',
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
                type: 'DemoWidget',
                pinned: false
            })],
            readOnly: true
        }
    },
    methods: {
        changed(grid) {
            console.log(grid)
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
                type: 'DemoWidget',
                pinned: false
            })
            this.layout.push(w)
        }
    }
}
</script>
