import { configureStore } from "@reduxjs/toolkit";
import UsersData from "./userlistManagement/userSlice";
import ProfileSlice from "./profile/ProfileSlice";
import DrugsData from "./drugManagement/drugSlice"
import ProductsData from "./approvalProduct/productSlice";
import ProductData from "./productManagement/ProductSlice";
import ProductDataGuest from "./productManagement/productSliceForGuest/ProductForGuestSlice";
import ProfileProduct from "./profileProduct/profileProductSlice";
export default configureStore({
    reducer: {
        userlist: UsersData,
        viewProfile: ProfileSlice,
        drugData: DrugsData,
        productData: ProductsData,
        product: ProductData,
        guest: ProductDataGuest,
        profileProduct: ProfileProduct
    }
})