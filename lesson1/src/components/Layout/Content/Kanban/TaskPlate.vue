<template lang="pug">
.list-group-item
  .task-completion__box(@click="clickTaskDetails" v-on:click="clickShowTaskDetailsWindow")
    .task-completion__avatar
      img(:src="`/images/${item.avatar}`" alt="#")
    .task-completion__column
      .task-completion__name
        p {{item.name}}
      .task-completion__time {{item.dateOfCompletion}}
  .item-menu__settings
    button.item-menu__button( :class="{'bgNone': !isShowDropdown, 'bgGray': isShowDropdown}" v-on:click="isShowDropdown=!isShowDropdown")
      .item-menu__dots
        span
        span
        span
  .item-menu(v-if="isShowDropdown")
    div(@click="clickTaskDetails(); clickShowTaskDetailsWindow(); isShowDropdown = !isShowDropdown" ) EDIT
    div( v-if="this.item.status !== status.ToDo && this.item.status !== status.Done" @click="changeStatus(status.ToDo)")
      p TO DO
    div( v-if="this.item.status !== status.InProgress" @click="changeStatus(status.InProgress)")
      p IN PROGRESS
    div( v-if="this.item.status !== status.Done" @click="changeStatus(status.Done)")
      p DONE
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TaskInterface } from '@/types/task.interface'
import { StatusType } from '@/constants/enumStatusType'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'TaskPlate',
  props: {
    item: {
      type: Object as PropType<TaskInterface>,
      required: true
    },
    ShowTaskDetails: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    isShowDropdown: false,
    status: StatusType
  }),
  methods: {
    ...mapActions(['changeObjectStatus']),
    changeStatus (status: StatusType) {
      this.changeObjectStatus({ id: this.item.id, status: status })
    },
    clickTaskDetails () {
      this.$emit('taskDetails', this.item)
    },
    clickShowTaskDetailsWindow () {
      this.$emit('ShowTaskDetails', this.ShowTaskDetails)
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
