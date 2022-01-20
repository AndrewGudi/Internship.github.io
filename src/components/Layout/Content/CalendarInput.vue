<template lang="pug">
v-date-picker(v-model="data.date", mode="data.dateTime", is12hr="")
  template(v-slot="{ inputValue, inputEvents }")
    input.px-2.py-1.border.rounded(class="focus:outline-none focus:border-blue-300", :value="inputValue", v-on="inputEvents")
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup () {
    const data = reactive({
      date: new Date(),
      timezone: ''
    })
    return {
      data
    }
  }
})
</script>

<style scoped>

</style>
