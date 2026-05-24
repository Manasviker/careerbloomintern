import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "../Feature/Userslice";

// import (configureStore)

export const store=configureStore({
    reducer:{
        user:userReducer
    }
})