import { ADD_INITIAL_DATA, ADD_ITEM, ADD_ACCOUNT_DATA, UPDATE_ACCOUNT_DATA, UPDATE_BANK_DATA } from "./actions";

const initialState = {
  tabledata: [],
  accountdata: [],
  bank: []
};

export const tabledataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      // Find the index of the item with the same ID in the current state
      const existingIndex = state.tabledata.findIndex(
        (item) => item.id === action.payload.id
      );

      // If the item exists, update it; otherwise, add it to the state
      if (existingIndex !== -1) {
        const updatedTabledata = [...state.tabledata];
        updatedTabledata[existingIndex] = action.payload;
        return {
          ...state,
          tabledata: updatedTabledata,
        };
      } else {
        return {
          ...state,
          tabledata: [...state.tabledata, action.payload],
        };
      }
    case ADD_INITIAL_DATA:
      console.log("Initial tabledata:", action.payload);
      return {
        ...state,
        tabledata: action.payload,
      };
    case ADD_ACCOUNT_DATA:
      return {
        ...state,
        tabledata: action.payload,
      };
    default:
      return state;
  }
};

//////////////////////////////////////////////////////accountdataReducer///////////////////////////////////////////////////////////

export const accountdataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT_DATA:
      console.log("Initial accountdataReducer:", action.payload);
      return {
        ...state,
        accountdata: action.payload,
      };
      case UPDATE_ACCOUNT_DATA:
        const { bank, account_id, bank_id, propertyToDelete, ...otherAccountData } = action.payload; // Destructure the payload
      
        // Optionally, you can delete the propertyToDelete here if needed
        if (propertyToDelete) {
          delete otherAccountData[propertyToDelete];
        }
        
        // Spread otherAccountData without the propertyToDelete
        const updatedAccountData = { ...otherAccountData };
        
        // Create a shallow copy of the bank array
        const updatedBank = bank ? [...bank] : [];
      
        // Delete account_id and bank_id properties from each object in the updatedBank array
        updatedBank.forEach(item => {
          delete item.account_id;
          delete item.bank_id;
        });
      
        console.log('updatedAccountData', updatedAccountData);
      
        return {
          ...state,
          accountdata: {
            ...state.accountdata,
            ...updatedAccountData, // Update other properties of accountdata
            bank: updatedBank, // Update the bank array
          }
        };
      
      
        
      
      
    case UPDATE_BANK_DATA:
      console.log("updatebankdata:", action.payload.bank);

      // Assuming action.payload contains the updated bank array
      const updatedBankArraynew = action.payload.bank;

      console.log(updatedBankArraynew);
      // Assuming your state has the structure { accountdata: { bank: [] } }
      // First, set the bank array inside accountdata to an empty array
      let updatedAccountDatanew = {
        ...state.accountdata,
        bank: [],
      };
      // delete updatedAccountDatanew.account_id
      console.log(updatedAccountDatanew);

      // If the updatedBankArray is not empty, add the new bank records
      if (updatedBankArraynew && updatedBankArraynew.length > 0) {
        updatedAccountDatanew = {
          ...updatedAccountDatanew,
          bank: updatedBankArraynew,
        };

      }

      // Return the updated state with the modified accountdata
      return {
        ...state,
        accountdata: updatedAccountDatanew,
      };
    default:
      return state;
  }
};


