import { TaskInterface } from '@/types/task.interface'
import { getTasks } from '@/composables/getTasks'

// eslint-disable-next-line
export default function searchTaskOnArray (data: any) {
  const { tasks, loadTasksMethods } = getTasks()
  loadTasksMethods().then()
  const isShowSearchModal = () => {
    if (!data.isShowSearch) {
      data.isShowSearch = !data.isShowSearch
    }
  }
  // eslint-disable-next-line
  const searchTask = (search: string, range: any) => {
    const startDate = Date.parse(range.start)
    const endDate = Date.parse(range.end)
    // eslint-disable-next-line
    const resultDate:any = []
    // eslint-disable-next-line
    let taskFilterDate:any = []
    for (let i = startDate; i <= endDate; i = i + 24 * 60 * 60 * 1000) {
      const Data = new Date(i)
      const dd = String(Data.getDate())
      const mm = String(Data.getMonth() + 1)
      const yyyy = Data.getFullYear()
      const day = mm + '/' + dd + '/' + yyyy
      resultDate.push(day)
    }
    if (search && !range) {
      return tasks.value.filter((item: TaskInterface) => item.name.indexOf(search) !== -1)
    }
    if ((range && !search) || (range && search)) {
      for (let j = 0; j < resultDate.length; j++) {
        tasks.value.forEach((task: TaskInterface) => {
          if (task.postDate.date === resultDate[j] || task.executeBefore.date === resultDate[j]) {
            taskFilterDate.push(task)
          }
        })
      }
      if (range && !search) {
        // eslint-disable-next-line
        return taskFilterDate.filter((el:any, id:any) => taskFilterDate.indexOf(el) === id)
      }
      if (range && search) {
        // eslint-disable-next-line
        taskFilterDate = taskFilterDate.filter((el:any, id:any) => taskFilterDate.indexOf(el) === id)
        return taskFilterDate.filter((item: TaskInterface) => item.name.indexOf(search) !== -1)
      }
    }
  }
  // eslint-disable-next-line
  const onClickAwayShowSearch = (event:any) => {
    if (data.isShowSearch) {
      if (event) {
        data.isShowSearch = !data.isShowSearch
      }
    }
  }
  // eslint-disable-next-line
  const onClickAway = (event:any) => {
    if (event) {
      data.isShowCalendar = !data.isShowCalendar
    }
  }
  return {
    searchTask,
    onClickAwayShowSearch,
    onClickAway,
    isShowSearchModal
  }
}
