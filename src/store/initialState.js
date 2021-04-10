export default {
  contactsList: [
    {
      name: 'Мама',
      linkto: `/mama`,
      numbers: {
        mobile: 89991234567,
        work: null,
        home: 89666666666,
        others: [89119876543]
      },
      data: {
        email: 'test@test.com',
        url: null,
        birthday: Date.now(),
        adress: 'somewhere...',
      },
      custom: [
        { name: 'имя', value: 'значение' },
        { name: 'Новое имя', value: 'Новое значение' },
      ],
      prevState: null,
    },
    {
      name: 'Папа',
      linkto: `/papa`,
      numbers: {
        mobile: 89991234567,
        work: null,
        home: null,
        others: [1234567, 89099090990]
      },
      data: {
        email: null,
        url: null,
        birthday: Date.now(),
        adress: 'somewhere...',
      },
      custom: [],
      prevState: null,
    }
  ],
  currentContactIndex: -1,
  confirmModal: {
    visibility: false,
    message: '',
    callback: null,
  },
  phoneNumberModal: {
    visibility: false,
    operation: '',
    message: '',
    numberType: null,
    number: null,
    callback: null,
  },
  userDataModal: {
    visibility: false,
    operation: '',
    message: '',
    dataType: null,
    dataValue: null,
    callback: null,
  },
  customFieldsModal: {
    visibility: false,
    operation: '',
    message: '',
    fieldName: null,
    fieldValue: null,
    callback: null,
  },
  newContactModal: {
    visibility: false,
  }
}
