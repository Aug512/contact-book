<template>
  <div class="CustomProps">
    <h2>Пользовательские поля:</h2>
    <p class="contactProp" v-for="prop of customProps" :key="prop.name" :prop="prop">
      <b>{{ prop.name }}: </b>
      <span>{{ prop.value }}</span>
      <button
        class='contactProp__btn contactProp__btn--edit'
        @click="editCustomProp(prop)"
        title="Изменить"
      >
        &#9998;
      </button>
      <button
        class='contactProp__btn contactProp__btn--remove'
        @click="removeCustomProp(prop.name)"
        title="Удалить"
      >
        &times;
      </button>
    </p>
    <button
      class='contactProp__btn contactProp__btn--add'
      @click="addCustomProp"
      title="Добавить поле"
      >
        Добавить поле
      </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ContactCustomProp',
  props: ['customProps'],
  methods: {
    ...mapActions(['editCustomProp', 'removeCustomProp', 'addCustomProp'])
  }
}
</script>
