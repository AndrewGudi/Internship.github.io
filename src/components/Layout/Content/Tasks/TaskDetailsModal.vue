<template lang="pug">
.task-details
  .task-details__bg(@click="openTaskDetailsEmit(isShowTaskDetails)")
  .task-details__modal
    .task-details__body
      .task-details__culomn
        .task-details__user
          .task-details__avatar
            img(:src="`/images/${task.avatar}`" alt="#")
          .task-details__user-name
            .task-details__first-name
              p {{task.firstname}}
            .task-details__last-name
              p {{task.lastname}}
          .task-details__task-date
            .task-details__post From: {{task.postDate.date}}
            .task-details__completion To: {{task.executeBefore.date}}
        .task-details__text
          .task-details__task-name
            p(v-if="data.isShowButtonEdit") {{task.name}}
            textarea(v-model="changeName" v-if="!data.isShowButtonEdit" type="text" maxlength = "100") {{changeName}}
          .task-details__task-description
            p(v-if="data.isShowButtonEdit") {{task.description}}
            textarea(v-model="changeDescription" v-if="!data.isShowButtonEdit" type="text" maxlength = "100") {{changeDescription}}
        button.task-details__button.edit(
          @click="data.isShowButtonEdit = !data.isShowButtonEdit; changeTask()"
          v-if="data.isShowButtonEdit && !isShowEdit"
          ) Edit
        button.task-details__button.cancel(
          @click="openTaskDetailsEmit(isShowTaskDetails)"
          v-if="!data.isShowButtonEdit || data.isShowButtonEdit && isShowEdit"
          ) Cancel
      .task-details__button-box
        button.task-details__button.save(
          v-if="data.isShowButtonSave"
          @click="changeObject(changeName, changeDescription).then(); openTaskDetailsEmit(isShowTaskDetails)"
          ) Save
</template>

<script lang="ts">
import { defineComponent, inject, PropType, reactive, toRefs } from 'vue'
import { StatusType } from '@/constants/enumStatusType'
import { mixin as VueClickAway } from 'vue3-click-away'
import checkChange from '@/composables/checkChange'
import { TaskInterface } from '@/types/task.interface'
import openTaskDetails from '@/composables/openTaskDetails'

export default defineComponent({
  name: 'TaskDetailsModal',
  mixins: [VueClickAway],
  props: {
    task: {
      type: Object as PropType<TaskInterface>,
      required: true
    }
  },
  setup (props, context) {
    const data = reactive({
      status: StatusType,
      isShowButtonSave: false,
      isShowButtonEdit: true
    })
    const isShowEdit = inject('isShowEdit')
    const isShowTaskDetails = inject('isShowTaskDetails')
    console.log(isShowTaskDetails)
    const { task } = toRefs(props)
    const { changeName, changeDescription, changeTask, changeObject } = checkChange(data, task)
    const { openTaskDetailsEmit } = openTaskDetails(data, context)
    return {
      data,
      changeName,
      changeDescription,
      changeTask,
      isShowEdit,
      isShowTaskDetails,
      openTaskDetailsEmit,
      changeObject
    }
  }
})
</script>

<style scoped lang="scss">
.task-details{
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: calc(100% - 136px);
  z-index: 20;
  &__bg{
    width: 100%;
    height: 100%;
    background: #aeaeae;
    opacity: 0.8;
  }
  &__modal{
    position: absolute;
    background: #ffffff;
    margin: 100px 10px 0 10px;
    border: 2px solid #FFC200;
    padding: 0 10px;
    border-radius: 10px;
    min-width: 400px;
    max-width: 400px;
    height: 200px;
  }
  &__body{
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  &__culomn{
    display: flex;
    margin-top: 10px;
    height: 150px;
  }
  &__avatar{
    height: 40px;
    width: 40px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  &__task-name {
    border: 2px solid rgba(0, 0, 0, 0.18);
    border-radius: 10px;
    padding: 5px;
    resize: none;
    overflow : auto;
    height: 30px;
    margin-bottom: 10px;
    &::-webkit-scrollbar {
      width: 0;
    }

    & {
      -ms-overflow-style: none;
    }

    & {
      overflow: -moz-scrollbars-none;
    }
  }
  &__last-name{
    margin-bottom: 8px;
  }
  &__post{
    margin-bottom: 2px;
  }
  &__task-name:focus{
    border: 2px solid #FFC200;
  }
  &__task-description {
    border: 2px solid rgba(0, 0, 0, 0.18);
    padding: 5px;
    height: 100px;
    overflow: auto;
    border-radius: 10px;
    &::-webkit-scrollbar {
      width: 0;
    }

    & {
      -ms-overflow-style: none;
    }

    & {
      overflow: -moz-scrollbars-none;
    }
  }
  &__task-description:focus{
    border: 2px solid #FFC200;
  }
  &__user{
    width: 22%;
  }
  &__text{
    margin: 0 10px;
    width: 55%;
  }
  &__button-box{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__button{
    position: relative;
    color: #131313;
    min-width: 20%;
    height: 30px;
    background: #EAEAEA;
    background-size: 16px;
    border-radius: 15px;
    opacity: 0.7;
    border: none;
    font-size: 18px;
    text-align: center;
  }

  &__button:active{
    background: #fff8dd;
    color: #FFC200;
  }
  &__button:active{
    background: #fff8dd;
    color: #FFC200;
  }
}
.save{
  width: 200px;
}
textarea {
  resize: none;
  width: 100%;
  height: 100%;
  font-size: 14px;
  line-height: 1;
  &::-webkit-scrollbar {
    width: 0;
  }

  & {
    -ms-overflow-style: none;
  }

  & {
    overflow: -moz-scrollbars-none;
  }
}
@media (min-width: 375px) and (max-width: 420px){
  .task-details {
    &__modal {
      position: absolute;
      background: #ffffff;
      margin-top: 100px;
      border: 2px solid #FFC200;
      padding: 0 10px;
      border-radius: 10px;
      min-width: 90%;
      height: 200px;
    }

    &__body {
      display: flex;
      width: 100%;
      flex-direction: column;
    }
  }
}
@media (min-width: 300px) and (max-width: 374px) {
  .task-details {
    &__modal {
      position: absolute;
      background: #ffffff;
      margin-top: 100px;
      border: 2px solid #FFC200;
      padding: 0 10px;
      border-radius: 10px;
      min-width: calc(100% - 20px);
      height: 360px;
    }
    &__culomn{
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 300px;
    }
    &__user{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
      width: 100%;
    }
    &__avatar{
      width: 80px;
      height: 80px;
    }
    &__user-name{
      width: 80%;
      display: flex;
      font-size: 20px;
      font-weight: bold;
      justify-content: center;
      margin-top: 10px;
    }
    &__first-name{
      margin-right: 10px;
    }
    &__task-date{
      display: flex;
      justify-content: center;
    }
    &__post{
      margin-right: 10px;
    }
    &__text{
      width: 90%;
    }
  }
  .edit,.cancel{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 62px;
  }
}
</style>
