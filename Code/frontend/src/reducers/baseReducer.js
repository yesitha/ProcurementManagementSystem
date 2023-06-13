const initialState = {
    isLoading: false,
};

const SET_LOADER = "SET_LOADER";

function baseReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADER: {
        return {...state, isLoading: action.payload};
    }
    default:
      return state;
  }
}

export { SET_LOADER };
export default baseReducer;
