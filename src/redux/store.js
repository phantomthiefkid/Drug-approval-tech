import { configureStore } from "@reduxjs/toolkit";
import UsersData from "./userlistManagement/userSlice";
import ProfileSlice from "./profile/ProfileSlice";
import UserData from "./userlistManagement/CreateUserSlice";
export default configureStore({
    reducer: {
        userlist: UsersData,
        viewProfile: ProfileSlice,
        user: UserData,
    }
})