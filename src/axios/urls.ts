const port1 = 7183
const port2 = 8120
const port3 = 7036
const authPort = 7184
export const BASE_URL = `http://devsrv01`;
export const baseURL = `http://devsrv01:${port2}`;
export const b2bBaseUrl = `http://devsrv01:${port1}`;
export const posBaseUrl = `http://devsrv01:${port1}`;

export const GetFlightsWithPrice = `GetFlightsWithPrice`;
export const login = `login`;
export const TravelAgentOffice = `TravelAgentOffice`;
export const TravelAgentOfficeDetails = `TravelAgentOfficeDetails`;
export const TravelAgentApplication = `TravelAgentApplication`;
export const POS = `POS`;
export const authenticationAPi = `${BASE_URL}:${authPort}/Authentication/login`;
export const b2bAPi = `${BASE_URL}:${port2}`;


