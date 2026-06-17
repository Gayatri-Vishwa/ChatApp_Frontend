
import {createSlice} from '@reduxjs/toolkit'

const initialState={
    isNewGroup:false,
    isNotification:false,
    isSearch:false,
    isFileMenu:false,
    isMobile:false,
    isAddMember:false,
 isDeleteMenu:false,
 uploadingLoader:false,
 selectedDeleteChat:{
    chatId:"",
    groupChat:false
 },
    isMobileMenu:false,
}

const miscSlice=createSlice({
name:"misc",
initialState,

reducers:{
setIsNewGroup:(state,action)=>{
state.isNewGroup=action.payload
},
setIsNotification:(state,action)=>{
state.isNotification=action.payload
},
setIsSearch:(state,action)=>{
state.isSearch=action.payload
},
setIsFileMenu:(state,action)=>{
state.isFileMenu=action.payload
},
setIsAddMember:(state,action)=>{
state.isAddMember=action.payload
},
setIsDeleteMenu:(state,action)=>{
state.isDeleteMenu=action.payload
},
setUploadingLoader:(state,action)=>{
state.uploadingLoader=action.payload
},
setSelectedDeleteChat:(state,action)=>{
state.selectedDeleteChat=action.payload
},
setIsMobileMenu:(state,action)=>{
state.isMobileMenu=action.payload
}
}})

export default miscSlice
export const {setIsNewGroup,setIsNotification,setIsSearch,setIsFileMenu,setIsAddMember,setIsDeleteMenu,setUploadingLoader,setSelectedDeleteChat,setIsMobileMenu} = miscSlice.actions
