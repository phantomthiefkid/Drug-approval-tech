import { configureStore } from "@reduxjs/toolkit";
import UsersData from "./userlistManagement/userSlice";

export default configureStore({
    reducer: {
        userlist: UsersData,
        
    }
})