<script>
import {startAnimation} from "@/functions/startAnimation.js";
import {stopAnimation} from "@/functions/stopAnimation.js";
import {triggerBlackHole} from "@/functions/triggerBlackHole.js";
import {toggleSearch} from "@/functions/toggleSearch.js";
import {searchProfile} from "@/functions/searchProfile.js";

export default {
  name: "CenterLogo",
  props: ['profiles'],
  methods: {searchProfile, toggleSearch, triggerBlackHole, stopAnimation, startAnimation},
  data() {
    return {
      centerLogo: {
        src: 'https://i.gifer.com/fetch/w300-preview/a0/a036852c35c131638e744d170654f9ba.gif',
        alt: "Center logo",
      },
      hideLogo: false,
      blackHoleActive: false,
      showSearch: false,
      foundProfile: null,
      searchQuery: '',
    }
  },
}
</script>

<template>
  <div
      :class="['center-logo', { 'center-logo-hidden': hideLogo }]"
      @mouseover="startAnimation"
      @mouseleave="stopAnimation"
      @click="triggerBlackHole"
      ref="logo"
  >
    <img :src="centerLogo.src" :alt="centerLogo.alt" />
  </div>

  <transition name="fade">
    <div v-if="showSearch" class="search-container">
      <button @click="toggleSearch">Feed</button>
      <button @click="toggleSearch">Back</button>
      <input type="text" v-model="searchQuery" placeholder="Search profile by name" @input="searchProfile"/>
      <button @click="toggleSearch" class="btn-calendar">Calendar</button>
    </div>
  </transition>

  <transition name="fade">
    <div v-if="foundProfile" class="profile-info-container">
      <div class="profile-header">
        <img :src="foundProfile.src" :alt="foundProfile.alt" class="profile-pic">
        <div class="profile-details">
          <p class="profile-name">{{ foundProfile.name }}</p>
          <p class="profile-position">{{ foundProfile.position }}</p>
          <p class="profile-city">{{ foundProfile.city }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>

.center-logo {
  position: fixed;
  top: 92%;
  left: 50%;
  border: 1px solid #fff;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  height: 60px;
  width: 60px;
  z-index: 10;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.center-logo img {
  border-radius: 50%;
  height: 100%;
  width: 100%;
}

.center-logo-hidden {
  animation: blackHoleCollapse 1s forwards;
}

@keyframes blackHoleCollapse {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    transform: translate(-50%, -50%) scale(0);
  }
}


.search-container {
  position: fixed;
  top: 92%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 8px;
  z-index: 10;
  transition: opacity 0.3s;
  background: linear-gradient(to bottom, transparent, #181818);

}

.search-container input {
  margin-right: 5px;
  color: #fff;
  width: 200px;
  height: 50px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 25px;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgba(10, 10, 10, 0.85);
}


.search-container button {
  margin-right: 5px;
  padding: 10px;
  height: 50px;
  border: none;
  background-color: #2c3e50;
  color: white;
  cursor: pointer;
  border-radius: 50%;
}

.btn-calendar {
  padding: 5px !important;
  font-size: 10px;
}

.search-container button:hover {
  background-color: #181818;
}

.profile-info-container {
  position: fixed;
  top: 76%;
  left: 43%;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgba(10, 10, 10, 0.85);
  padding: 10px 15px;
  z-index: 10;
}

.profile-info-container .profile-header {
  display: flex;
  align-items: center;
}

.profile-info-container .profile-pic {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}

.profile-info-container .profile-details {
  flex-grow: 1;
}

.profile-info-container .profile-name {
  font-size: 16px;
  font-weight: bold;
}

.profile-info-container .profile-position {
  font-size: 14px;
  color: #666;
}

.profile-info-container .profile-city {
  font-size: 12px;
  color: #aaa;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes collapse {
  from {
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    transform: translate(-50%, -50%) scale(0);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

</style>
