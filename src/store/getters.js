export default {
  contactsList(state) {return state.contactsList},
  currentContactIndex(state) {return state.currentContactIndex},
  contactNumbers: (state) => (index) => {return state.contactsList[index].numbers},
  contactData: (state) => (index) => {return state.contactsList[index].data},
  contactCustomProps: (state) => (index) => {return state.contactsList[index].custom},
  confirmModalData(state) {return state.confirmModal},
  phoneNumberModalData(state) {return state.phoneNumberModal},
  userDataModalData(state) {return state.userDataModal},
  customFieldsModalData(state) {return state.customFieldsModal},
  newContactModalData(state) {return state.newContactModal},
}
