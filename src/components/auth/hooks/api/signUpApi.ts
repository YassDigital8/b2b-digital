
import { toast } from 'sonner';

interface SignUpApiData {
  travel_agent_office: string;
  pos: string;
  email: string[];
  phone: string[];
  code: string[];
  user_name: string;
}

export interface SignUpApiResponse {
  success?: boolean;
  message?: string;
  data?: any;
  error?: boolean;
  raw?: string;
  requestData?: SignUpApiData;
}

export async function sendSignUpRequest(apiData: SignUpApiData): Promise<SignUpApiResponse> {
  console.log('Sending API request to:', 'https://b2b-chamwings.com/api/signup');
  console.log('Request data:', JSON.stringify(apiData, null, 2));

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    const response = await fetch('https://b2b-chamwings.com/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData),
      signal: controller.signal,
      mode: 'cors', // Explicitly set CORS mode
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

    return responseData;
  } catch (error) {
    console.error('Network error:', error);
    let errorMessage = 'Network error: ';
    
    if (error instanceof DOMException && error.name === 'AbortError') {
      errorMessage += 'Request timed out after 15 seconds';
    } else if (error instanceof TypeError && error.message === 'Failed to fetch') {
      errorMessage += 'Cross-origin request blocked - API may not allow requests from this domain';
      return {
        error: true,
        message: 'API connection error: Cross-origin request blocked. The API server may not be configured to accept requests from this domain.'
      };
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
}
