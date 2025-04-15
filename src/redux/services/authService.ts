import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiClient } from '../../axios/axioxConfig';
import { authenticationAPi, b2bBaseUrl, baseUrl, login, TravelAgentApplication, TravelAgentOffice } from '@/axios/urls';

const sliceName = `auth`;
interface LoginRequest {
    password: string;
    email?: string;
    confirmPassword?: string;
    token?: string;
}
interface AgentRequest {
    code: string;

}
interface AgentResponse {
    // code: string;

}


interface LoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    numberOfLogin: number | null;
    message: string;
}
export interface CreateTravelAgentRequest {
    travelAgencyName: string;
    email: string;
    accelAeroUserName: string;
    pos: string;
    phoneNumber: string;
    employees: {
        employeeEmail: string;
        role: string;
        phoneNumber: string;
    }[];
}
export interface CreateTravelAgentResponse {
    id: number;
    travelAgencyName: string;
    email: string;
    accelAeroUserName: string;
    pos: string;
    phoneNumber: string;
    employees: {
        id: number;
        employeeEmail: string;
        role: string;
        phoneNumber: string;
        travelAgentApplicationId: number;
    }[];
}

// ======================== logInService =======================

export const logInService = createAsyncThunk<LoginResponse, LoginRequest, { rejectValue: any }>(`${sliceName}/logInService`, async (data, thunkAPI) => {
    try {
        const response = await apiClient.post(`${authenticationAPi}`, data);
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
    }
});
// ======================== createTravelAgentService =======================

export const createTravelAgentService = createAsyncThunk<
    CreateTravelAgentResponse,
    CreateTravelAgentRequest,
    { rejectValue: any }
>(
    `${sliceName}/createTravelAgentService`,
    async (data, thunkAPI) => {
        try {
            const response = await apiClient.post(`${b2bBaseUrl}/${TravelAgentApplication}`, data);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
        }
    }
);

// ======================== getTravelAgentService =======================

export const getTravelAgentService = createAsyncThunk<AgentResponse, AgentRequest, { rejectValue: any }>(`${sliceName}/getTravelAgentService`, async ({ code }, thunkAPI) => {
    try {
        const response = await apiClient.get(`${b2bBaseUrl}/${TravelAgentOffice}/${code}`);
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
    }
});


