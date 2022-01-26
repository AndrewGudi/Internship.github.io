
// eslint-disable-next-line
export default function openAddTask (data: any) {
  const isShowAddModal = () => {
    data.isShowAddTask = !data.isShowAddTask
  }
  return {
    isShowAddModal
  }
}
