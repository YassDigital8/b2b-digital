
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
  console.log('Request data:', JSON.stringify(apiData, null, 2));

  // Try direct API call first without a proxy
  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(apiData),
    });

    // Check if the response is 403 Forbidden
    if (response.status === 403) {
      console.log('Server returned 403 Forbidden - CORS issue detected');
      return {
        error: true,
        status: "error",
        message: "API access forbidden. The server is blocking requests from this application.",
        raw: "403 Forbidden - CORS issue detected",
        requestData: apiData
      };
    }

    const responseText = await response.text();
    console.log('Direct API response:', responseText);
    
    try {
      return JSON.parse(responseText);
    } catch (e) {
      // If not JSON, continue with proxies
    }
  } catch (directError) {
    console.log('Direct API request failed, trying proxies:', directError);
    // Continue with proxies
  }

  // If direct request failed, try each proxy in order
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
        body: JSON.stringify(apiData),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      // Get the raw response text and parse it as JSON if possible
      const responseText = await response.text();
      console.log('Raw API response:', responseText);
      
      // Check for 403 Forbidden HTML response
      if (responseText.includes('403 Forbidden') || responseText.includes('Access to this resource on the server is denied')) {
        console.log('Detected 403 Forbidden response from proxy', i+1);
        
        if (i === CORS_PROXIES.length - 1) {
          // This is the last proxy, so we should return an error
          toast.error("API access forbidden. The server is rejecting proxy requests.", { 
            duration: 6000 
          });
          
          return {
            error: true,
            status: "error",
            message: "The API server is blocking access from all available methods. Please try again later or contact support.",
            requestData: apiData,
            raw: responseText
          };
        }
        // Otherwise try the next proxy
        continue;
      }
      
      let responseData: SignUpApiResponse;
      
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { 
          raw: responseText,
          status: "error",
          message: "Unable to parse API response"
        };
      }

      console.log('Parsed API response:', responseData);

      // Display the response in a toast
      if (!responseData.error && !responseText.includes('403 Forbidden')) {
        toast.success("Request sent successfully", {
          description: "Your registration request has been submitted.",
          duration: 5000,
        });
      } else {
        toast.error("API Error", {
          description: responseData.message || "Something went wrong with your request.",
          duration: 6000,
        });
      }

      if (!response.ok && !responseData.success) {
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
