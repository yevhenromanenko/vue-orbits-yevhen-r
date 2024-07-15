<script>
import {formatDate} from "../functions/formatDate.js";
import {toggleText} from "@/functions/toggleText.js";

export default {
  name: "ProfileInfo",
  data() {
    return {
      isTextExpanded: false,
    }
  },
  props: ['hoveredProfile', 'infoPosition', 'isProfileInfoHovered', 'maxMessageLength', 'handleProfileInfoEnter', 'handleProfileInfoLeave'],
  computed: {
    profileInfoStyles() {
      if (!this.hoveredProfile) return {};

      const {top, left, width, height, position} = this.infoPosition;
      return {
        top: `${top - 15}px`,
        left: position === 'right' ? `${left + width - 80}px` : 'auto',
        right: position === 'left' ? `${window.innerWidth - left - 80}px` : 'auto',
      };
    },
    truncatedMessage() {
      if (this.hoveredProfile && this.hoveredProfile._orbits_last_message.message.length > this.maxMessageLength) {
        return this.hoveredProfile._orbits_last_message.message.substring(0, this.maxMessageLength) + '...';
      }
      return this.hoveredProfile._orbits_last_message.message;
    },
    isMessageTruncated() {
      return this.hoveredProfile && this.hoveredProfile._orbits_last_message.message.length > this.maxMessageLength;
    }
  },
  methods: { toggleText, formatDate },
}
</script>

<template>
  <div
      v-if="hoveredProfile"
      :style="profileInfoStyles"
      class="profile-info"
      :class="{ show: hoveredProfile }"
      @mouseenter="handleProfileInfoEnter"
      @mouseleave="handleProfileInfoLeave"
  >
    <div class="profile-header">
      <div v-if="infoPosition.position === 'left'" class="profile-details left">
        <p class="profile-name profile-name-right">{{ hoveredProfile.name }}</p>
        <p class="profile-position profile-name-right">{{ hoveredProfile.position }}</p>
        <p class="profile-city profile-name-right">{{ hoveredProfile.city }}</p>
      </div>

      <img :src="hoveredProfile.src" alt="Profile Picture" class="profile-pic">

      <div v-if="infoPosition.position === 'right'" class="profile-details right">
        <p class="profile-name">{{ hoveredProfile.name }}</p>
        <p class="profile-position">{{ hoveredProfile.position }}</p>
        <p class="profile-city">{{ hoveredProfile.city }}</p>
      </div>
    </div>
    <div class="profile-message">
      <div class="reply-from">
        <font-awesome-icon class="mail-logo" icon="envelope" /> Reply from Emery Wells
      </div>
      <div class="reply-from-bottom">
        <p>{{ formatDate(hoveredProfile.date, 'profile') }}</p>
        <p class="profile-name">{{ hoveredProfile._orbits_last_message.message_head }}</p>
        <p v-if="!isTextExpanded">{{ truncatedMessage }}</p>
        <p v-else>{{ hoveredProfile._orbits_last_message.message }}</p>
        <button v-if="isMessageTruncated" class="more-btn" @click="toggleText">
          {{ isTextExpanded ? 'Less ▲' : 'More ▼' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-info {
  position: absolute;
  background: linear-gradient(0deg, rgba(10, 10, 10, 0.65), rgba(10, 10, 10, 0.65)), linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%), rgba(255, 255, 255, 0.05);
  color: #fff;
  max-width: 452px;
  padding: 10px;
  border-radius: 10px;
  z-index: 99999;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}



.profile-header {
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: linear-gradient(0deg, rgba(10, 10, 10, 0.65), rgba(10, 10, 10, 0.65)), linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%), rgba(255, 255, 255, 0.05);
}

.profile-message {
  font-size: 12px;
  color: #fff;
  background: linear-gradient(0deg, rgba(10, 10, 10, 0.65), rgba(10, 10, 10, 0.65)), linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%), rgba(255, 255, 255, 0.05);
  border-radius: 5px;
}

.profile-pic {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}

.profile-details.right {
  order: 1;
  margin-left: 10px;
}

.profile-details.left {
  order: -1;
  margin-left: auto;
}

.profile-details {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.profile-name {
  font-size: 16px;
  margin: 0;
  font-weight: bold;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  color: #FFFFFF;
  flex: none;
  order: 0;
  flex-grow: 0;
}



.profile-position, .profile-city {
  font-size: 14px;
  margin: 0;
}

.profile-name-right {
  margin-left: auto;
}

.mail-logo {
  margin-right: 5px;
}

.reply-from {
  padding: 10px;
  width: 100%;
  height: 38px;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgba(10, 10, 10, 0.85);
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

.reply-from-bottom {
  padding: 10px;
}

.more-btn {
  margin-top: 2px;
  padding: 5px 10px;
  border: none;
  background: none;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}

.more-btn:hover {
  background-color: black;
}

.profile-info.show {
  opacity: 1;
  transform: translateY(0);
}

</style>
