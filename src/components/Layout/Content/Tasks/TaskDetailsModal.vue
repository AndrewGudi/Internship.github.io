<template lang="pug">
.task-details
  .task-details__bg(@click="clickShowTaskDetailsWindow")
  .task-details__modal
    .task-details__body
      .task-details__culomn
        .task-details__user
          .task-details__avatar
            img(:src="`/images/${item.avatar}`" alt="#")
          .task-details__user-name
            .task-details__first-name
              p {{item.firstname}}
            .task-details__last-name
              p {{item.lastname}}
          .task-details__task-date
            .task-details__post From: {{item.postDate.date}}
            .task-details__completion To: {{item.executeBefore.date}}
        .task-details__text
          .task-details__task-name
            p(v-if="showButtonEdit === true") {{item.name}}
            textarea(v-model="changeName" v-if="showButtonEdit !== true" type="text" maxlength = "100") {{this.changeName}}
          .task-details__task-description
            p(v-if="showButtonEdit === true") {{item.description}}
            textarea(v-model="changeDescription" v-if="showButtonEdit !== true" type="text" maxlength = "100") {{this.changeDescription}}
        button.task-details__button.edit(
          v-on:click="showButtonEdit = !showButtonEdit; changeTask()"
          v-if="showButtonEdit && !isShowEdit"
          ) Edit
        button.task-details__button.cancel(
          @click="clickShowTaskDetailsWindow"
          v-if="showButtonEdit !== true ||  showButtonEdit && isShowEdit"
          ) Cancel
      .task-details__button-box
        button.task-details__button.save(
          v-if="showButtonSave"
          @click="changeObject(this.changeName, this.changeDescription); clickShowTaskDetailsWindow()"
          ) Save
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TaskInterface } from '@/types/task.interface'
import { mapActions } from 'vuex'
import { StatusType } from '@/constants/enumStatusType'
import { mixin as VueClickAway } from 'vue3-click-away'

export default defineComponent({
  name: 'TaskDetailsModal',
  mixins: [VueClickAway],
  data: () => ({
    status: StatusType,
    showButtonSave: false,
    showButtonEdit: true,
    changeName: '',
    changeDescription: ''
  }),
  props: {
    item: {
      type: Object as PropType<TaskInterface>,
      required: true
    },
    isShowTaskDetails: {
      type: Boolean,
      required: true
    },
    isShowEdit: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    changeName () {
      this.showButtonSave = this.changeName !== this.item.name
    },
    changeDescription () {
      this.showButtonSave = this.changeDescription !== this.item.description
    }
  },
  methods: {
    ...mapActions(['changeObjectDetails']),
    clickShowTaskDetailsWindow () {
      this.$emit('isShowTaskDetails', this.isShowTaskDetails)
    },
    changeTask () {
      this.changeName = this.item.name
      this.changeDescription = this.item.description
    },
    changeObject (name: TaskInterface, description: TaskInterface) {
      this.changeObjectDetails({ id: this.item.id, name: name, description: description })
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
