<template>
  <div v-if="load" class="contact">
    <header class="contact__header">
      <h1 class="contact__title">{{currentContact.name}}</h1>
      <hr>
      <div class="contact__header--btnPos">
        <router-link class="contact__btn contact__btn--back" to="/">Вернуться к списку</router-link>
        <button
          class="contact__btn contact__btn--rev"
          :disabled="!currentContact.prevState"
          @click="revertLastChange"
          title="Отмена предыдущего изменения"
        >
          Отменить последнее действие
        </button>
      </div>
    </header>
    <hr>
    <ContactNumbers :numbers="currentContact.numbers" />
    <hr>
    <ContactData :data="currentContact.data" />
    <hr>
    <ContactCustomProps :customProps="currentContact.custom" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ContactNumbers from '../components/ContactNumbers'
import ContactData from '../components/ContactData'
import ContactCustomProps from '../components/ContactCustomProps'

export default {
  name: 'Contact',
  data() {
    return {
      load: false,
      contactIndex: undefined,
    }
  },
  computed: {
    ...mapGetters(['contactsList']),
    currentContact: function () {
      return this.contactsList[this.contactIndex]
    },
  },
  methods: mapActions(['revertLastChange', 'selectContact']),
  components: {
    ContactNumbers,
    ContactData,
    ContactCustomProps,
  },
  beforeMount() {
    const contact = this.contactsList.find(contact => contact.linkto === `/${this.$attrs.name}`)
    const contactIndex = this.contactsList.findIndex(contact => contact.linkto === `/${this.$attrs.name}`)

    if (contactIndex === -1 ) {
      location.replace('/')
    } else {
      this.selectContact(contact)
      this.contactIndex = contactIndex
      this.load = true
    }
  },
}
</script>
