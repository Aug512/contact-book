<template>
  <div class="data">
    <h2>Данные контакта:</h2>

    <p v-if="data.email" class="contactProp">
      <b>E-mail: </b>
      <a target='_blank' class="contactProp__email" :href="`mailto:${data.email}`" title="Написать письмо">{{data.email}}</a>
      <button
        class='contactProp__btn contactProp__btn--edit'
        @click="editDataField(data.email)"
        title="Изменить"
      >
        &#9998;
      </button>
      <button
        class='contactProp__btn contactProp__btn--remove'
        @click="removeDataField(data.email)"
        title="Удалить"
      >
        &times;
      </button>
    </p>

    <p v-if="data.url" class="contactProp">
      <b>Веб-сайт: </b>
      <a target='_blank' class="contactProp__url" :href="data.url" title="Открыть в новой вкладке">{{data.url}}</a>
      <button
        class='contactProp__btn contactProp__btn--edit'
        @click="editDataField(data.url)"
        title="Изменить"
      >
        &#9998;
      </button>
      <button
        class='contactProp__btn contactProp__btn--remove'
        @click="removeDataField(data.url)"
        title="Удалить"
      >
        &times;
      </button>
    </p>

    <p v-if="data.birthday" class="contactProp">
      <b>День рождения: </b>
      <span>{{new Date(data.birthday).toLocaleDateString()}}</span>
      <button
        class='contactProp__btn contactProp__btn--edit'
        @click="editDataField(data.birthday)"
        title="Изменить"
      >
        &#9998;
      </button>
      <button
        class='contactProp__btn contactProp__btn--remove'
        @click="removeDataField(data.birthday)"
        title="Удалить"
      >
        &times;
      </button>
    </p>

    <p v-if="data.adress" class="contactProp">
      <b>Адрес: </b>
      <span>{{data.adress}}</span>
      <button
        class='contactProp__btn contactProp__btn--edit'
        @click="editDataField(data.adress)"
        title="Изменить"
      >
        &#9998;
      </button>
      <button
        class='contactProp__btn contactProp__btn--remove'
        @click="removeDataField(data.adress)"
        title="Удалить"
      >
        &times;
      </button>
    </p>

    <button
      v-if="!addButtonVisibility"
      class='contactProp__btn contactProp__btn--add'
      @click="addDataField"
      title="Добавить поле"
    >
      Добавить поле
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ContactData',
  props: ['data'],
  computed: {
    addButtonVisibility: function() {
    return Object.values(this.data).every(val => val === null ? false : true)
    }
  },
  methods: {
    ...mapActions(['editDataField', 'removeDataField', 'addDataField'])
  },
}
</script>
