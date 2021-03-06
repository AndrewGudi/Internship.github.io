import { ref, watch } from 'vue'
import { TaskInterface } from '@/types/task.interface'
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
  }
  const checkChangeDescription = () => {
    data.isShowButtonSave = changeDescription.value !== task.value.description
  }
  const changeTask = () => {
    changeName.value = task.value.name
    changeDescription.value = task.value.description
  }
  const changeObject = (name: TaskInterface, description: TaskInterface) => store.dispatch('changeObjectDetails', { id: task.value.id, name: name, description: description })
  watch(changeName, checkChangeName)
  watch(changeDescription, checkChangeDescription)
  return {
    changeName,
    changeDescription,
    changeTask,
    changeObject,
    task
  }
}
