
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingSteps from '@/components/interline/booking-form/BookingSteps';
import PassengerDetailsForm from '@/components/interline/booking-form/passenger-details';
import ContactInformationForm from '@/components/interline/booking-form/ContactInformationForm';
import BookingConfirmation from '@/components/interline/booking-form/BookingConfirmation';
import { useBookingForm } from '@/hooks/useBookingForm';
import InterlineHeader from '@/components/interline/InterlineHeader';
import { useInterlineBooking } from '@/hooks/useInterlineBooking';
import { useAppSelector } from '@/redux/useAppSelector';

// Re-export types from the types file
export { type Passenger, type ContactInformation } from '@/components/interline/booking-form/types';

const InterlineBookingForm = () => {
  const { passengersInfo } = useAppSelector(state => state.pos)
  const {
    flightData,
    currentStep,
    isSubmitting,
    contactInformation,
    bookingResponse,
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



      {/* Header */}
      <div className="h-36  relative overflow-hidden">


        <motion.div
          className="container mx-auto px-4 relative z-10 h-full flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-dark">
            <h1 className="text-2xl font-semibold font-display">Complete Your Booking</h1>
            <p className="text-dark/90 text-sm mt-1 flex items-center">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-chamGold mr-1.5"></span>
              {flightData?.segments[0]?.from} to {flightData?.segments[flightData?.segments.length - 1]?.to}
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
                    passengers={passengersInfo}
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

                {/* {currentStep === 3 && (
                  <BookingConfirmation
                    flightData={flightData}
                    passengers={passengers}
                    contactInformation={contactInformation}
                  />
                )} */}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default InterlineBookingForm;
