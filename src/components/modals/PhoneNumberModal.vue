<template>
  <div class="modal__overlay">
    <div class="modal__container">
      <h3 class="modal__title">{{ phoneNumberModalData.message }}</h3>
      <hr>
      <form
        class="modal__form"
        @submit.prevent="formSubmitHandler"
      >

        <label v-if="phoneNumberModalData.operation === 'add'">
          <p class="modal__description">Выберите тип номера:</p>
          <select v-model="numberType" required class="modal__input modal__select">
            <option disabled value=''>Выберите один из вариантов</option>
            <option
              :disabled="contactNumbers(currentContactIndex).mobile ? true : false"
              :title="contactNumbers(currentContactIndex).mobile ? 'Такой тип уже существует' : null"
              value="mobile"
            >
              Мобильный
            </option>
            <option
              :disabled="contactNumbers(currentContactIndex).work ? true : false"
              :title="contactNumbers(currentContactIndex).work ? 'Такой тип уже существует' : null"
              value="work"
            >
              Рабочий
            </option>
            <option
              :disabled="contactNumbers(currentContactIndex).home ? true : false"
              :title="contactNumbers(currentContactIndex).home ? 'Такой тип уже существует' : null"
              value="home"
            >
              Домашний
            </option>
            <option value="other">Другой</option>
          </select>
        </label>

        <label>
          <p class="modal__description">Введите номер:</p>
          <input
            class="modal__input"
            type='tel'
            placeholder="Введите номер"
            v-model.number="number"
            pattern="[0-9]{5,}"
            required
            title="Номер должен содержать не менее пяти цифр, без символов или пробелов"
            ref="numberInput"
          />
        </label>

        <div class="modal__btnGroup">
          <button
            class="modal__btn modal__btn--accept"
            type="submit"
          >
            {{phoneNumberModalData.operation === 'add' ? 'Добавить' : 'Изменить'}}
          </button>
          <button
            class="modal__btn modal__btn--decline"
            @click="setPhoneNumberAns({ans: false})"
            type="button"
          >
            Отменить
          </button>
        </div>

      </form>
  
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PhoneNumberModal',
  data: function () {
    return {
      numberType: '',
      number: '',
    }
  },
  computed: {
    ...mapGetters(['phoneNumberModalData', 'contactNumbers', 'currentContactIndex']),
  },
  beforeMount: function() {
    this.number = this.phoneNumberModalData.operation === 'add' ? '' : this.phoneNumberModalData.number
    this.numberType = this.phoneNumberModalData.operation === 'add' ? '' : this.phoneNumberModalData.numberType
  },
  methods: {
    ...mapActions(['setPhoneNumberAns']),
    formSubmitHandler: function () {
      this.phoneNumberModalData.operation === 'add' ? this.createNumber() : this.updateNumber()
    },
    createNumber: function () {
      const formData = {
        number: this.number,
        type: this.numberType,
      }
      this.setPhoneNumberAns({ans: true, formData: {...formData}})
    },
    updateNumber: function () {
      const formData = {
        number: this.number,
        type: this.numberType,
      }
      if (this.numberType === 'other') {
        formData.index = this.contactNumbers(this.currentContactIndex).others.findIndex(num => num === this.phoneNumberModalData.number)
      }
      this.setPhoneNumberAns({ans: true, formData: {...formData}})
    }
  },
  mounted() {
    this.$refs.numberInput.focus()
  }
}
</script>