<template>
    <div>
        <h1>{{ data.title }}</h1>
        {{ data }}
    </div>
</template>

<script>
  export default {
    props: {
        data: { type: Object, required: true }
    }
  }
</script>