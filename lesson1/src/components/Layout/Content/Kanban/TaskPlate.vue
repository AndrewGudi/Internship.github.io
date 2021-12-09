<template lang="pug">
.task-completion__box
  .task-completion__name
    p {{item.name}}
  .task-completion__time {{item.dateOfCompletion}}
</template>

<script>
export default {
  name: 'TaskPlate',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
