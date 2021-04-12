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
        birthday: new Date(0),
        adress: 'г. Москва, ул. Пушкина 1',
      },
      custom: [
        { name: 'Custom1', value: 'Custom value 1' },
        { name: 'Custom2', value: 'Custom value 2' },
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
        birthday: new Date(5*1000*3600*24),
        adress: null,
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
