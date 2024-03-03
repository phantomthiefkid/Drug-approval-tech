import { configureStore } from "@reduxjs/toolkit";
import UsersData from "./userlistManagement/userSlice";
import ProfileSlice from "./profile/ProfileSlice";
import DrugsData from "./drugManagement/drugSlice"
import ProductData from "./productManagement/ProductSlice";
export default configureStore({
    reducer: {
        userlist: UsersData,
        viewProfile: ProfileSlice,
        drugData: DrugsData,
        product: ProductData
    }
})