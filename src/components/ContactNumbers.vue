<template>
  <div class="numbers">
    <h2>Телефонные номера контакта:</h2>

    <p v-if="numbers.mobile" class="contactProp">
      <b>Мобильный: </b>
      <a :href="'tel:'+numbers.mobile" class="contactProp__number" title="Вызов">{{numbers.mobile}}</a>
      <button
        class='contactProp__btn contactProp__btn--edit'
        @click="editNumber(numbers.mobile)"
        title="Изменить"
      >
        &#9998;
      </button>
      <button
        class='contactProp__btn contactProp__btn--remove'
        @click="removeNumber(numbers.mobile)"
        title="Удалить"
      >
        &times;
      </button>
    </p>

    <p v-if="numbers.work" class="contactProp">
      <b>Рабочий: </b>
      <a :href="'tel:'+numbers.work" class="contactProp__number" title="Вызов">{{numbers.work}}</a>
      <button 
        class='contactProp__btn contactProp__btn--edit'
        @click="editNumber(numbers.work)"
        title="Изменить"
      >
        &#9998;
      </button>
      <button
        class='contactProp__btn contactProp__btn--remove'
        @click="removeNumber(numbers.work)"
        title="Удалить"
      >
        &times;
      </button>
    </p>

    <p v-if="numbers.home" class="contactProp">
      <b>Домашний: </b>
      <a :href="'tel:'+numbers.home" class="contactProp__number" title="Вызов">{{numbers.home}}</a>
      <button
        class='contactProp__btn contactProp__btn--edit'
        @click="editNumber(numbers.home)"
        title="Изменить"
      >
        &#9998;
      </button>
      <button
      class='contactProp__btn contactProp__btn--remove'
      @click="removeNumber(numbers.home)"
      title="Удалить"
    >
      &times;
    </button>
    </p>

    <div v-if="numbers.others.length !== 0">
      <p v-for="number in numbers.others" :key="number" class="contactProp">
        <b>Другой: </b>
        <a :href="'tel:'+number" class="contactProp__number" title="Вызов">{{number}}</a>
        <button
          class='contactProp__btn contactProp__btn--edit'
          @click="editNumber(number)"
          title="Изменить"
        >
          &#9998;
        </button>
        <button
          class='contactProp__btn contactProp__btn--remove'
          @click="removeNumber(number)"
          title="Удалить"
        >
          &times;
        </button>
      </p>
    </div>
    <button
      class='contactProp__btn contactProp__btn--add'
      @click="addNumber"
      title="Добавить номер"
    >
      Добавить номер
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ContactNumbers',
  props: ['numbers'],
  methods: {
    ...mapActions(['editNumber', 'removeNumber', 'addNumber'])
  }
}
</script>
