import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../axios/axioxConfig';
import { POS, posBaseUrl } from '@/axios/urls';


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
export type AgentResponse = Pos[];


export const getPosService = createAsyncThunk<
  Pos[],
  void,
  { rejectValue: any }
>(
  `${sliceName}/getPosService`,
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get(`${posBaseUrl}/${POS}`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || 'Something went wrong');
    }
  }
);

