import { computed, reactive } from 'vue'
import moment from 'moment'
import { useStore } from 'vuex'
import { StatusType } from '@/constants/enumStatusType'

// eslint-disable-next-line
export default function taskLeftTime (item: any) {
  const store = useStore()
  const dataTaskLeftTime = reactive({
    dateNow: moment(new Date()).toDate().getTime(),
    status: StatusType
  })
  // eslint-disable-next-line
const leftTime:any = computed(() => {
    let colors = ''
    // eslint-disable-next-line
  const addClass = (colors: any) => store.dispatch('addClassColorTimeTask', { id: item.value.id, colors: colors })
    const itemTime = item.value.executeBefore.time + '' + item.value.executeBefore.halfDay
    const number = moment(itemTime, ['h:mm A']).format('HH:mm')
    // eslint-disable-next-line
  const executeBeforeDate: any = moment(new Date(item.value.executeBefore.date + ',' + number)).toDate().getTime()
    // eslint-disable-next-line
  const dateNow:any = dataTaskLeftTime.dateNow
    const changeColorRed = 'red'
    const changeColorOrange = 'orange'
    const changeColorGray = 'grizzle'
    let timeLeftToComplete = ''

    let seconds = Math.floor((executeBeforeDate - (dateNow)) / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    hours = hours - (days * 24)
    minutes = minutes - (days * 24 * 60) - (hours * 60)
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60)

    if (days === 0 && days < 1) {
      timeLeftToComplete = hours + ' h. ' + minutes + ' m. '
      colors = changeColorGray
      if (item.value.status !== 'done') {
        colors = changeColorOrange
        addClass(colors)
        return {
          colors,
          addClass,
          timeLeftToComplete
        }
      }
      return {
        colors
      }
    }
    if (days < 0) {
      colors = changeColorRed
      addClass(colors)
      return {
        addClass,
        colors
      }
    }
    if (days >= 1) {
      timeLeftToComplete = days + ' d. '
      colors = changeColorGray
      addClass(colors)
      if (item.value.status !== 'done') {
        return {
          colors,
          timeLeftToComplete,
          addClass
        }
      }
      return {
        colors,
        addClass,
        leftTime
      }
    }
    return 0
  })
  return {
    leftTime
  }
}
