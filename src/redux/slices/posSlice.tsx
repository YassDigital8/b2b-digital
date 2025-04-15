import { createSlice } from '@reduxjs/toolkit';
import { getPosService, Pos } from '../services/posService';

interface posState {
    isLoading: boolean;
    posArray: Pos[];
}
const initialState: posState = {
    isLoading: false,
    posArray: []
};
const posSlice = createSlice({
    name: 'pos',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // ======================== logInService =======================
            .addCase(getPosService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPosService.fulfilled, (state, action) => {
                const data = action.payload;
                state.posArray = data
                state.isLoading = false;


            })
            .addCase(getPosService.rejected, (state) => {
                state.isLoading = false;
            })


    },
});
// export const {  } = authSlice.actions;

export default posSlice.reducer;
