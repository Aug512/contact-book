<template>
  <div class="modal__overlay">
    <div class="modal__container">
      <h3 class="modal__title">{{ userDataModalData.message }}</h3>
      <hr>
      <form
        class="modal__form"
        @submit.prevent="formSubmitHandler"
      >

        <label v-if="userDataModalData.operation === 'add'" class="modal__label">
          <p class="modal__description">Выберите поле:</p>
          <select
            v-model="fieldType"
            class="modal__input modal__select"
            ref="newDataFieldType"
            @change="resetValidityInfo('newDataFieldType')"
          >
            <option disabled value=''>Выберите один из вариантов</option>
            <option
              :disabled="contactData(currentContactIndex).email ? true : false"
              :title="contactData(currentContactIndex).email ? 'Это поле уже существует' : null"
              value="email"
            >
              E-mail
            </option>
            <option
              :disabled="contactData(currentContactIndex).url ? true : false"
              :title="contactData(currentContactIndex).url ? 'Это поле уже существует' : null"
              value="url"
            >
              Веб-сайт
            </option>
            <option
              :disabled="contactData(currentContactIndex).birthday ? true : false"
              :title="contactData(currentContactIndex).birthday ? 'Это поле уже существует' : null"
              value="birthday"
            >
              День рождения
            </option>
            <option
              :disabled="contactData(currentContactIndex).adress ? true : false"
              :title="contactData(currentContactIndex).adress ? 'Это поле уже существует' : null"
              value="adress"
            >
              Адрес
            </option>
          </select>
          <small class="modal__error" ref="newDataFieldTypeError"></small>
        </label>

        <label class="modal__label" ref="dataValueInput">
          <p v-if="fieldType !== ''" class="modal__description">
            Укажите значение:
          </p>
          <input v-if="fieldType === 'email'"
            class="modal__input"
            type='text'
            placeholder="Введите e-mail"
            v-model="fieldValue"
            ref="newEmailValue"
            @input="resetValidityInfo('newEmailValue')"
          />
          <input v-if="fieldType === 'url'"
            class="modal__input"
            type='text'
            placeholder="https://example.com"
            v-model="fieldValue"
            ref="newUrlValue"
            @input="resetValidityInfo('newUrlValue')"
          />
          <input v-if="fieldType === 'birthday'"
            class="modal__input"
            type='date'
            placeholder="Укажите дату рождения"
            v-model="fieldValue"
            ref="newBirthdateValue"
            @input="resetValidityInfo('newBirthdateValue')"
          />
          <textarea v-if="fieldType === 'adress'"
            class="modal__input"
            size="3"
            v-model="fieldValue"
            ref="newAdressValue"
            @input="resetValidityInfo('newAdressValue')"
          />
          <small class="modal__error" ref="newDataFieldValueError"></small>
        </label>

        <div class="modal__btnGroup">
          <button
            class="modal__btn modal__btn--accept"
            type="submit"
          >
            {{userDataModalData.operation === 'add' ? 'Добавить' : 'Изменить'}}
          </button>
          <button
            class="modal__btn modal__btn--decline"
            @click="setUserDataAns({ans: false})"
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
  name: 'UserDataModal',
  data: function() {
    return {
      fieldType: '',
      fieldValue: '',
    }
  },
  computed: {
    ...mapGetters(['userDataModalData', 'contactData', 'currentContactIndex']),
  },
  beforeMount() {
    this.fieldType = this.userDataModalData.operation === 'add' ? '' : this.userDataModalData.dataType
    this.fieldValue = this.userDataModalData.operation === 'add' ? '' : this.userDataModalData.dataValue
    if (this.userDataModalData.operation === 'edit' && this.userDataModalData.dataType === 'birthday') {
      this.fieldValue = new Date(this.userDataModalData.dataValue).toLocaleDateString().split('.').reverse().join('-')
    }
  },
  methods: {
    ...mapActions(['setUserDataAns']),
    formSubmitHandler: function () {
      this.userDataModalData.operation === 'add' ? this.createDataField() : this.updateDataField()
    },
    createDataField: function () {
      const formData = {
        value: this.fieldValue,
        type: this.fieldType,
      }

      if (this.checkDataTypeValidity() && this.checkDataValueValidity()) {
        this.setUserDataAns({ans: true, formData: {...formData}})
      }
    },
    updateDataField: function () {
      const results = [this.checkDataTypeValidity(), this.checkDataValueValidity()]

      if (results.every(res => res)) {
        const formData = {
          value: this.fieldValue,
          type: this.fieldType,
        }

        this.setUserDataAns({ans: true, formData: {...formData}})
      }
      else return
    },
    resetValidityInfo: function(ref) {
      this.$refs[ref].classList.remove('valid', 'invalid')
      if (this.$refs.newDataFieldTypeError) this.$refs.newDataFieldTypeError.innerText = ''
      if (this.$refs.newDataFieldValueError) this.$refs.newDataFieldValueError.innerText = ''
    },
    checkDataTypeValidity: function() {
      if (!this.fieldType.trim()) {
        this.$refs.newDataFieldType.classList.add('invalid')
        this.$refs.newDataFieldTypeError.innerText = 'Выберите один из вариантов'
        return false
      }

      return true
    },
    checkDataValueValidity: function() {

      if (this.fieldType === 'email') {   //email validation
        const emailRegExp = /\S+@\S+\.\S+/
        const repitableAt = /^[^\s@]+@[^\s@]+$/
        if (!this.fieldValue.trim()) {
          this.$refs.newEmailValue.classList.add('invalid')
          this.$refs.newDataFieldValueError.innerText = 'Укажите E-mail'
          return false
        }
        if (!emailRegExp.test(this.fieldValue) || !repitableAt.test(this.fieldValue)) {
          this.$refs.newEmailValue.classList.add('invalid')
          this.$refs.newDataFieldValueError.innerText = 'Укажите корректный E-mail'
          return false
        }
        this.$refs.newEmailValue.classList.add('valid')
        return true
      }
      if (this.fieldType === 'url') {   //url validation
        const urlRegExp = /https?:\/\/[a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}/

        if (!this.fieldValue.trim()) {
          this.$refs.newUrlValue.classList.add('invalid')
          this.$refs.newDataFieldValueError.innerText = 'Укажите адрес веб-сайта'
          return false
        }
        if (!urlRegExp.test(this.fieldValue)) {
          this.$refs.newUrlValue.classList.add('invalid')
          this.$refs.newDataFieldValueError.innerText = 'Укажите корректный адрес веб-сайта'
          return false
        }
        this.$refs.newUrlValue.classList.add('valid')
        return true
      }
      if (this.fieldType === 'birthday') {    //birthdate validation
        if (!this.fieldValue.trim()) {
          this.$refs.newBirthdateValue.classList.add('invalid')
          this.$refs.newDataFieldValueError.innerText = 'Укажите дату рождения'
          return false
        }
        if (new Date(this.fieldValue) > new Date()) {
          this.$refs.newBirthdateValue.classList.add('invalid')
          this.$refs.newDataFieldValueError.innerText = 'Дата не можеть быть больше текущей'
          return false
        }
        if (new Date(this.fieldValue) < new Date(-2208997817)) {
          this.$refs.newBirthdateValue.classList.add('invalid')
          this.$refs.newDataFieldValueError.innerText = 'Дата не может быть ниже 1900 года'
          return false
        }
        this.$refs.newBirthdateValue.classList.add('valid')
        return true
      }
      if (this.fieldType === 'adress') {    //adress existing validation
        if (!this.fieldValue.trim()) {
          this.$refs.newAdressValue.classList.add('invalid')
          this.$refs.newDataFieldValueError.innerText = 'Укажите адрес'
          return false
        }
        this.$refs.newAdressValue.classList.add('valid')
        return true
      }
    },
  },
  mounted() {
    this.userDataModalData.operation === 'edit'
      ? this.$refs.dataValueInput.focus()
      : this.$refs.newDataFieldType.focus()
  }
}
</script>
