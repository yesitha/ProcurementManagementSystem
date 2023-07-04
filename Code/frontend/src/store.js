import { configureStore } from '@reduxjs/toolkit';
import userReducer, {setUser} from './userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Subscribe to store updates and store userType in session storage
store.subscribe(() => {
    const user = store.getState().user.user;
    sessionStorage.setItem('user', JSON.stringify(user));
});

// Retrieve userType from session storage and update the Redux store if available
const userFromStorage = sessionStorage.getItem('user');
if (userFromStorage) {
    store.dispatch(setUser(JSON.parse(userFromStorage)));
}


export default store;