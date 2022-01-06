<template lang="pug">
v-date-picker(v-model="date", mode="dateTime", is12hr="" v-click-away="onClickAway")
  template(v-slot="{ inputValue, inputEvents }")
    input.px-2.py-1.border.rounded(class="focus:outline-none focus:border-blue-300", :value="inputValue", v-on="inputEvents")
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mixin as VueClickAway } from 'vue3-click-away'

export default defineComponent({
  mixins: [VueClickAway],
  data () {
    return {
      date: new Date(),
      timezone: ''
    }
  },
  methods: {
    onClickAway (event: Event) {
      if (event) {

      }
    }
  }
})
</script>

<style scoped>

</style>
