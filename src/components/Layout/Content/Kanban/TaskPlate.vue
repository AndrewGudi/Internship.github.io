<template lang="pug">
.list-group-item
  .task-completion__box(
    :class="leftTime.colors"
    @click="detailsModalItem"
    )
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
    div(@click="detailsModalItem(); data.isShowDropdown = !data.isShowDropdown" ) EDIT
    div( v-if="item.status !== data.status.ToDo && item.status !== data.status.Done && item.status !== data.status.InProgress" @click="changeStatus(data.status.ToDo)")
      p TO DO
    div( v-if="item.status !== data.status.InProgress && item.status !== data.status.Done" @click="changeStatus(data.status.InProgress)")
      p IN PROGRESS
    div( v-if="item.status !== data.status.Done" @click="changeStatus(data.status.Done)")
      p DONE
    div(@click="deleteTask" ) DELETE
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, toRefs } from 'vue'
import { TaskInterface } from '@/types/task.interface'
import { StatusType } from '@/constants/enumStatusType'
import { useStore } from 'vuex'
import moment from 'moment'
import taskLeftTime from '@/composables/taskLeftTime'

export default defineComponent({
  name: 'TaskPlate',
  props: {
    item: {
      type: Object as PropType<TaskInterface>,
      required: true
    }
  },
  setup (props, context) {
    const store = useStore()
    const data = reactive({
      dateNow: moment(new Date()).toDate().getTime(),
      isShowDropdown: false,
      status: StatusType
    })
    const { item } = toRefs(props)
    const { leftTime } = taskLeftTime(item)
    const detailsModalItem = () => {
      context.emit('detailsModalItem', item.value)
    }
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
    const updateTask = (task: TaskInterface) => store.dispatch('updateTask', task)
    const changeStatus = (status: StatusType) => {
      item.value.status = status
      updateTask(item.value)
    }
    const deleteTask = () => store.dispatch('deleteTask', item.value)
    return {
      leftTime,
      iconStatus,
      data,
      detailsModalItem,
      deleteTask,
      changeStatus
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
