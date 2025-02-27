import { configureStore } from "@reduxjs/toolkit"
import userSlice from '../store/slices/userSlice'

const store = configureStore({
    reducer: {
        userSlice: userSlice
    }
})

export default store;