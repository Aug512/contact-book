<template>
  <div id="app">
    <transition name="fade"> 
      <ConfirmModal v-if="confirmModalData.visibility" />
      <PhoneNumberModal v-if="phoneNumberModalData.visibility" />
      <UserDataModal v-if="userDataModalData.visibility" />
      <CustomFieldsModal v-if="customFieldsModalData.visibility" />
      <NewContactModal v-if="newContactModalData.visibility" />
    </transition>

    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConfirmModal from './components/modals/ConfirmModal'
import PhoneNumberModal from './components/modals/PhoneNumberModal'
import UserDataModal from './components/modals/UserDataModal'
import CustomFieldsModal from './components/modals/CustomFieldsModal'
import NewContactModal from './components/modals/NewContactModal'
import './globalStyles.scss'

export default {
  computed: {
    ...mapGetters(['confirmModalData', 'phoneNumberModalData', 'userDataModalData', 'customFieldsModalData', 'newContactModalData'])
  },
  components: {
    ConfirmModal,
    PhoneNumberModal,
    UserDataModal,
    CustomFieldsModal,
    NewContactModal,
  }
}
</script>

<style lang="scss">

.fade-enter-active, .fade-leave-active {
  transition: opacity .7s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  width: 70%;
  max-width: 900px;
  min-width: 300px;
  margin: 0 auto;
  padding-top: 50px;
}
</style>
