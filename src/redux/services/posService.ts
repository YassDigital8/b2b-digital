import { createAsyncThunk } from '@reduxjs/toolkit';
import { b2bAPi, BASE_URL, GetFlightsWithPrice, POS } from '@/axios/urls';
import { apiClient } from '@/axios/axioxConfig';
import { getHeadres } from '@/axios/headres';


const sliceName = `pos`;

export interface AgentRequest {
  // code: string;
}
export interface Pos {
  id: number;
  key: string;
  arabicName: string;
  englishName: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
}
interface FlightSearchData {
  origin: string;
  destination: string;
  date: string;
  date_return: string;
  adults: number;
  children: number;
  infants: number;
  flightclass: string;
  flighttype: string;
  pos: string;
}

export type AgentResponse = Pos[];


export const getPosService = createAsyncThunk<
  Pos[],
  void,
  { rejectValue: any }
>(
  `${sliceName}/getPosService`,
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get(`${BASE_URL}/${POS}`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
    }
  }
);
export const getFlightsWithPriceService = createAsyncThunk<
  Pos[],
  FlightSearchData,
  { rejectValue: any }
>(
  `${sliceName}/getFlightsWithPriceService`,
  async ({ data }, thunkAPI) => {
    try {
      const response = await apiClient.post(
        `${b2bAPi}/${GetFlightsWithPrice}`,
        data
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
    }
  }
);
