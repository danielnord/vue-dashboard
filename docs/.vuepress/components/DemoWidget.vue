<template>
    <div>
        <dn-widgetBase
            @didClick="didClick"
            :key="data.id"
            :widget="data"
            :hasValidData="true"
            ref="widgetbase">
            {{ data }}
        </dn-widgetBase>
    </div>
</template>

<script>
export default {
    props: {
        data: { type: Object, required: true }
    },
    methods: {
        didClick() {
            if (!this.hasValidUrl) {
                this.$emit('showProperties')
            }
        }
    }
}
</script>