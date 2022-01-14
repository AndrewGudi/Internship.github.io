<template lang="pug">
.list-group-item
  .task-completion__box(
    :class="leftTime.colors"
    @click="clickTaskDetails"
    v-on:click="clickIsShowTaskDetailsWindow")
    .task-completion__avatar
      img(:src="`/images/${item.avatar}`" alt="#")
    .task-completion__column
      .task-completion__name
        p {{item.name}}
      .task-completion__data
        .task-completion__left-time(v-if="!(leftTime.colors === 'red') && item.status !== 'done'") Left: {{leftTime.timeLeftToComplete}}
    .task-completion__status-icon(v-if="leftTime.colors !== 'red'")
      div(:class="`task-completion__${iconStatus}`")
  .item-menu__settings
    button.item-menu__button( :class="{'bgNone': !data.isShowDropdown, 'bgGray': data.isShowDropdown}" v-on:click="data.isShowDropdown=!data.isShowDropdown")
      .item-menu__dots
        span
        span
        span
  .item-menu(v-if="data.isShowDropdown")
    div(@click="clickTaskDetails(); clickIsShowTaskDetailsWindow(); data.isShowDropdown = !data.isShowDropdown" ) EDIT
    div( v-if="this.item.status !== data.status.ToDo && this.item.status !== data.status.Done && this.item.status !== data.status.InProgress" @click="changeStatus(data.status.ToDo).then()")
      p TO DO
    div( v-if="this.item.status !== data.status.InProgress && this.item.status !== data.status.Done" @click="changeStatus(data.status.InProgress).then()")
      p IN PROGRESS
    div( v-if="this.item.status !== data.status.Done" @click="changeStatus(data.status.Done).then()")
      p DONE
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive } from 'vue'
import { TaskInterface } from '@/types/task.interface'
import { StatusType } from '@/constants/enumStatusType'
import { mapActions, useStore } from 'vuex'
import moment from 'moment'

export default defineComponent({
  name: 'TaskPlate',
  props: {
    item: {
      type: Object as PropType<TaskInterface>,
      required: true
    },
    isShowTaskDetails: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const data = reactive({
      dateNow: moment(new Date()).toDate().getTime(),
      isShowDropdown: false,
      status: StatusType
    })
    const iconStatus = computed(() => {
      if (props.item.status === 'todo') {
        return 'to-do'
      }
      if (props.item.status === 'inProgress') {
        return 'in-progress'
      }
      if (props.item.status === 'done') {
        return 'done'
      }
      return 0
    })
    // eslint-disable-next-line
    const leftTime:any = computed(() => {
      let colors = ''
      // eslint-disable-next-line
      const addClass = (colors: any) => store.dispatch('addClassColorTimeTask', { id: props.item.id, colors: colors })
      const itemTime = props.item.executeBefore.time + '' + props.item.executeBefore.halfDay
      const number = moment(itemTime, ['h:mm A']).format('HH:mm')
      // eslint-disable-next-line
      const executeBeforeDate: any = moment(new Date(props.item.executeBefore.date + ',' + number)).toDate().getTime()
      // eslint-disable-next-line
      const dateNow:any = data.dateNow
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
        if (props.item.status !== 'done') {
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
        colors += changeColorGray
        addClass(colors)
        if (props.item.status !== 'done') {
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
      leftTime,
      iconStatus,
      data,
      changeStatus: (status: StatusType) => store.dispatch('changeObjectStatus', { id: props.item.id, status: status })
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(['changeObjectStatus', 'addClassColorTimeTask']),

    clickTaskDetails () {
      this.$emit('taskDetails', this.item)
    },
    clickIsShowTaskDetailsWindow () {
      this.$emit('isShowTaskDetails', this.isShowTaskDetails)
    }
  }
})
</script>

<style scoped lang="scss">
.list-group-item{
  position: relative;
}
.item-menu {
  display: flex;
  flex-direction: column;
  width: 150px;
  position: absolute;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  top: 7px;
  right: 50px;
  z-index: 10;
  box-shadow: 2px 5px 51px 9px rgba(12, 12, 12, 0.15);
  -webkit-box-shadow: 2px 5px 51px 9px rgba(3, 3, 3, 0.15);
  -moz-box-shadow: 2px 5px 51px 9px rgba(3, 3, 3, 0.15);
  div{
    display: flex;
    align-items: center;
    height: 20px;
    padding-left: 10px;
    border-bottom: 1px solid #aeaeae;
  }
  div:last-child{
    border-bottom: none;
  }
  &__settings {
    display: flex;
    position: absolute;
    top: 25px;
    right: 10px;
  }

  &__button  {
    border: 0;
    padding: 0;
    min-width: 30px;
    min-height: 30px;
  }

  &__dots {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    align-items: center;
    align-content: center;
    justify-content: center;

    span {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #9b9b9b;
      margin: 1px;
    }
  }
}
.bgNone{
  background: transparent;
}
.bgGray{
  background: white;
}
.red{
  background: red;
}
.orange{
  background: orange;
}
.grizzle{
  background: #EAEAEA;
}
</style>
