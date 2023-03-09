import {createSlice} from '@reduxjs/toolkit';
const IslikedSlice = createSlice({
    name  :"Isliked", 
    initialState:false, 
    reducers : {
        setisLiked(state, action){
            state = action.payload;
        }
    }
})
export const IslikedActions = IslikedSlice.actions;
export default IslikedSlice;