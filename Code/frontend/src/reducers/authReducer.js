const initialState = {
  userName: "",
  role: "",
};

const UPDATE_USER = "UPDATE_USER";

function authReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER: {
        return {...state, userName: action.payload.userName, role: action.payload.role};
    }
    default:
      return state;
  }
}

export { UPDATE_USER };
export default authReducer;
