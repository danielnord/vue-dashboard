<template>
  <div>
    <slot></slot>{{ test }}
  </div>
</template>

<script>
export default {
    name: 'standard-component',
    data() {
        return {
            test: true
        }
    },
    created() {
        console.log(this.test)
    }
}
</script>

<style></style>
