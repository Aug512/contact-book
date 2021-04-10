<template>
  <div class="contactsList">
    <header class="contactsList__header">
      <h1 class="contactsList__title">Список контактов</h1>
      <button
        class="contactsList__btn contactsList__btn--add"
        @click="createContact()"
        title="Добавить контакт"
      >
        Добавить контакт
      </button>
    </header>
    <hr>
    <ul class='contactsList__list'>
      <li class="contactsList__item item" v-for="contact of contactsList" :key="contact.name">
        <router-link
          :to="contact.linkto"
          class="item__title"
          :contact="contact"
          title="Перейти к контакту"
          
        >
          <h2>{{contact.name}}</h2>
        </router-link>
        <button
          class="item__btn item__btn--remove"
          @click="removeContact(contact)"
          title="Удалить контакт"
        >
          &times;
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ContactsList',
  computed: mapGetters(['contactsList']),
  methods: {
    ...mapActions(['removeContact', 'createContact', 'selectContact'])
  },
  mounted() {
    this.selectContact(-1)
  }
}
</script>
