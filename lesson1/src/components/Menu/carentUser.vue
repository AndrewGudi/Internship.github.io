<template>
  <div class="item-menu item-menu__flex item-menu__background ">
    <div class="item-menu__avatar">
      <img
            :src="`/images/${carentUser.avatarka}`"
            alt="">
    </div>
    <div class="item-menu__name">
      <div class="item-menu__text">
        {{ carentUser.username }}
      </div>
      <div class="item-menu__text">Product Owner</div>
    </div>
    <div class="item-menu__settings settings">
      <button class="item-menu__button">
                  <span class="item-menu__dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'carentUser',
  props: {
    carentUser: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
