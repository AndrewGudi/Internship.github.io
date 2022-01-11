<template lang="pug">
.header-top
  .header-top__body
    .header-top__container
      .item-header
        .item-header__logo
        .item-header__text
          h1 Website Redesign
        .item-header__settings
          button.item-header__button( :class="{'white': !showMenu, 'gray': showMenu}" @click="clickShowMenu")
            .item-header__dots
              span
              span
              span
      .item-header.item-header__end
        .item-header__avatars
          friend-avatar(v-for="friend of friends" v-if="friends.length = 3" :friend="friend" :key="friend.id")
        .item-header__buttons
          header-btn(class="header-btn__share") Share
          header-btn(class="header-btn__chat") Chat
    .header-top__nav#nav
      .tab-menu
        router-link(to="/")
          | Tasks
          p
        router-link(to="/Kanban")
          | Kanban
          p
        router-link(to="/Activity")
          | Activity
          p
        router-link(to="/Calendar")
          | Calendar
          p
        router-link(to="/Files")
          | Files
          p
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FriendAvatar from '@/components/Layout/Header/HeaderFriendsAvatars/FriendAvatar.vue'
import { mapState } from 'vuex'
import HeaderBtn from '@/components/Layout/Header/HeaderBtn.vue'
export default defineComponent({
  components: { HeaderBtn, FriendAvatar },
  props: {
    showMenu: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState(['friends'])
  },
  methods: {
    clickShowMenu () {
      this.$emit('showMenu', this.showMenu)
    }
  }
})
</script>

<style scoped lang="scss">
.header-btn{
  &__share{
    margin-right: 15px;
    width: 67px;
    color: #131313;
    background: #EAEAEA;
  }
  &__chat{
    content: "Chat";
    float: left;
    position: relative;
    background: url("../../../assets/images/shape.svg") no-repeat 20% 50% #fff8dd;
    background-size: 16px;
    width: 81px;
    border-radius: 15px;
    border: none;
    font-size: 14px;
    color: #FFC200;
    text-align: right;
    padding: 7px 14px 7px 7px;
  }
}
</style>
