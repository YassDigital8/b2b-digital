
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import DatePickerField from './DatePickerField';
import NationalitySelect from './NationalitySelect';
import { PassengerFormItemProps } from './types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { updatePassenger } from '@/redux/slices/posSlice';

const PassengerFormItem = ({
  passenger,
  index,
  openAccordion,
  setOpenAccordion
}: PassengerFormItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const getPassengerTitle = (index) => {
    const typeLabel = passenger.PassengerTypeCode === 'ADT' ? 'Adult' : passenger.PassengerTypeCode === 'CHD' ? 'Child' : 'Infant';
    // const idx = parseInt(passenger.id.split('-')[1]);
    return `${typeLabel} #${index}`;
  };

  return (
    <AccordionItem
      value={`passenger-${index}`}
      className="border rounded-xl overflow-hidden shadow-md mb-4 transition-all duration-300 hover:shadow-lg group"
    >
      <AccordionTrigger className="px-4 py-3.5 hover:no-underline bg-gradient-to-r from-white to-blue-50/30 group-hover:from-slate-50 group-hover:to-blue-50/50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full mr-3 text-xs font-medium
              ${passenger.PassengerTypeCode === 'ADT'
                ? 'bg-chamBlue/15 text-chamBlue ring-1 ring-chamBlue/30'
                : passenger.PassengerTypeCode === 'CHD'
                  ? 'bg-green-100 text-green-700 ring-1 ring-green-300'
                  : 'bg-pink-100 text-pink-700 ring-1 ring-pink-300'
              }`}>
              {passenger.PassengerTypeCode === 'ADT' ? 'A' : passenger.PassengerTypeCode === 'CHD' ? 'C' : 'I'}
            </span>
            <span className="font-medium text-gray-900 font-display">
              {getPassengerTitle(index)}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {passenger.GivenName && passenger.Surname
              ? `${passenger.GivenName} ${passenger.Surname}`
              : 'Not completed'}
          </span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-5 pt-5 pb-6 bg-gradient-to-br from-white to-blue-50/30">
        <div className="space-y-5">
          {/* Gender Selection */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor={`${index + 1}-gender`} className="text-sm font-medium text-gray-700">Gender</Label>
              <Select
                value={passenger.NameTitle}
                onValueChange={(value) =>
                  dispatch(updatePassenger({
                    index,
                    data: { NameTitle: value as 'MSTR' | 'MISS' },
                  }))
                }
              >
                <SelectTrigger id={`${index + 1}-gender`} className="w-full mt-1.5 border-chamBlue/20 focus:border-chamBlue shadow-sm">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MSTR">Male</SelectItem>
                  <SelectItem value="MISS">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor={`${index + 1}-GivenName`} className="text-sm font-medium text-gray-700">First Name</Label>
              <Input
                id={`${index + 1}-GivenName`}
                value={passenger.GivenName}
                onChange={(e) =>
                  dispatch(updatePassenger({
                    index,
                    data: { GivenName: e.target.value },
                  }))
                } className="mt-1.5 border-chamBlue/20 focus:border-chamBlue shadow-sm"
                placeholder="As in passport"
              />
            </div>

            <div>
              <Label htmlFor={`${index + 1}-Surname`} className="text-sm font-medium text-gray-700">Last Name</Label>
              <Input
                id={`${index + 1}-Surname`}
                value={passenger.Surname}
                onChange={(e) =>
                  dispatch(updatePassenger({
                    index,
                    data: { Surname: e.target.value },
                  }))
                } className="mt-1.5 border-chamBlue/20 focus:border-chamBlue shadow-sm"
                placeholder="As in passport"
              />
            </div>
          </div>

          {/* Date of Birth & Nationality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <DatePickerField
              label="Date of Birth"
              id={`${index + 1}-dob`}
              date={passenger.BirthDate}
              onSelect={(date) =>
                dispatch(updatePassenger({
                  index,
                  data: { BirthDate: date },
                }))
              } disableFuture={true}
            />

            <NationalitySelect
              passengerId={passenger.id}
              value={passenger.nationality}
              onChange={(value) =>
                dispatch(updatePassenger({
                  index,
                  data: { nationality: value },
                }))
              } />
          </div>

          {/* Passport Information */}
          <div className="mt-6 mb-2">
            <h3 className="text-md font-medium text-chamBlue font-display flex items-center">
              <span className="bg-chamBlue/10 text-chamBlue h-6 w-6 rounded-full inline-flex items-center justify-center mr-2 text-xs">P</span>
              Passport Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor={`${index + 1}-passport`} className="text-sm font-medium text-gray-700">Passport Number</Label>
              <Input
                id={`${index + 1}-passport`}
                value={passenger?.Document?.DocID}
                onChange={(e) =>
                  dispatch(updatePassenger({
                    index,
                    data: {
                      Document: {
                        ...passenger.Document,
                        DocID: e.target.value,
                      },
                    },
                  }))
                } className="mt-1.5 border-chamBlue/20 focus:border-chamBlue shadow-sm"
                placeholder="Enter passport number"
              />
            </div>

            <DatePickerField
              label="Expiry Date"
              id={`${index + 1}-expiry-date`}
              date={passenger?.Document?.ExpireDate || null}
              onSelect={(date) =>
                dispatch(updatePassenger({
                  index,
                  data: {
                    Document: {
                      ...passenger.Document,
                      ExpireDate: date,
                    },
                  },
                }))
              }
              disablePast={true}
            />

          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PassengerFormItem;
