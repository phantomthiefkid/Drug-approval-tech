import { configureStore } from "@reduxjs/toolkit";
import UsersData from "./userlistManagement/userSlice";
import loginAPI from "./auth/loginSlice";
export default configureStore({
    reducer: {
        userlist: UsersData,
        login: loginAPI
    }
})