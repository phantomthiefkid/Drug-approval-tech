import { configureStore } from "@reduxjs/toolkit";
import UsersData from "./userlistManagement/userSlice";
import ProfileSlice from "./profile/ProfileSlice";
import DrugsData from "./drugManagement/drugSlice";

export default configureStore({
    reducer: {
        userlist: UsersData,
        viewProfile: ProfileSlice,
        drugData: DrugsData
    }
})