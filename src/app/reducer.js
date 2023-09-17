
export const actionTypes =  {
  createContact : "createContact",
  deleteContact : "deleteContact",
  updateContact : "updateContact",
  fetchContacts : "fetchContacts",
  fetchSingleContact : "fetchSingleContact",
  error : "error",
  clear : 'clear'
}

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.clear:
        return { ...state, message: action.message, isLoading:action.isLoading };
    case actionTypes.error:
        return { ...state, message: action.message, isLoading:action.isLoading };
    case actionTypes.fetchContacts:
      return { ...state, contacts: action.contacts, isLoading:action.isLoading };
    case actionTypes.fetchSingleContact:
        console.log(action.contact)
      return { ...state, contact: action.contact, isLoading:action.isLoading };
    case actionTypes.createContact:
      return { ...state, message: action.message, isLoading:action.isLoading };
    case actionTypes.deleteContact:
      return { ...state, message: action.message, isLoading:action.isLoading };
    case actionTypes.updateContact:
      return { ...state, message: action.message, isLoading:action.isLoading };
  }
};
