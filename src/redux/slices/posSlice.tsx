import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bookSessionsService, getFlightsWithPriceService, getPosService, Pos } from '../services/posService';
import { flights } from '@/data';
import { Passenger } from '@/pages/InterlineBookingForm';
import deepMerge from '@/utils/deepMerge';

interface posState {
    isLoading: boolean;
    flight_type: string;
    isLoadingSrarchFlights: boolean;
    isLoadingBook: boolean;
    posArray: Pos[];
    selectedFlight: {},
    passengersInfo: {},
    bookResponse: {}
}
const initialState: posState = {
    isLoading: false,
    isLoadingSrarchFlights: false,
    isLoadingBook: false,
    posArray: [],
    filghts: [],
    selectedFlight: {},
    passengersInfo: {},
    bookResponse: {},
    flight_type: ''
};
const posSlice = createSlice({
    name: 'pos',
    initialState,
    reducers: {
        setSelectedFlight: (state, action) => {
            state.selectedFlight = action.payload;
        },
        setPassengersInfo: (state, action) => {
            state.passengersInfo = action.payload;
        },
        setFlightType: (state, action) => {
            state.flight_type = action.payload;
        },
        updatePassenger(state, action: PayloadAction<{ index: number; data: Partial<Passenger> }>) {
            const { index, data } = action.payload;
            const existing = state.passengersInfo[index];

            state.passengersInfo[index] = deepMerge(existing, data);
        },

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
            .addCase(bookSessionsService.pending, (state) => {
                state.isLoadingBook = true;
            })
            .addCase(bookSessionsService.fulfilled, (state, action) => {
                state.isLoadingBook = false;
                const data = action.payload;
                state.bookResponse = data
            })
            .addCase(bookSessionsService.rejected, (state) => {
                state.isLoadingBook = false;

            })


    },
});
export const { setSelectedFlight, setPassengersInfo, updatePassenger ,setFlightType} = posSlice.actions;

export default posSlice.reducer;
