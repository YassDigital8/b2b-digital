import { createSlice } from '@reduxjs/toolkit';
import { createTravelAgentService, getTravelAgentService, logInService } from '../services/authService';

interface AuthState {
    isLoggedIn: boolean;
    isLoading: boolean;
    token: string;
    mode: string;
    numberOfLogin: number | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    isLoading: false,
    token: '',
    mode: '',
    numberOfLogin: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            // ======================== logInService =======================
            .addCase(logInService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logInService.fulfilled, (state, action) => {
                const data = action.payload;
                state.isLoading = false;
                state.isLoggedIn = true;
                state.token = data.token;
                state.numberOfLogin = data.numberOfLogin;
                localStorage.setItem('token', data.token);

            })
            .addCase(logInService.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getTravelAgentService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTravelAgentService.fulfilled, (state, action) => {
                state.isLoading = false;

            })
            .addCase(getTravelAgentService.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(createTravelAgentService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTravelAgentService.fulfilled, (state, action) => {
                state.isLoading = false;

            })
            .addCase(createTravelAgentService.rejected, (state) => {
                state.isLoading = false;
            })
    },
});
export const {  setToken} = authSlice.actions;

export default authSlice.reducer;
