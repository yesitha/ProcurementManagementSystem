import { configureStore } from '@reduxjs/toolkit';
import userReducer, {setUserType} from './userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Subscribe to store updates and store userType in session storage
store.subscribe(() => {
    const userType = store.getState().user.userType;
    sessionStorage.setItem('userType', userType);
});

// Retrieve userType from session storage and update the Redux store if available
const userTypeFromStorage = sessionStorage.getItem('userType');
if (userTypeFromStorage) {
    store.dispatch(setUserType(userTypeFromStorage));
}


export default store;