import { StatusType } from '@/constants/enumStatusType'
import { useStore } from 'vuex'

// eslint-disable-next-line
export default function formAddTaskModal (data: any) {
  const store = useStore()
  const currentUser = store.state.currentUser
  const checkForm = (e: Event) => {
    data.errorName = ''
    data.errorDescription = ''
    if (!data.name) {
      data.errorName = 'Task name required.'
    }
    if (!data.description) {
      data.errorDescription = 'Task description required.'
    }
    if (data.errorName && data.errorDescription) {
      return
    }
    if (data.name && data.description) {
      const postDate = data.postDate
      const executeBeforeDate = data.executeBeforeDate
      let postDateEdited = {}
      let executeBeforeEdited = {}
      const Date = [postDate, executeBeforeDate]
      // eslint-disable-next-line
      let i:any = 0
      for (i in Date) {
        let Hour = Date[i].getHours()
        const Hours = Date[i].getHours()
        const HalfDay = Hours >= 12 ? 'PM' : 'AM'
        let Minutes: string | number = Date[i].getMinutes()
        Hour = Hour % 12
        Minutes = Minutes < 10 ? '0' + Minutes : Minutes
        const dd = String(Date[i].getDate())
        const mm = String(Date[i].getMonth() + 1)
        const yyyy = Date[i].getFullYear()
        if (Date[i] === postDate) {
          postDateEdited = {
            date: mm + '/' + dd + '/' + yyyy,
            time: (Hour + ':' + Minutes),
            halfDay: HalfDay
          }
        }
        if (Date[i] === executeBeforeDate) {
          executeBeforeEdited = {
            date: mm + '/' + dd + '/' + yyyy,
            time: (Hour + ':' + Minutes),
            halfDay: HalfDay
          }
        }
      }
      // eslint-disable-next-line
      const addItem = () => store.dispatch('addItem', {
        status: StatusType.ToDo,
        id: null,
        avatar: currentUser.avatarka,
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        name: data.name,
        description: data.description,
        postDate: postDateEdited,
        executeBefore: executeBeforeEdited
      })
      addItem()
      data.name = ''
      data.description = ''
    }
    e.preventDefault()
  }
  return {
    checkForm
  }
}
