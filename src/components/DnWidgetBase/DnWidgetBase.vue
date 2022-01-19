
<template>
    <div class="widget base"
        @click="didClick"
        :class="classes">
        <div class="header">
            <template>
                <h3
                    v-if="widget.configuration"
                >
                    {{ title ? title : widget.configuration.title ? translate(widget.configuration.title) : '' }}
                </h3>
                <h3 class="untitled" v-else>
                    {{ widget.title }}
                </h3>
            </template>
            <div class="filters" v-if="hasValidData && (filters || $slots['value'])">
                <div>
                    <ul class="filter_wrapper">
                        <li v-if="$slots['value']">
                            <b><slot name="value"></slot></b>
                        </li>
                        <li v-if="widget.configuration.timeFrame">
                            {{ translate(widget.configuration.timeFrame.dayTitle) }},
                            {{ translate(widget.configuration.timeFrame.rangeTitle) }}
                        </li>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <li
                                    v-bind="attrs"
                                    v-on="on"
                                    v-for="(f, i) in filters"
                                    :key="'filter_' + i">
                                    <template v-if="f.values && f.values.length > 0">
                                        <span v-for="(v, j) in f.values"
                                            :key="j + '_value'">
                                            {{ v }}
                                        </span>
                                    </template>
                                    <span v-else>{{ translate('grid.property.allSelected') }}</span>
                                </li>
                            </template>
                            <ul class="tooltip">
                                <li
                                    v-for="(f, i) in filters"
                                    :key="'filter_' + i">
                                    <b class="title">{{ f.title }}:</b>

                                    <template v-if="f.values && f.values.length > 0">
                                        <span v-for="(v, j) in f.values"
                                            :key="j + '_value'">
                                            {{ v }}
                                        </span>
                                    </template>
                                    <span v-else>{{ translate('grid.property.allSelected') }}</span>
                                </li>
                            </ul>
                        </v-tooltip>
                    </ul>
                </div>
            </div>
        </div>
        <div class="content">
            <slot>
            </slot>
            <div v-if="noPermission">
                <h1 class="noselect">N/A</h1>
                <h2 class="noAccess noselect"> {{ translate('grid.noAccess') }}</h2>
            </div>
            <p
                v-if="!hasValidData"
                class="info"
            >
                {{ translate('grid.widget.editProperties') }}
            </p>
            <p
                v-if="noData"
                class="info"
            >
                {{ translate('grid.widget.noData') }}
            </p>
        </div>
    </div>
</template>

<script>
import Widget from '../DnWidget/widget.js'

export default {
    name: 'dn-widgetBase',
    props: {
        widget: {
            type: Widget,
            required: true
        },
        hasValidData: {
            type: Boolean,
            required: false,
            default: true
        },
        noPermission: {
            type: Boolean,
            required: false,
            default: false
        },
        noData: {
            type: Boolean,
            required: false,
            default: false
        },
        light: {
            type: Boolean,
            required: false,
            default: false
        },
        fill: {
            type: Boolean,
            required: false,
            default: false
        },
        title: {
            type: String,
            required: false,
            default: null
        }
    },
    data() {
        return {}
    },
    computed: {
        filters() {
            if (!this.widget || !this.widget.configuration || !this.widget.configuration.filters) {
                return null
            }
            const result = this.widget.configuration.filters.map(f => {
                return {
                    title: this.translate(f.title),
                    count: f.selected.length,
                    values: f.selected.filter(s => s.label && s.label.length > 0).map(s => {
                        return this.translate(s.label)
                    })
                }
            })
            return result
        },
        classes() {
            if (!this.widget) {
                return null
            }
            let widgetClass = this.widget.component.charAt(0).toLowerCase() + this.widget.component.slice(1) + ' '
            let result = {
                notConfigured: !this.hasValidData,
                light: this.light,
                fill: this.fill
            }
            result[widgetClass] = true
            return result
        }
    },
    methods: {
        translate(key) {
            return key
        },
        didClick() {
            if (!this.widget.hasValidData()) {
                this.$emit('didClick')
            }
        }
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/sass/colors";
.light {
    h3 {
        color: $sip_white !important;
    }

    .filters {
        li {
            b, span {
                color: $sip_white !important;
            }
        }
    }
}

.gallery {
    .header {
        cursor: move;
    }
}

.base {
    height: 100%;
    .header {
        position: absolute;
        width: 100%;
        background: transparent;
        height: 44px;
        z-index: 4;
        padding: 8px 12px;

        h3 {
            text-align: left;
            white-space: nowrap;
            height: 0;
            padding-bottom: 0;
            user-select: none;
            cursor: auto;
            display: block;
        }

        .filters {
            position: relative;
            top: 24px;
            left: -30px;
            height: 0px;
            z-index: 2;
            div {
                width: 100vw;
                font-size: 11px;
                li {
                    padding-left: 8px;
                    display: inline;

                    .title {
                        display: none;
                    }
                }
            }
        }
    }
    .content {
        padding: 12px 16px;
        height: 100%;
        padding-top: 36px;
    }

    &.accordion {
        overflow: auto;
    }

    &.fill {
        .header {
        }
        .content {
            padding: 0 0;
        }
    }
}

ul.tooltip {
    li {
        display: inherit;
        color: $sip_white;
        font-size: 16px !important;

        .title {
            font-size: 16px !important;
            font-weight: bold;
            display: inline;
        }
    }
    z-index: 200 !important;
}
</style>
