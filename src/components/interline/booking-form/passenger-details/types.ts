
import { FormikProps } from 'formik';
import { Passenger } from "../types";

export interface PassengerDetailsFormProps {
  formik: FormikProps<any>;
  onNext: () => void;
}

export interface PassengerFormItemProps {
  index: number;
  formik: FormikProps<any>;
  openAccordion: string;
  setOpenAccordion: (value: string) => void;
}
