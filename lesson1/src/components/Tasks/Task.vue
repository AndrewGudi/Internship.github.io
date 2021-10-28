<template>
  <div class="item-task">
    <div class="item-task__content" @click="showMenu = !showMenu">
    <div class="item-task__avatar">
      <img :src="`/images/${task.avatar}`"
           class="avatar"
           alt="Фото профиля">
    </div>
    <div class="item-task__user">
      <p>{{task.name}}</p>
    </div>
    <div class="item-task__text">
    <p>{{task.text}}</p>
    </div>
    <div class="item-task__time">
    <div class="item-task__number">{{ task.time }}</div>
    <div class="item-task__half-day">{{task.halfDay}}</div>
    </div>
    </div>
    <div class="item-task__menu" v-if="showMenu">
      <div class="item-task__avatar">
        <img :src="`/images/${carentUser.avatarka}`"
             class="avatar"
             alt="Фото профиля">
      </div>
      <div class="item-task__user">
        <p>{{carentUser.username}}</p>
      </div>
      <input class="item-task__input" type="text">
      <button class="item-task__button" @click="showMenu = !showMenu">Send</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Task',
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {
      showMenu: false
    }
  },
  props: {
    carentUser: {
      type: Object,
      require: true
    },
    task: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
