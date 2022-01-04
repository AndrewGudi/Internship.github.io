<template lang="pug">
v-date-picker(v-model="date", mode="dateTime", is12hr="")
  template(v-slot="{ inputValue, inputEvents }")
    input.px-2.py-1.border.rounded(class="focus:outline-none focus:border-blue-300", :value="inputValue", v-on="inputEvents")
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

  data () {
    return {
      date: new Date(),
      timezone: ''
    }
  }
})
</script>

<style scoped>

</style>
