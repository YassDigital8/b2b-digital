
import * as Yup from 'yup';
import { nationalities } from './passenger-details/NationalitySelect';

// Passenger validation schema
export const passengerSchema = Yup.object().shape({
  gender: Yup.string().oneOf(['male', 'female'], 'Gender is required').required('Gender is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  dateOfBirth: Yup.date().required('Date of birth is required').nullable(),
  passportNumber: Yup.string().required('Passport number is required'),
  passportExpiryDate: Yup.date()
    .required('Passport expiry date is required')
    .min(new Date(), 'Passport must not be expired')
    .nullable(),
  nationality: Yup.string()
    .oneOf(nationalities.map(n => n.value), 'Please select a valid nationality')
    .required('Nationality is required'),
});

// Contact information validation schema
export const contactSchema = Yup.object().shape({
  gender: Yup.string().oneOf(['male', 'female'], 'Gender is required').required('Gender is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phoneCode: Yup.string().required('Country code is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  city: Yup.string().required('City is required'),
});

// Combined booking form validation schema
export const bookingFormSchema = Yup.object().shape({
  passengers: Yup.array().of(passengerSchema).required(),
  contactInformation: contactSchema.required(),
});
