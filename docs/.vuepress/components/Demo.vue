<!-- Demo.vue -->
<template>
    <div>
        <ClientOnly>
            <component :is="componentName"/>
        </ClientOnly>
    </div>
</template>

<script>
  export default {
    props: {
      componentName: { type: String, required: true }
    }
  }
</script>