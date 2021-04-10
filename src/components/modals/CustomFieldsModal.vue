<template>
  <div class="modal__overlay">
    <div class="modal__container">
      <h3 class="modal__title">{{ customFieldsModalData.message }}</h3>
      <hr>
      <form
        class="modal__form"
        @submit.prevent="formSubmitHandler"
      >

        <label v-if="customFieldsModalData.operation === 'add'" class="modal__label">
          <p class="modal__description">Введите название:</p>
          <input
            class="modal__input"
            type='text'
            placeholder="Название поля"
            v-model="fieldName"
            ref="nameInput"
            @input="resetValidityInfo('nameInput')"
          />
          <small class="modal__error" ref="nameInputError"></small>
        </label>

        <label class="modal__label">
          <p v-if="customFieldsModalData.operation === 'add'" class="modal__description">Укажите значение:</p>
          <h3 v-else class="modal__description">{{ fieldName }}:</h3>
          <input
            class="modal__input"
            type='text'
            placeholder="Укажите значение"
            v-model="fieldValue"
            ref="valueInput"
            @input="resetValidityInfo('valueInput')"
          />
          <small class="modal__error" ref="valueInputError"></small>
        </label>

        <div class="modal__btnGroup">
          <button
            class="modal__btn modal__btn--accept"
            type="submit"
          >
            {{customFieldsModalData.operation === 'add' ? 'Добавить' : 'Изменить'}}
          </button>
          <button
            class="modal__btn modal__btn--decline"
            @click="setCustomFieldsAns({ans: false})"
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
  name: 'CustomFieldsModal',
  data: function () {
    return {
      fieldName: '',
      fieldValue: '',
    }
  },
  computed: {
    ...mapGetters(['customFieldsModalData', 'contactCustomProps', 'currentContactIndex']),
  },
  beforeMount: function() {
    this.fieldName = this.customFieldsModalData.operation === 'add' ? '' : this.customFieldsModalData.fieldName
    this.fieldValue = this.customFieldsModalData.operation === 'add' ? '' : this.customFieldsModalData.fieldValue
  },
  methods: {
    ...mapActions(['setCustomFieldsAns']),
    formSubmitHandler: function () {
      const validations = this.customFieldsModalData.operation === 'add'
        ? [this.validateName(), this.validateValue()]
        : [this.validateValue()]
    
      if (validations.every(bool => bool)) {
        this.customFieldsModalData.operation === 'add' ? this.createField() : this.updateField()
      }
    },
    resetValidityInfo: function(ref) {
      this.$refs[ref].classList.remove('valid', 'invalid')
      this.$refs[`${ref}Error`].innerText = ''
    },
    validateName: function() {
      if (!this.fieldName.trim()) {
        this.$refs.nameInput.classList.add('invalid')
        this.$refs.nameInputError.innerText = 'Укажите название'
        return false
      }
      const isFieldExist = this.contactCustomProps(this.currentContactIndex).some(obj => obj.name === this.fieldName)
      
      if (isFieldExist) {
        this.$refs.nameInput.classList.add('invalid')
        this.$refs.nameInputError.innerText = 'Такое поле уже существует'
        return false
      }
      this.$refs.nameInput.classList.add('valid')
      return true
    },
    validateValue: function() {
      if (!this.fieldValue.trim()) {
        this.$refs.valueInput.classList.add('invalid')
        this.$refs.valueInputError.innerText = 'Укажите значение'
        return false
      }
      this.$refs.valueInput.classList.add('valid')
      return true
    },
    createField: function () {
      const formData = {
        name: this.fieldName,
        value: this.fieldValue,
      }
      this.setCustomFieldsAns({ans: true, formData: {...formData}})
    },
    updateField: function () {
      const formData = {
        name: this.fieldName,
        value: this.fieldValue,
      }
      formData.index = this.contactCustomProps(this.currentContactIndex).findIndex(obj => obj.name === this.customFieldsModalData.fieldName)

      this.setCustomFieldsAns({ans: true, formData: {...formData}})
    }
  },
  mounted() {
    this.customFieldsModalData.operation === 'add'
      ? this.$refs.nameInput.focus()
      : this.$refs.valueInput.focus()
  }
}
</script>