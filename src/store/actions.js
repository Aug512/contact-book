export default {
  createContact({ commit }) {
    commit('newContactModalShow')
  },
  selectContact({ commit }, contact) {
    commit('setContactIndex', contact)
  },
  removeContact({ commit }, contact) {
    commit('confirmModalShow', {msg: `Удалить контакт "${contact.name}"?`, callback: function() {commit('removeContactFromList', contact)}})
  },
  editNumber({ commit, state }, number) {
    const numbersObj = state.contactsList[state.currentContactIndex].numbers
    const numObj = Object.entries(numbersObj).find(num => num[1] === number)

    if (typeof numObj === 'object') {        
      commit('phoneNumberModalShow', {
        operation: 'edit',
        message: `Изменить номер`,
        number: numObj[1],
        numberType: numObj[0],
        callback: (formData) => commit('updateNumber', {...formData})
      })
    } else if (!numObj) {
      commit('phoneNumberModalShow', {
        operation: 'edit',
        message: `Изменить номер`,
        number: number,
        numberType: 'other',
        callback: (formData) => commit('updateNumber', {...formData})
      })
    } else return
  },
  removeNumber({commit, state }, number) {
    const numbersObj = state.contactsList[state.currentContactIndex].numbers
    const numObj = Object.entries(numbersObj).find(num => num[1] === number)

    if (typeof numObj === 'object') {  
      commit('confirmModalShow', {
        msg: `Удалить номер "${number}"?`,
        callback: function() {commit('removeSelectedNumber', {title: numObj[0], number})}
      })
    } else if (!numObj) {
      const index = numbersObj.others.findIndex(num => num === number)
      commit('confirmModalShow', {
        msg: `Удалить номер "${number}"?`,
        callback: () => commit('removeSelectedNumber', {title: index, number})
      })
    } else return
  },
  addNumber({ commit }) {
    commit('phoneNumberModalShow', {
      operation: 'add',
      message: 'Добавить номер',
      callback: function(formData) {commit('addNewNumber', {...formData})}
    })
  },

  editDataField({ commit, state }, dataFieldValue) {
    const fieldsObj = state.contactsList[state.currentContactIndex].data
    const dataObj = Object.entries(fieldsObj).find(prop => prop[1] === dataFieldValue)

    commit('userDataModalShow', {
      operation: 'edit',
      message: 'Изменить поле',
      dataType: dataObj[0],
      dataValue: dataObj[1],
      callback: function(formData) {commit('updateDataField', {...formData})},
    })
  },
  removeDataField({ commit, state }, dataFieldValue) {
    const fieldsObj = state.contactsList[state.currentContactIndex].data
    const dataObj = Object.entries(fieldsObj).find(val => val[1] === dataFieldValue) 
    commit('confirmModalShow', {
      msg: `Удалить выбранное поле?`,
      callback: function() {commit('removeSelectedDataField', {title: dataObj[0]})}
    })
  },
  addDataField({ commit }) {
    commit('userDataModalShow', {
      operation: 'add',
      message: 'Добавить поле',
      callback: function(formData) {commit('addNewData', {...formData})},
    })
  },

  editCustomProp({ commit }, customPropValue) {
    commit('customFieldsModalShow', {
      operation: 'edit',
      message: 'Редактировать поле',
      fieldName: customPropValue.name,
      fieldValue: customPropValue.value,
      callback: function(formData) {commit('updateCustomProp', {...formData})},
    })
  },
  removeCustomProp({ commit }, title) {
    commit('confirmModalShow', {
      msg: `Удалить поле "${title}"?`,
      callback: function() {commit('removeSelectedCustomProp', title)},
    })
  },
  addCustomProp({ commit }) {
    commit('customFieldsModalShow', {
      operation: 'add',
      message: 'Добавить поле',
      callback: function(formData) {commit('addNewCustomProp', {...formData})},
    })
  },

  revertLastChange({ commit }) {
    commit('confirmModalShow', {
      msg: `Вернуть последнее изменение?`,
      callback: function() {commit('revertLastChange')}
    })
  },

  setConfirmModalAns({ commit }, ans) {
    commit('confirmModalSetAnswer', ans)
  },

  setPhoneNumberAns({ commit }, payload) {
    commit('phoneNumberSetAnswer', {ans: payload.ans, formData: payload.formData})
  },

  setUserDataAns({ commit }, payload) {
    commit('userDataSetAnswer', {ans: payload.ans, formData: payload.formData})
  },
 
  setCustomFieldsAns({ commit }, payload) {
    commit('customFieldsSetAnswer', {ans: payload.ans, formData: payload.formData})
  },
  
  setNewContactAns({ commit }, payload) {
    commit('addNewContact', {ans: payload.ans, formData: payload.formData})
  },
}
