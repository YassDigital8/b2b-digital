import { createSlice } from '@reduxjs/toolkit';
import { getFlightsWithPriceService, getPosService, Pos } from '../services/posService';
import { flights } from '@/data';

interface posState {
    isLoading: boolean;
    isLoadingSrarchFlights: boolean;
    posArray: Pos[];
}
const initialState: posState = {
    isLoading: false,
    isLoadingSrarchFlights: false,
    posArray: [],
    filghts: []
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


            .addCase(getFlightsWithPriceService.pending, (state) => {
                state.isLoadingSrarchFlights = true;
            })
            .addCase(getFlightsWithPriceService.fulfilled, (state, action) => {
                state.isLoadingSrarchFlights = false;

                const data = action.payload;
                state.filghts = data
            })
            .addCase(getFlightsWithPriceService.rejected, (state) => {
                state.isLoadingSrarchFlights = false;

            })


    },
});
// export const {  } = authSlice.actions;

export default posSlice.reducer;
