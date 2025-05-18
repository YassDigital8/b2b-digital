
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingSteps from '@/components/interline/booking-form/BookingSteps';
import PassengerDetailsForm from '@/components/interline/booking-form/passenger-details';
import ContactInformationForm from '@/components/interline/booking-form/ContactInformationForm';
import BookingConfirmation from '@/components/interline/booking-form/BookingConfirmation';
import { useBookingForm } from '@/hooks/useBookingForm';

// Re-export types from the types file
export { type Passenger, type ContactInformation } from '@/components/interline/booking-form/types';

const InterlineBookingForm = () => {
  const {
    flightData,
    currentStep,
    isSubmitting,
    passengers,
    contactInformation,
    nextStep,
    prevStep,
    updatePassenger,
    updateContactInformation,
    handleSubmit
  } = useBookingForm();

  // if (!flightData) {
  //   return null; 
  // }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50/10">


        {/* Header */}
        <div className="h-36 bg-gradient-to-r from-chamDarkBlue via-blue-700 to-chamDarkBlue relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,186.7C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>

          <motion.div
            className="container mx-auto px-4 relative z-10 h-full flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white">
              <h1 className="text-2xl font-semibold font-display">Complete Your Booking</h1>
              <p className="text-white/90 text-sm mt-1 flex items-center">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-chamGold mr-1.5"></span>
                {flightData?.segments[0]?.from} to {flightData?.segments[flightData?.segments?.length - 1]?.to}
              </p>
            </div>
          </motion.div>
        </div>

        <main className="flex-grow pb-12">
          <div className="container mx-auto px-4 -mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-6"
            >
              <Card className="border-none shadow-2xl overflow-visible rounded-xl">
                <CardContent className="p-0">
                  {/* Booking Header */}
                  <div className="bg-gradient-to-r from-chamDarkBlue via-blue-700 to-chamDarkBlue py-6 px-6 rounded-t-xl">
                    <h2 className="text-2xl font-bold text-white font-display">Complete Your Booking</h2>
                    <p className="text-blue-100 text-sm mt-1">Fill in passenger details to proceed with your reservation</p>
                  </div>

                  <BookingSteps currentStep={currentStep} />

                  {currentStep === 1 && (
                    <PassengerDetailsForm
                      passengers={passengers}
                      updatePassenger={updatePassenger}
                      onNext={nextStep}
                    />
                  )}

                  {currentStep === 2 && (
                    <ContactInformationForm
                      contactInformation={contactInformation}
                      updateContactInformation={updateContactInformation}
                      onBack={prevStep}
                      onSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                    />
                  )}

                  {currentStep === 3 && (
                    <BookingConfirmation
                      flightData={flightData}
                      passengers={passengers}
                      contactInformation={contactInformation}
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InterlineBookingForm;
