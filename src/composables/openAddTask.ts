import { ref } from 'vue'

// eslint-disable-next-line
export default function openAddTask () {
  const isShowAddTask = ref(false)
  const isShowAddModal = () => {
    isShowAddTask.value = !isShowAddTask.value
  }
  return {
    isShowAddTask,
    isShowAddModal
  }
}
