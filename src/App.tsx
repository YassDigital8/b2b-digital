
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { Provider } from 'react-redux';
import { persistor, store } from "./redux/store";
import { useEffect } from "react";
import InterceptorSetup from '@/axios/InterceptorSetup';
import { PersistGate } from "redux-persist/integration/react";
import 'sweetalert2/dist/sweetalert2.min.css';

const queryClient = new QueryClient();

const App = () => {

  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <InterceptorSetup />
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
      </PersistGate>

    </Provider>
  );
}

export default App;
