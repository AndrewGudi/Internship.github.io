<template lang="pug">
task-details-modal(
  :item="data.item"
  :isShowEdit="data.isShowEdit"
  v-if="data.isShowTaskDetails"
  :isShowTaskDetails="data.isShowTaskDetails"
  @isShowTaskDetails="isShowTaskDetailsWindow"
)
.task-completion__input-block(v-click-away="onClickAwayShowSearch")
  .task-completion__input
    input( type="text" v-model="data.search" @click="isShowSearchModal")
    button.task-completion__calendar-open(@click="data.isShowCalendar=!data.isShowCalendar")
    .task-completion__scroll.search(v-if="(data.search || data.range || data.range && data.search) && data.isShowSearch")
      task-plate.searchTask(
        :item="item"
        v-for="item in searchTask(data.search, data.range)"
        :key="item.id"
        :isShowTaskDetails="data.isShowTaskDetails"
        @isShowTaskDetails="isShowTaskDetailsWindow"
        @taskDetails="taskDetails"
      )
    .calendar(v-if="data.isShowCalendar" v-click-away="onClickAway")
      v-date-picker(
        :value="null"
        v-model="data.range"
        color="red"
        is-white
        is-range
      )
.task-completion
  .task-completion__body
    task-column(v-for="taskStatus in data.status"
    :taskStatus="taskStatus"
    :isShowTaskDetails="data.isShowTaskDetails"
    @isShowTaskDetails="isShowTaskDetailsWindow"
    @taskDetails="taskDetails"
    )
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'
import { StatusType } from '@/constants/enumStatusType'
import TaskDetailsModal from '@/components/Layout/Content/Tasks/TaskDetailsModal.vue'
import { mixin as VueClickAway } from 'vue3-click-away'
import TaskColumn from '@/components/Layout/Content/Kanban/TaskColumn.vue'
import TaskPlate from '@/components/Layout/Content/Kanban/TaskPlate.vue'
import openPopUpWindow from '@/composables/openPopUpWindow'
import searchTaskOnArray from '@/composables/searchTaskOnArray'

export default defineComponent({
  mixins: [VueClickAway],
  components: {
    TaskPlate,
    TaskColumn,
    TaskDetailsModal,
    CleanPage
  },
  setup () {
    const data = reactive({
      range: '',
      taskFilter: [],
      search: '',
      controlOnStart: true,
      status: StatusType,
      item: [],
      isShowTaskDetails: false,
      isShowCalendar: false,
      isShowSearch: true,
      isShowEdit: false
    })
    const { searchTask, onClickAwayShowSearch, onClickAway } = searchTaskOnArray(data)
    const { isShowSearchModal, taskDetails, isShowTaskDetailsWindow } = openPopUpWindow(data)
    return {
      data,
      searchTask,
      isShowSearchModal,
      onClickAwayShowSearch,
      onClickAway,
      taskDetails,
      isShowTaskDetailsWindow
    }
  }
})
</script>
<style src="../assets/scss/kanban.scss" lang="scss">
</style>
