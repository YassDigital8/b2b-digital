
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import { bookingFormSchema, BookingFormValues } from './schema';

export const useSearchForm = (
  onSearch: (data: BookingFormValues) => void, 
  initialValues?: BookingFormValues
) => {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      tripType: 'one-way',
      fromCity: '',
      toCity: '',
      departureDate: undefined,
      returnDate: undefined,
      cabinClass: 'economy',
      adults: 1,
      children: 0,
      infants: 0,
    },
  });
  
  const tripType = form.watch('tripType');
  const fromCity = form.watch('fromCity');
  
  // Manage return date requirement based on trip type
  useEffect(() => {
    if (tripType === 'round-trip') {
      form.register('returnDate', { required: "Return date is required for round trips" });
    } else {
      form.setValue('returnDate', null);
    }
  }, [tripType, form]);
  
  // Initialize form with initial values if provided
  useEffect(() => {
    if (initialValues) {
      form.setValue('fromCity', initialValues.fromCity);
      form.setValue('toCity', initialValues.toCity);
      form.setValue('departureDate', initialValues.departureDate);
      form.setValue('cabinClass', initialValues.cabinClass);
      form.setValue('adults', initialValues.adults);
      form.setValue('children', initialValues.children);
      form.setValue('infants', initialValues.infants);
    }
  }, [initialValues, form]);
  
  const handleSubmit = (data: BookingFormValues) => {
    if (data.fromCity === data.toCity) {
      toast.error('Departure and destination cities cannot be the same');
      return;
    }
    
    if (data.tripType === 'round-trip' && data.returnDate && data.departureDate > data.returnDate) {
      toast.error('Return date must be after departure date');
      return;
    }
    
    const totalPassengers = data.adults + data.children + data.infants;
    if (totalPassengers > 9) {
      toast.error('Maximum 9 passengers allowed per booking');
      return;
    }
    
    if (data.infants > data.adults) {
      toast.error('Number of infants cannot exceed number of adults');
      return;
    }
    
    onSearch(data);
  };

  return {
    form,
    tripType,
    fromCity,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
};
