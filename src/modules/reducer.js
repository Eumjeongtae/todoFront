import { createSlice } from "@reduxjs/toolkit";

let items = createSlice({
  name: "data",

  initialState: {
    img: "",
    imgBack: "",
    name: "",
    myName: "",
    experience1: 0,
    experience2: 0,
    list: [],
  },

  reducers: {
    select(state, action) {
      state.img = action.payload.img;
      state.imgBack = action.payload.imgBack;
      state.name = action.payload.name;

      state.myName = "";
    },
    onChange(state, action) {
      state.myName = action.payload;
    },
    addList(state, action) {
      state.list.push(action.payload); // 새로운 항목을 list에 추가합니다.
    },
    setData(state, action) {
      state.img = action.payload.img;
      state.imgBack = action.payload.imgBack;
      state.name = action.payload.name;
      state.myName = action.payload.myName;
      state.experience1 = action.payload.experience1;
      state.experience2 = action.payload.experience2;
      state.list = action.payload.list;
    },
  },
});

export const { select, onChange, addList, setData } = items.actions;

export default items.reducer;

//const items =  {img : '',imgBack : '',name :'',myName : ''}
/*
export default function reducer(state = items, action) {
  if (action.type === 'select') {
    return {img : action.img,imgBack : action.imgBack,name :action.name,myName :''}
  }
  else if (action.type === 'onChange') {
    return {...state,myName:action.myName}
  } 

  return state
}
 */
