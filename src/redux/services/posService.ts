
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Flight, FlightSearchData, Pos } from "@/types/flight";

export const getPosService = createAsyncThunk(
  "pos/get",
  async (_, { rejectWithValue }) => {
    try {
      // Mocked response for demonstration
      return [
        { id: "1", key: "ae", englishName: "UAE" },
        { id: "2", key: "sy", englishName: "Syria" },
      ];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getFlightsWithPriceService = createAsyncThunk(
  "pos/getFlightsWithPrice",
  async ({ data }: { data: any }, { rejectWithValue }) => {
    try {
      // Mocked flight data for demonstration
      return [
        {
          id: "flight-1",
          segments: [
            {
              id: "segment-1",
              airline: "Cham Wings",
              flightNumber: "CW101",
              from: "Damascus",
              to: "Dubai",
              fromCode: "DAM",
              toCode: "DXB",
              departureTime: new Date(),
              arrivalTime: new Date(),
              duration: "2h 30m",
              airport: "DAM",
              FlightNumber: "CW101",
              departure_time: "10:00",
              departure_date: "2025-05-30",
              origin_code: "DAM",
              origin_name: "Damascus",
              arrival_time: "12:30",
              arrival_date: "2025-05-30",
              destination_code: "DXB",
              destination_name: "Dubai",
              Duration: "2h 30m"
            }
          ],
          stops: 0,
          price: 500,
          seats: 20,
          cabin: "economy",
          flight_class: "Y",
          Duration: "2h 30m",
          total_fare_with_additional: 550,
          departure_time: "10:00",
          origin_code: "DAM",
          origin_name: "Damascus",
          arrival_time: "12:30",
          destination_code: "DXB",
          destination_name: "Dubai",
          pricing_info: [
            {
              FareRuleReference: {
                "Cancellation": "Non-refundable",
                "Change": "Allowed with fee"
              }
            }
          ],
          connection_time: []
        }
      ];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
