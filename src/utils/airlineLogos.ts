
// Map of airline codes to their logo images
export const airlineLogos: Record<string, string> = {
  '6Q': '/lovable-uploads/052ec344-d2e0-4af7-b2ff-2c93877c8875.png',  // Cham Wings Airlines
  'J9': '/lovable-uploads/be6b5036-ad2d-47ab-a9c4-07b9ce420119.png',  // Jazeera Airways
  'G9': 'https://www.airarabia.com/sites/all/themes/airarabia/assets/images/logo.png',  // Air Arabia
  'FZ': 'https://content.presspage.com/uploads/2431/1920_flydubai-logo.png?10000',     // FlyDubai
  'KU': 'https://www.kuwaitairways.com/en/Images/kuwait-new-logo_tcm104-5513.png'      // Kuwait Airways
};

// Function to get airline logo by code
export const getAirlineLogo = (airlineCode: string): string => {
  return airlineLogos[airlineCode] || '';
};
