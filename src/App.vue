<template>
  <div>
    <div id="app" class="orbit-app">
      <div
          v-for="(style, index) in orbitStyles"
          :key="'orbit-' + (index === 7 ? 1 : index === 8 ? 0 : index + 2)"
          :style="style"
          :class="['orbit', 'orbit-' + (index === 7 ? 1 : index === 8 ? 0 : index + 2), 'orbit-' + (index === 7 ? 1 : index === 8 ? 0 : index + 2) + '-active', { 'hidden': orbit6Hidden && index === 6 || orbit5Hidden && index === 5 }]"
          v-if="index !== 6 || !orbit6Hidden"
      >
        <span
            class="profile"
            v-for="(profile, profileIndex) in profiles[index === 7 ? 1 : index === 8 ? 0 : index + 2]"
            :key="'orbit-' + (index === 7 ? 1 : index === 8 ? 0 : index + 2) + '-' + profileIndex"
            :style="profile.style"
            :class="{
              'hidden': profile.style.top === '0%' && profile.style.left === '50%' &&
                ((index === 6 && !orbit6Hidden) ||
                (index === 5 && orbit6Hidden && !orbit5Hidden) ||
                (index === 4 && orbit6Hidden && orbit5Hidden))
            }"
            @mouseover="showInfo(profile, $event)"
            @mouseleave="hideInfo"
        >
          <img :src="profile.src" :alt="profile.alt" />
        </span>
        <div v-if="(index === 6 && !orbit6Hidden) || (index === 5 && orbit6Hidden && !orbit5Hidden) || (index === 4 && orbit6Hidden && orbit5Hidden)">
          <div class="today" v-if="profiles[index === 7 ? 1 : index === 8 ? 0 : index + 2].find(profile => profile.date)">
            {{ profiles[index === 7 ? 1 : index === 8 ? 0 : index + 2].find(profile => profile.date).date === today ? 'Today' : formatDate(profiles[index === 7 ? 1 : index === 8 ? 0 : index + 2].find(profile => profile.date).date) }}
          </div>
        </div>
      </div>

      <center-logo :profiles="profiles"></center-logo>
    </div>

    <profile-info
      :hovered-profile="hoveredProfile"
      :info-position="infoPosition"
      :is-profile-info-hovered="isProfileInfoHovered"
      :max-message-length="maxMessageLength"
      :handle-profile-info-enter="handleProfileInfoEnter"
      :handle-profile-info-leave="handleProfileInfoLeave"
    ></profile-info>

    <div class="darkening"></div>
  </div>
</template>

<script>
import { throttle } from 'lodash';
import {formatDate} from "@/functions/formatDate.js";
import {calculatePoints} from "@/functions/calculatePoints.js";
import {showInfo} from "@/functions/showInfo.js";
import {hideInfo} from "@/functions/hideInfo.js";
import {assignProfiles} from "@/functions/assignProfiles.js";
import {fetchProfiles} from "@/functions/fetchProfiles.js";
import {getDateKey} from "@/functions/getDateKey.js";
import {handleScroll} from "@/functions/handleScroll.js";
import ProfileInfo from "@/components/ProfileInfo.vue";
import {handleProfileInfoEnter} from "@/functions/handleProfileInfoEnter.js";
import {handleProfileInfoLeave} from "@/functions/handleProfileInfoLeave.js";
import CenterLogo from "@/components/CenterLogo.vue";

export default {
  components: {CenterLogo, ProfileInfo},
  data() {
    return {
      scrollPercentage: (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
      today: new Date().toISOString().split('T')[0],
      profiles: [[], [], [], [], [], [], [], [], []],
      hoveredProfile: null,
      profilesByDate: {},
      lastScrollPercent: 0,
      isScrollingUp: false,
      infoPosition: { top: 0, left: 0 },
      isProfileInfoHovered: false,
      maxMessageLength: 133,
      initialOrbitStyles: [
        { marginTop: '7%', height: '84%', width: '42%', zIndex: 7 },
        { marginTop: '7%', height: '104%', width: '52%', zIndex: 6 },
        { marginTop: '7%', height: '124%', width: '62%', zIndex: 5 },
        { marginTop: '7%', height: '144%', width: '72%', zIndex: 4 },
        { marginTop: '7%', height: '164%', width: '82%', zIndex: 3 },
        { marginTop: '7%', height: '184%', width: '92%', zIndex: 2 },
        { marginTop: '7%', height: '204%', width: '102%', zIndex: 1 },
      ],
      orbitStyles: [
        { marginTop: '7%', height: '84%', width: '42%', zIndex: 7 },
        { marginTop: '7%', height: '104%', width: '52%', zIndex: 6 },
        { marginTop: '7%', height: '124%', width: '62%', zIndex: 5 },
        { marginTop: '7%', height: '144%', width: '72%', zIndex: 4 },
        { marginTop: '7%', height: '164%', width: '82%', zIndex: 3 },
        { marginTop: '7%', height: '184%', width: '92%', zIndex: 2 },
        { marginTop: '7%', height: '204%', width: '102%', zIndex: 1 },
      ],
      hideCenterProfile: false,
      orbit5Hidden: false,
      orbit6Hidden: false,
      todayOrbitIndex: 6,
    }
  },
  methods: {
    formatDate,
    handleProfileInfoLeave,
    handleProfileInfoEnter,
    fetchProfiles,
    assignProfiles,
    calculatePoints,
    showInfo,
    hideInfo,
    getDateKey,
    handleScroll,
  },
  created() {
    this.fetchProfiles();
  },
  mounted() {
    window.addEventListener('scroll', throttle(this.handleScroll, 100));
  },
  beforeDestroy() {
    window.removeEventListener('scroll', throttle(this.handleScroll, 100));
  }
};
</script>

<style scoped>
.orbit-app {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  height: 300vh;
  overflow: hidden;
}

.orbit {
  position: fixed;
  marginTop: 10%;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid #fff;
  height: 200%;
  transition: all 0.1s ease-in-out;
}


.hidden {
  display: none !important;

}

.orbit:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.5) 100%);
}

.orbit span.profile {
  position: absolute;
  transition: transform 0.1s ease;
}

.orbit-0 { margin-top: 7%; height: 0%; width: 0%; z-index: 9; opacity: 0;}
.orbit-1 { margin-top: 7%; height: 0%; width: 0%; z-index: 8; opacity: 0; }
.orbit-2 { margin-top: 7%; height: 84%; width: 42%; z-index: 7; }
.orbit-3 { margin-top: 7%; height: 104%; width: 52%; z-index: 6; }
.orbit-4 { margin-top: 7%; height: 124%; width: 62%; z-index: 5; }
.orbit-5 { margin-top: 7%; height: 144%; width: 72%; z-index: 4; }
.orbit-6 { margin-top: 7%; height: 164%; width: 82%; z-index: 3; }
.orbit-7 { margin-top: 7%; height: 184%; width: 92%; z-index: 2; }
.orbit-8 { margin-top: 7%; height: 204%; width: 102%; z-index: 1; }


@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.profile {
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  width: 60px;
  height: 60px;
  z-index: 10;
  background-color: #181818;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 15px;
}

.profile img {
  position: absolute;
  border: 8px solid #181818;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  transform-origin: initial;
  backdrop-filter: blur(12.5px);
  z-index: 11;
}

.profile:hover {
  transform: scale(1.2);
}


.today {
  position: absolute;
  padding: 10px;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #181818;
  font-size: 14px;
}

.darkening {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200%;
  height: 10%;
  z-index: 999;
  pointer-events: none;
}

.darkening::before,
.darkening::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #181818);
  pointer-events: none;
}

.darkening::before {
  left: 0;
}

.darkening::after {
  right: 0;
}
</style>
