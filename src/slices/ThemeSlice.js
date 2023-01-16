import {createSlice} from '@reduxjs/toolkit'

//creating theme Slice
export const themeSlice = createSlice({
    name:'theme',
    initialState:false,
    reducers:{
        changeTheme:(state,action)=>{
            //changing the theme
            console.log(action.payload)
            return action.payload
        }
    }
})

//create action creator functions
export const {changeTheme} = themeSlice.actions

//exporting reducer
export default themeSlice.reducer;