import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
  
export const userLogin = createAsyncThunk('user-login',async(userData,thunkApi)=>{
    let response =await axios.post('/user-auth/login',userData);
    let data= response.data;
    if(data.message==='Login Successful!!'){
        //storing the token in local storage
        localStorage.setItem("token",data.token)
        return data.userInfo;
    }
    if(data.message==="Invalid UserName!!" || data.message==="Incorrect Password!!"){
        //when login fails thunkApi is used to handle errors
        return thunkApi.rejectWithValue(data.message)
    }
})


export const userSlice = createSlice({
    name:'user',
    initialState:{
        userObj:{},
        isError:false,
        isSuccess:false,
        isLoading:false,
        errMsg:''
    },
    reducers:{
        clearLoginStatus:(state)=>{
            state.isSuccess=false;
            state.errMsg='';
            state.isLoading=false;
            state.isError=false;
            state.userObj=null;
        }
    },
    extraReducers:{
        //track life cycle of promise returned by createAsyncThunk function
        [userLogin.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [userLogin.fulfilled]:(state,action)=>{
            state.userObj=action.payload;//payload is property of action object (predefined)
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.errMsg="";
        },
        [userLogin.rejected]:(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.errMsg=action.payload;//gets from rejected value of thunkApi
        }
    }
})

//creating action creator functions
export const {clearLoginStatus} = userSlice.actions

//exporting reducer functions

export default userSlice.reducer