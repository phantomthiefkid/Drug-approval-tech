import { configureStore } from "@reduxjs/toolkit";
// import UsersData from "./userlistManagement/userSlice";
import ProfileSlice from "./profile/ProfileSlice";
import UsersData from "./userlistManagement/CreateUserSlice";
export default configureStore({
    reducer: {
        // userlist: UsersData,
        viewProfile: ProfileSlice,
        user: UsersData,
    }
})