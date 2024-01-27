import { configureStore } from "@reduxjs/toolkit";
import UsersData from "./userlistManagement/userSlice";
import ProfileSlice from "./profile/ProfileSlice";

export default configureStore({
    reducer: {
        userlist: UsersData,
        viewProfile: ProfileSlice,
        
    }
})