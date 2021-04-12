<template>
  <div class="modal__overlay">
    <div class="modal__container">
      <h3 class="modal__title">{{ phoneNumberModalData.message }}</h3>
      <hr>
      <form
        class="modal__form"
        @submit.prevent="formSubmitHandler"
      >

        <label v-if="phoneNumberModalData.operation === 'add'" class="modal__label">
          <p class="modal__description">Выберите тип номера:</p>
          <select
            v-model="numberType"
            class="modal__input modal__select"
            ref="newNumberTypeSelect"
            @input="resetValidityInfo('newNumberTypeSelect')"
          >
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
          <small class="modal__error" ref="newNumberTypeSelectError"></small>
        </label>

        <label class="modal__label">
          <p class="modal__description">Введите номер:</p>
          <input
            class="modal__input"
            type='tel'
            placeholder="Введите номер"
            v-model.number="number"
            ref="newNumberInput"
            @input="resetValidityInfo('newNumberInput')"
          />
          <small class="modal__error" ref="newNumberInputError"></small>
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
      const validations = [this.checkTypeValidity(), this.checkNumberValidity()]

      if (validations.every(bool => bool)) {
        const formData = {
          number: this.number,
          type: this.numberType,
        }
        this.setPhoneNumberAns({ans: true, formData: {...formData}})
      }
    },
    updateNumber: function () {
      const validations = this.phoneNumberModalData.operation === 'add'
        ? [this.checkTypeValidity(), this.checkNumberValidity()]
        : [this.checkNumberValidity()]

      if (validations.every(bool => bool)) {
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
    resetValidityInfo: function(ref) {
      this.$refs[ref].classList.remove('valid', 'invalid')
      this.$refs[`${ref}Error`].innerText = ''
    },
    checkTypeValidity: function() {

      if (!this.numberType) {
        this.$refs.newNumberTypeSelect.classList.add('invalid')
        this.$refs.newNumberTypeSelectError.innerText = 'Выберите один из вариантов'
        return false
      }

      this.$refs.newNumberTypeSelect.classList.add('valid')
      return true
    },
    checkNumberValidity: function() {

      if (!this.number) {
        this.$refs.newNumberInput.classList.add('invalid')
        this.$refs.newNumberInputError.innerText = 'Поле не должно быть пустым'
        return false
      }
      const regExp = /[0-9]{5,}/
      if (!regExp.test(this.number)) {
        this.$refs.newNumberInput.classList.add('invalid')
        this.$refs.newNumberInputError.innerText = 'Номер должен содержать не менее 5-ти цифр'
        return false
      }
      const contactNumbersWithFields = Object.entries(this.contactNumbers(this.currentContactIndex))
      const existingNumbers = []
      contactNumbersWithFields.forEach(num => {
        if (num[1]) {
          if (num[0] === 'others') {
            num[1].forEach(number => existingNumbers.push(number))
          } else {
            existingNumbers.push(num[1])
          }
        }
      })
      if (existingNumbers.some(num => num === this.number)) {
        this.$refs.newNumberInput.classList.add('invalid')
        this.$refs.newNumberInputError.innerText = 'Такой номер уже существует'
        return false
      }

      this.$refs.newNumberInput.classList.add('valid')
      return true
    },
  },
  mounted() {
    this.phoneNumberModalData.operation === 'add'
      ? this.$refs.newNumberTypeSelect.focus()
      : this.$refs.newNumberInput.focus()
  }
}
</script>