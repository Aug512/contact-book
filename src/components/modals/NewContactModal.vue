<template>
  <div class="modal__overlay">
    <div class="modal__container">
      <h2 class="modal__title">Создать контакт:</h2>
      <hr>
      <form
        class="modal__form"
        @submit.prevent="createNewContact"
      >

        <label class="modal__label">
          <h3 class="modal__description">Введите имя:</h3>
          <input
            class="modal__input"
            type='text'
            placeholder="Введите имя"
            v-model="name"
            ref="newContactName"
            @input="resetValidityInfo('newContactName')"
          />
          <small class="modal__error" ref="newContactNameError"></small>
        </label>

        <label class="modal__label">
          <p class="modal__description">Выберите тип номера:</p>
          <select
            v-model="numberType"
            class="modal__input modal__select"
            ref="newContactNumberType"
            @change="resetValidityInfo('newContactNumberType')"
          >
            <option disabled value=''>Выберите один из вариантов</option>
            <option value='mobile'>Мобильный</option>
            <option value='work'>Рабочий</option>
            <option value='home'>Домашний</option>
            <option value='other'>Другой</option>
          </select>
          <small class="modal__error" ref="newContactNumberTypeError"></small>
        </label>

        <label class="modal__label">
          <p class="modal__description">Введите номер:</p>
          <input
            class="modal__input"
            type='tel'
            placeholder="Введите номер"
            v-model.number="numberValue"
            @input="resetValidityInfo('newContactNumberValue')"
            ref="newContactNumberValue"
          />
          <small class="modal__error" ref="newContactNumberValueError"></small>
        </label>

        <div class="modal__btnGroup">
          <button
            class="modal__btn modal__btn--accept"
            type="submit"
          >
            Добавить
          </button>
          <button
            class="modal__btn modal__btn--decline"
            @click="setNewContactAns({ans: false})"
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
import translit from '../../utils/translit'

export default {
  name: 'NewContactModal',
  data() {
    return {
      name: '',
      numberType: '',
      numberValue: '',
    }
  },
  computed: {
    ...mapGetters(['contactsList']),
  },
  methods: {
    ...mapActions(['setNewContactAns']),
    createNewContact: function () {

      const results = [this.checkNameValidity(), this.checkNumberTypeValidity(), this.checkNumberValueValidity()]

      if (results.every(res => res)) {
        const formData = {
          name: this.name,
          numberType: this.numberType,
          numberValue: this.numberValue,
        }

        this.setNewContactAns({ans: true, formData: {...formData}})
      }
      else return
    },
    resetValidityInfo: function(ref) {
      this.$refs[ref].classList.remove('valid', 'invalid')
      this.$refs[`${ref}Error`].innerText = ''
    },
    checkNameValidity: function() {

      if (!this.name.trim()) {
        this.$refs.newContactName.classList.add('invalid')
        this.$refs.newContactNameError.innerText = 'Поле не должно быть пустым'
        return false
      }

      const isNameExist = this.contactsList.some(contact => contact.name === this.name)
      const isLinkExist = this.contactsList.some(contact => contact.linkto === `/${translit(this.name)}`)
      if (isNameExist || isLinkExist) {
        this.$refs.newContactName.classList.add('invalid')
        this.$refs.newContactNameError.innerText = 'Такой контакт уже существует'
        return false
      }

      this.$refs.newContactName.classList.add('valid')
      return true
    },
    checkNumberTypeValidity: function() {
      if (!this.numberType) {
        this.$refs.newContactNumberType.classList.add('invalid')
        this.$refs.newContactNumberTypeError.innerText = 'Выберите одно из значений'
        return false
      }

      this.$refs.newContactNumberType.classList.add('valid')
      return true
    },
    checkNumberValueValidity: function() {
      if (!this.numberValue.toString().match('[0-9]{5,}')) {
        this.$refs.newContactNumberValue.classList.add('invalid')
        this.$refs.newContactNumberValueError.innerText = 'Номер должен собержать не менее 5 цифр'
        return false
      }

      this.$refs.newContactNumberType.classList.add('valid')
      return true
    }
  },
  mounted() {
    this.$refs.newContactName.focus()
  }
}
</script>