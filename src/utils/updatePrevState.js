export const updAndGetObj = (state) => {
  const id = state.currentContactIndex
  const contact = state.contactsList[id]

  contact.prevState = {...state.contactsList[id], prevState: null}
  contact.prevState.numbers = {...state.contactsList[id].numbers}
  contact.prevState.numbers.others = [...state.contactsList[id].numbers.others]
  contact.prevState.data = {...state.contactsList[id].data}
  contact.prevState.custom = [...state.contactsList[id].custom.map( obj => ({...obj}) )]

  return [contact, id]
}
