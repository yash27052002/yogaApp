import { createSlice } from '@reduxjs/toolkit';

const initialState={
    name: '',
    age: '',
    religion: '',
    destination: '',
    boardingTime: '',
    preferance : ''
};

const userSlice= createSlice({
    name:'user',
    initialState,
    reducer: {
        setUserData: (state, action) =>{
            state.name= action.payload.name;
            state.age =action.payload.age;
        },
        setReligion: (state , action) => {
            state.religion= action.payload.religion;
        },
        setDestination: (state , action) => {
            state.destination= action.payload.destination;
        },
        setBoardingTime: (state , action) => {
            state.boardingTime= action.payload.boardingTime;
        },
        setPreferance: (state , action) => {
            state.preferance= action.payload.preferance;
        },
    }
});

export const{
    setUserData,
    setReligion,
    setDestination,
    setBoardingTime,
    setPreferance
} = userSlice.actions;


export default userSlice.reducer;