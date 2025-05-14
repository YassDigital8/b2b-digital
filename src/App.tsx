
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";
import Dashboard from "./pages/Dashboard";
import TransportationBooking from "./pages/TransportationBooking";
import TopUp from "./pages/TopUp";
import InterlineBooking from "./pages/InterlineBooking";
import InterlineBookingForm from "./pages/InterlineBookingForm";
import FlightSearch from "./pages/FlightSearch"; // Import the new page
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transportation" element={<TransportationBooking />} />
              <Route path="/top-up" element={<TopUp />} />
              <Route path="/interline" element={<InterlineBooking />} />
              <Route path="/interline-booking" element={<InterlineBookingForm />} />
              <Route path="/flight-search" element={<FlightSearch />} /> {/* Add the new route */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/reports" element={<NotFound />} />
              <Route path="/about" element={<NotFound />} />
              <Route path="/services" element={<NotFound />} />
              <Route path="/support" element={<NotFound />} />
              <Route path="/contact" element={<NotFound />} />
              <Route path="/api" element={<NotFound />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
