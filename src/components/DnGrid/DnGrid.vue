<template>
    <div>
        <Grid-Container class="grid container"
            ref="layout"
            :class="{gallery: gallery.active}"
            :layout.sync="widgets.current"
            :cellSize="cellSize"
            :maxColumnCount="maxColumnCount"
            :maxRowCount="maxRowCount"
            :margin="margin"
        >
            <template v-for="w in widgets.current">
                <dn-widget
                    :key="w.id"
                    :widget="w"
                    dragSelector="div.base div.header"
                    @removeClicked="removeWidget(w.id)"
                    @editClicked="editWidget(w)"
                    @viewClicked="editWidget(w, true)"
                    :readOnly="!gallery.active"
                    :highlight="currentWidget && w.id === currentWidget.id && gallery.active"
                >
                    <div class="card">
                        <component class="widget-wrapper"
                            v-if="w.compatibility == null || w.compatibility == dashboardType"
                            :is="w.type"
                            :data="w"
                            :cellSize="cellSize"
                            @showProperties="showProperties({ widget: w })" />
                    </div>
                </dn-widget>
            </template>
        </Grid-Container>
    </div>
</template>

<script>
import GridContainer from '../Common/Container.vue'
export default {
  components: { GridContainer },
    name: 'dn-grid',
    props: {
        layout: {
            type: Array,
            required: false,
            default() {
                return []
            }
        },
        cellSize: {
            type: Object,
            default() {
                return {
                    w: 100,
                    h: 100
                }
            }
        },
        maxColumnCount: {
            type: Number,
            default: Infinity
        },
        maxRowCount: {
            type: Number,
            default: Infinity
        },
        margin: {
            type: Number,
            default: 5
        },
        dashboardType: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            currentWidget: null,
            widgets: {
                available: [],
                all: [],
                current: [],
                backup: []
            },
            gallery: {
                active: false,
                showCustomize: false,
                readOnly: false
            }
        }
    },
    created() {
        this.widgets.current = this.layout
    },
    methods: {
        removeWidget(id) {
            this.widgets.current = this.widgets.current.filter(widget => widget.id !== id)
            this.$refs.layout.commitLayout()
        },
        editWidget(widget, readOnly) {
            this.currentWidget = widget
            this.gallery.showCustomize = true
            this.gallery.readOnly = false
            if (readOnly) {
                this.gallery.readOnly = true
            }
        }
    }
}
</script>

<style scoped="" lang="scss">
@import "../../assets/sass/colors.scss";
@import "../../assets/sass/grid.scss";
.card {
    width: 100%;
    height: 100%;

    .widget-wrapper {
        position: relative;
        margin: auto;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
}
</style>
