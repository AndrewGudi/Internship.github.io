import { useStore } from 'vuex'
// eslint-disable-next-line
export default function openPopUpWindow (data:any) {
  const store = useStore()
  const tasks = store.state.moduleTasks.tasks
  const isShowSearchModal = () => {
    if (!data.isShowSearch) {
      data.isShowSearch = !data.isShowSearch
    }
  }
  // eslint-disable-next-line
  const taskDetails = (item: any) => {
    data.item = tasks[item]
  }
  return {
    isShowSearchModal,
    taskDetails
  }
}
