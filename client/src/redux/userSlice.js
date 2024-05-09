import { createSlice } from "@reduxjs/toolkit";
import { user } from "../assets/data.js";

// const initialState ={
//     user: JSON.parse(window?.localStorage.getItem("user")) ?? user,
//     edit: false,
// };

// Function to initialize user state based on environment
const initializeUserState = () => {
    if (typeof window !== "undefined") {
        // If running in the browser, access localStorage
        return JSON.parse(window.localStorage.getItem("user")) || {};
    } else {
        // If running in Node.js or another environment, use default user
        return user;
    }
};

const initialState = {
    user: initializeUserState(), // Initialize user state based on environment
    edit: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action){
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout(state){
            state.user = null;
            localStorage?.removeItem("user");
        },
        updateProfile(state, action){
            state.edit = action.payload;
        },
    },
});
export default userSlice.reducer;

export function UserLogin(user){
    return(dispatch, getState) => {
        dispatch(userSlice.actions.login(user));
    };
}

export function Logout(){
    return(dispatch, getState) => {
        dispatch(userSlice.actions.logout());
    };
}

export function UpdateProfile(val){
    return(dispatch, getState) => {
        dispatch(userSlice.actions.updateProfile(val));
    };
}