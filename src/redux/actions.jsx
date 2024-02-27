
export const ADD_INITIAL_DATA = 'ADD_INITIAL_DATA';

export const addInitialData = (data) => ({
  type: ADD_INITIAL_DATA,
  payload: data,
});


export const ADD_ITEM = 'ADD_ITEM';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const ADD_ACCOUNT_DATA = 'ADD_ACCOUNT_DATA';

export const addAccountData = (accountdata) => ({
  type: ADD_ACCOUNT_DATA,
  payload: accountdata,
});



export const UPDATE_ACCOUNT_DATA = 'UPDATE_ACCOUNT_DATA';


export const updateAccountsData = (accountData) => ({
  type: UPDATE_ACCOUNT_DATA,
  payload: accountData,
});

export const UPDATE_BANK_DATA = 'UPDATE_BANK_DATA';

export const updateBanksData = (updatedBankDetails) => ({
  type: UPDATE_BANK_DATA,
  payload: { bank: updatedBankDetails },
});
