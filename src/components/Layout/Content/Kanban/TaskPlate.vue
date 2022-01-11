<template lang="pug">
.list-group-item
  .task-completion__box(
    :style="{ background: (leftTime.changeColorRed || leftTime.changeColorOrange) }"
    @click="clickTaskDetails"
    v-on:click="clickIsShowTaskDetailsWindow")
    .task-completion__avatar
      img(:src="`/images/${item.avatar}`" alt="#")
    .task-completion__column
      .task-completion__name
        p {{item.name}}
      .task-completion__data
        .task-completion__left-time(v-if="!leftTime.changeColorRed && item.status !== 'done'") Left: {{leftTime.timeLeftToComplete}}
    .task-completion__status-icon(v-if="!leftTime.changeColorRed")
      div(:class="`task-completion__${iconStatus}`")
  .item-menu__settings
    button.item-menu__button( :class="{'bgNone': !isShowDropdown, 'bgGray': isShowDropdown}" v-on:click="isShowDropdown=!isShowDropdown")
      .item-menu__dots
        span
        span
        span
  .item-menu(v-if="isShowDropdown")
    div(@click="clickTaskDetails(); clickIsShowTaskDetailsWindow(); isShowDropdown = !isShowDropdown" ) EDIT
    div( v-if="this.item.status !== status.ToDo && this.item.status !== status.Done && this.item.status !== status.InProgress" @click="changeStatus(status.ToDo)")
      p TO DO
    div( v-if="this.item.status !== status.InProgress && this.item.status !== status.Done" @click="changeStatus(status.InProgress)")
      p IN PROGRESS
    div( v-if="this.item.status !== status.Done" @click="changeStatus(status.Done)")
      p DONE
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TaskInterface } from '@/types/task.interface'
import { StatusType } from '@/constants/enumStatusType'
import { mapActions } from 'vuex'
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
  data: () => ({
    dateNow: moment(new Date()).toDate().getTime(),
    isShowDropdown: false,
    status: StatusType
  }),
  computed: {
    iconStatus () {
      if (this.item.status === 'todo') {
        return 'to-do'
      }
      if (this.item.status === 'inProgress') {
        return 'in-progress'
      }
      if (this.item.status === 'done') {
        return 'done'
      }
      return 0
    },
    leftTime () {
      const itemTime = this.item.executeBefore.time + '' + this.item.executeBefore.halfDay
      const number = moment(itemTime, ['h:mm A']).format('HH:mm')
      // eslint-disable-next-line
      const executeBeforeDate: any = moment(new Date(this.item.executeBefore.date + ',' + number)).toDate().getTime()
      // eslint-disable-next-line
      const dateNow:any = this.dateNow
      const changeColorRed = 'red'
      const changeColorOrange = 'orange'
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
        if (this.item.status !== 'done') {
          return {
            timeLeftToComplete,
            changeColorOrange
          }
        }
      }
      if (days < 0) {
        return { changeColorRed }
      }
      if (days >= 1) {
        timeLeftToComplete = days + ' d. '
        if (this.item.status !== 'done') {
          return { timeLeftToComplete }
        }
      }

      return 0
    }
  },
  methods: {
    ...mapActions(['changeObjectStatus']),
    changeStatus (status: StatusType) {
      this.changeObjectStatus({ id: this.item.id, status: status })
    },
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
</style>
