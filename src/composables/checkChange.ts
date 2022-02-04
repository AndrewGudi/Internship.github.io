import { ref, watch } from 'vue'
import { useStore } from 'vuex'

// eslint-disable-next-line
export default function checkChange (data: any, task: any) {
  const store = useStore()
  // eslint-disable-next-line
  const changeName: any = ref('')
  // eslint-disable-next-line
  const changeDescription: any = ref('')
  const checkChangeName = () => {
    data.isShowButtonSave = changeName.value !== task.value.name
    updatedTask.name = changeName.value
  }
  const updatedTask = task.value
  const checkChangeDescription = () => {
    data.isShowButtonSave = changeDescription.value !== task.value.description
    updatedTask.description = changeDescription.value
  }
  const changeTask = () => {
    changeName.value = task.value.name
    changeDescription.value = task.value.description
  }
  const changeObject = (updatedTask: any) => store.dispatch('updateTask', updatedTask)
  watch(changeName, checkChangeName)
  watch(changeDescription, checkChangeDescription)
  return {
    changeName,
    changeDescription,
    changeTask,
    changeObject,
    task,
    updatedTask
  }
}
