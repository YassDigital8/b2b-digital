import { toast } from 'sonner';

interface SignUpApiData {
  travel_agent_office: string;
  pos: string;
  email: string | string[];
  phone: string | string[];
  code: string | string[];
  user_name: string;
}

export interface SignUpApiResponse {
  success?: boolean;
  message?: string;
  data?: any;
  error?: boolean;
  raw?: string;
  requestData?: SignUpApiData;
  status?: string;
  errors?: Record<string, string[]>;
}

// Public free CORS proxies (we use multiple in case one fails)
const CORS_PROXIES = [
  'https://corsproxy.io/?',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.allorigins.win/raw?url='
];

export async function sendSignUpRequest(apiData: SignUpApiData): Promise<SignUpApiResponse> {
  const targetUrl = 'https://b2b-chamwings.com/api/signup';
  console.log('Preparing API request to:', targetUrl);
  
  // Ensure all fields are strings as expected by the API
  const formattedData = {
    travel_agent_office: String(apiData.travel_agent_office).trim(),
    pos: String(apiData.pos).trim(),
    email: typeof apiData.email === 'string' ? String(apiData.email).trim() : String(apiData.email[0]).trim(),
    phone: typeof apiData.phone === 'string' ? String(apiData.phone).trim() : String(apiData.phone[0]).trim(),
    code: typeof apiData.code === 'string' ? String(apiData.code).trim() : String(apiData.code[0]).trim(),
    user_name: String(apiData.user_name).trim()
  };
  
  console.log('Request data:', JSON.stringify(formattedData, null, 2));

  // Try each proxy in order until one works
  for (let i = 0; i < CORS_PROXIES.length; i++) {
    const proxyUrl = CORS_PROXIES[i] + encodeURIComponent(targetUrl);
    console.log(`Attempting with CORS proxy ${i+1}:`, CORS_PROXIES[i]);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', // Required by some proxies like cors-anywhere
        },
        body: JSON.stringify(formattedData),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      // Get the raw response text and parse it as JSON if possible
      const responseText = await response.text();
      let responseData: SignUpApiResponse;
      
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { raw: responseText };
      }

      // Display the response in a toast
      toast(
        response.ok ? "API Response (Success)" : "API Response (Error)",
        {
          description: JSON.stringify(responseData, null, 2),
          duration: 10000, // 10 seconds
        }
      );

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to sign up');
      }

      console.log('Successful response from proxy', i+1);
      return responseData;
    } catch (error) {
      console.error(`Error with proxy ${i+1}:`, error);
      
      // If this is the last proxy, throw the error
      if (i === CORS_PROXIES.length - 1) {
        let errorMessage = 'Network error: ';
        
        if (error instanceof DOMException && error.name === 'AbortError') {
          errorMessage += 'Request timed out after 15 seconds';
        } else if (error instanceof TypeError && error.message === 'Failed to fetch') {
          errorMessage += 'API request failed - the proxy may be unavailable';
        } else if (error instanceof Error) {
          errorMessage += error.message || 'Unknown error';
        } else {
          errorMessage += 'Unknown error';
        }
        
        toast.error(errorMessage, { duration: 6000 });
        
        // Return an error response
        return {
          error: true,
          message: errorMessage,
          requestData: apiData
        };
      }
      // Otherwise continue to the next proxy
    }
  }
  
  // This should never happen due to the loop structure, but TypeScript needs it
  return {
    error: true,
    message: "All CORS proxies failed",
    requestData: apiData
  };
}
