<template>
    <div>
        <dn-grid
            :layout="layout"
        >
            This is slot content 4.
        </dn-grid>
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
                h: 46
            },
            maxColumnCount: window.innerWidth > 768 ? 48 : 6,
            maxRowCount: Infinity,
            margin: 16,
            boxCount: 4,
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
                type: 'DemoWidget'
            }), new Widget({
                id: '1234-1',
                position: {
                    x: 4,
                    y: 0,
                    h: 4,
                    w: 2
                },
                title: 'Widget 2',
                type: 'DemoWidget'
            })]
        }
    }
}
</script>
