import {create} from 'zustand';

const useStateStore = create((set) => ({
  img: '',
  imgBack: '',
  name: '',
  myName: '',
  experience1: 0,
  experience2: 0,
  list: [],
  // Replaces the 'select' reducer
  select: (img, imgBack, name) => set(state => ({...state, img, imgBack, name})),
  // Replaces the 'onChange' reducer
  onChange: (myName) => set((state) => ({
    ...state,
    myName,
  })),
  // Replaces the 'addList' reducer
  addList: (item) => set((state) => ({
    ...state,
    list: [...state.list, item],
  })),
  // Replaces the 'setData' reducer
  setData: ({ img, imgBack, name, myName, experience1, experience2, list }) => set((state) => ({
    ...state,
    img,
    imgBack,
    name,
    myName,
    experience1,
    experience2,
    list,
  })),
}));

export default useStateStore;
