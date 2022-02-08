import { computed, ref } from 'vue'
import { useStore } from 'vuex'

// eslint-disable-next-line
export function getTasks (){
  const store = useStore()
  // eslint-disable-next-line
  const tasks:any = ref([])
  const loadTasksMethods = async () => {
    tasks.value = await store.dispatch('getTasks')
  }
  return {
    loadTasksMethods,
    tasks: computed(() => tasks.value)
  }
}
