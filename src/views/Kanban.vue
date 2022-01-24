<template lang="pug">
task-details-modal(
  v-if="isShowTaskDetails"
  :task="data.item"
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
        @detailsModalItem="detailsModalItem"
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
    @detailsModalItem="detailsModalItem"
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
import searchTaskOnArray from '@/composables/searchTaskOnArray'
import openTaskDetails from '@/composables/openTaskDetails'

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
    const { searchTask, onClickAwayShowSearch, onClickAway, isShowSearchModal } = searchTaskOnArray(data)
    const { detailsModalItem, isShowTaskDetails } = openTaskDetails(data)
    return {
      data,
      searchTask,
      onClickAwayShowSearch,
      onClickAway,
      detailsModalItem,
      isShowSearchModal,
      isShowTaskDetails
    }
  }
})
</script>
<style src="../assets/scss/kanban.scss" lang="scss">
</style>
