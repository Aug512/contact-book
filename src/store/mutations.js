import translit from '../utils/translit'
import { updAndGetObj } from '../utils/updatePrevState'

class Contact {
  constructor(name) {
    this.name = name
    this.numbers = {
      mobile: null,
      work: null,
      home: null,
      others: [],
    }
    this.data = {
      email: null,
      url: null,
      birthday: null,
      adress: null,
    }
    this.custom = []
    this.prevState = null
    this.linkto = `/${translit(this.name)}`
  }
}

export default {
  addNewContact(state, {ans, formData}) {

    if (ans === true) {
      const newContact = new Contact(formData.name)

      if (formData.numberType === 'other') {
        newContact.numbers.others[0] = formData.numberValue
      } else {
        newContact.numbers[formData.numberType] = formData.numberValue
      }

      state.contactsList = [...state.contactsList, {...newContact}]
    }

    state.newContactModal = {
      visibility: false,
    }
  },
  setContactIndex(state, contact) {
    if (contact === -1) {
      state.currentContactIndex = -1
    } else {
      state.currentContactIndex = state.contactsList.findIndex(cont => cont.name === contact.name)
    }
  },
  removeContactFromList(state, contact) {
    state.contactsList = [...state.contactsList.filter(cont => cont.name !== contact.name)]
  },

  updateNumber(state, formData) {
    const [contact] = updAndGetObj(state)

    if (formData.type === 'other') {
      const newOthers = [...contact.numbers.others]
      newOthers[formData.index] = formData.number //ограничение реактивности на непосредственную установку через arr[x] = [...y]

      contact.numbers.others = [...newOthers]
    } else {
      contact.numbers[formData.type] = formData.number
    }
  },
  removeSelectedNumber(state, selectedNumber) {
    const [contact] = updAndGetObj(state)
    if (typeof selectedNumber.title === 'string') {   //получаем заготовленное поле
      contact.numbers = {...contact.numbers, [selectedNumber.title]: null}
    } else if (typeof selectedNumber.title === 'number') {    // получаем индекс номера типа "другой"
      contact.numbers.others = [...contact.numbers.others].filter(number => number != selectedNumber.number)
    }
  },
  addNewNumber(state, newNumber) {
    const [contact] = updAndGetObj(state)

    if (newNumber.type === 'other') {
      contact.numbers.others = [...contact.numbers.others, newNumber.number]
    } else {
      const newNumbers = {
        ...contact.numbers,
      }
      newNumbers[newNumber.type] = newNumber.number,
      contact.numbers = {...newNumbers}
    }
  },

  updateDataField(state, editedDataField) {
    const [contact] = updAndGetObj(state)

    contact.data[editedDataField.type] = editedDataField.value
  },
  removeSelectedDataField(state, selectedDataField) {
    const [contact] = updAndGetObj(state)
    contact.data = {...contact.data, [selectedDataField.title]: null}
  },
  addNewData(state, newData) {
    const [contact] = updAndGetObj(state)

    const newDataFields = {
      ...contact.data,
      [newData.type]: newData.value,
    }
    contact.data = {...newDataFields}
  },

  updateCustomProp(state, editedCustomProp) {
    const [contact] = updAndGetObj(state)

    const newCustomProps = [...contact.custom]
    newCustomProps[editedCustomProp.index] = {name: editedCustomProp.name, value: editedCustomProp.value}

    contact.custom = [...newCustomProps]
  },
  removeSelectedCustomProp(state, selectedCustomProp) {
    const [contact] = updAndGetObj(state)
    contact.custom = [...contact.custom.filter(prop => prop.name !== selectedCustomProp)]
  },
  addNewCustomProp(state, newProp) {
    const [contact] = updAndGetObj(state)
    contact.custom.push({name: newProp.name, value: newProp.value})
  },
  
  revertLastChange(state) {
    const id = state.currentContactIndex
    const contact = state.contactsList[id]
    const revertedContact = {...contact.prevState}

    revertedContact.prevState = null
    revertedContact.numbers = {...contact.prevState.numbers}
    revertedContact.numbers.others = [...contact.prevState.numbers.others]
    revertedContact.data = {...contact.prevState.data}
    revertedContact.custom = [...contact.prevState.custom.map( obj => ({...obj}) )]

    state.contactsList = [
      ...state.contactsList.map( (contact, index) => {
        if (index === state.currentContactIndex) return revertedContact
        return contact
      })
    ]
  },
    // MODALS
  confirmModalShow(state, payload) {
    state.confirmModal = {
      visibility: true,
      message: payload.msg,
      callback: payload.callback
    }
  },
  confirmModalSetAnswer(state, ans) {
    if (ans === true) {
      state.confirmModal.callback()
    }
    state.confirmModal = {
      visibility: false,
      message: '',
      callback: null,
    }
  },

  phoneNumberModalShow(state, payload) {
    state.phoneNumberModal = {
      visibility: true,
      operation: payload.operation,
      message: payload.message,
      number: payload.number,
      numberType: payload.numberType,
      callback: payload.callback,
    }
  },
  phoneNumberSetAnswer(state, payload) {
    if (payload.ans === true) {
      state.phoneNumberModal.callback(payload.formData)
    }
    state.phoneNumberModal = {
      visibility: false,
      operation: '',
      message: '',
      number: null,
      numberType: null,
      callback: null,
    }
  },

  userDataModalShow(state, payload) {
    state.userDataModal = {
      visibility: true,
      operation: payload.operation,
      message: payload.message,
      dataType: payload.dataType,
      dataValue: payload.dataValue,
      callback: payload.callback,
    }
  },
  userDataSetAnswer(state, payload) {
    if (payload.ans === true) {
      state.userDataModal.callback(payload.formData)
    }
    state.userDataModal = {
      visibility: false,
      operation: '',
      message: '',
      dataType: null,
      dataValue: null,
      callback: null,
    }
  },

  customFieldsModalShow(state, payload) {
    state.customFieldsModal = {
      visibility: true,
      operation: payload.operation,
      message: payload.message,
      fieldName: payload.fieldName,
      fieldValue: payload.fieldValue,
      callback: payload.callback,
    }
  },
  customFieldsSetAnswer(state, payload) {
    if (payload.ans === true) {
      state.customFieldsModal.callback(payload.formData)
    }
    state.customFieldsModal = {
      visibility: false,
      operation: '',
      message: '',
      fieldName: null,
      fieldValue: null,
      callback: null,
    }
  },
  newContactModalShow(state) {
    state.newContactModal = {
      visibility: true,
    }
  },
}
