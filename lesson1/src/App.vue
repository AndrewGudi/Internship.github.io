<template>
  <div class="menu" v-if="showMenu" >
    <div class="menu__body">
      <div class="menu__column">
        <div class="menu__header">
          <div class="item-menu item-menu__flex">
            <div class="item-menu__icon-logo">
            </div>
            <div class="item-menu__text-logo">projectus</div>
            <button class="item-menu__search">
            </button>
          </div>
        </div>
        <div class="menu__nav">
          <div class="menu__column">
            <carentUser
            v-bind:carentUser="carentUser"
            />
            <div class="item-menu item-menu__flex-start">
              <div class="item-menu__questions">
                <button class="item-menu__number-questions" @click="showWindow = !showWindow">
                  {{ CompletedTask}}
                </button>
                <div class=" item-menu__sub-text">Completed Tasks</div>
              </div>
              <div class="item-menu__questions">
                <div class="item-menu__number-questions">
                  {{ tasks.length }}
                </div>
                <div class="item-menu__sub-text">Open Tasks</div>
              </div>
            </div>
            <div class="item-menu item-menu__column">
              <div class="item-menu__text title">
                menu
              </div>
              <a class="item-menu__link" href="#">
                Home
              </a>
              <a class="item-menu__link" href="#">
                My Tasks
              </a>
              <a class="item-menu__link" href="#">
                Notification
                <div class="item-menu__notification">
                  {{ notification.id }}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="popup-window" v-if="showWindow">
    <div class="popup-window__text" v-if="tasks.length>0">
      Are you sure you want to change the number of tasks?
    </div>
    <div class="popup-window__text" v-if="tasks.length===0">
      Sorry, but all tasks have already been completed.
    </div>
    <div class="popup-window__buttons">
      <button class="popup-window__button popup-window__button_true"
              v-if="OpenTask>0"
              v-on:click.once="`${CompletedTask+=1}${tasks.length = tasks.length-1}`"
              @click="showWindow = !showWindow"
      >Yes</button>
      <button class="popup-window__button popup-window__button_false"
              v-if="OpenTask>0"
              @click="showWindow = !showWindow"
      >No</button>
    </div>
  </div>
  <div class="header">
  <div class="header-top">
    <div class="header-top__body">
      <div class="header-top__container">
        <div class="item-header">
          <div class="item-header__logo">
          </div>
          <div class="item-header__text">
            <h1>Website Redesign</h1>
          </div>
          <div class="item-header__settings">
            <button class="item-header__button" v-bind:class="{'white': !showMenu, 'gray': showMenu}" @click="showMenu = !showMenu">
              <span class=" item-header__dots">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
        <div class="item-header item-header__end">
          <div class="item-header__avatars">
            <div class="item-header__avatar">
            </div>
            <div class="item-header__avatar">
            </div>
            <div class="item-header__avatar">
            </div>
          </div>
          <div class="item-header__buttons">
            <a class="item-header__link">Share</a>
            <a class="item-header__link"></a>
          </div>
        </div>
      </div>
      <div class="header-top__nav" id="nav">
        <div class="tab-menu">
          <router-link to="/Tasks">Tasks <p></p></router-link>
          <router-link to="/Kanban">Kanban <p></p></router-link>
          <router-link to="/">Activity <p></p></router-link>
          <router-link to="/Calendar">Calendar <p></p></router-link>
          <router-link to="/Files">Files <p></p></router-link>
        </div>
      </div>
    </div>
  </div>
  <router-view/>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import carentUser from '@/components/Menu/carentUser.vue'
export default {
  components: {
    carentUser
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {
      showMenu: false,
      showWindow: false,
      CompletedTask: 372,
      OpenTask: 10
    }
  },
  computed: {
    ...mapGetters({
      tasks: 'getTasks',
      notification: 'getNotification',
      carentUser: 'carentUser'
    })
  }
}
</script>
<style src="./assets/css/app.css">
</style>
