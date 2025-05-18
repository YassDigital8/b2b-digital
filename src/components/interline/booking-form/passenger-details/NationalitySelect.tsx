
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface NationalitySelectProps {
  passengerId: string;
  value: string;
  onChange: (value: string) => void;
}

export const nationalities = [
  { value: 'SY', label: 'Syrian' },
  { value: 'LB', label: 'Lebanese' },
  { value: 'EG', label: 'Egyptian' },
  { value: 'JO', label: 'Jordanian' },
  { value: 'IQ', label: 'Iraqi' },
  { value: 'AE', label: 'Emirati' },
  { value: 'SA', label: 'Saudi' },
  { value: 'TR', label: 'Turkish' },
  { value: 'US', label: 'American' },
  { value: 'GB', label: 'British' },
];

const NationalitySelect = ({ passengerId, value, onChange }: NationalitySelectProps) => {
  return (
    <div>
      <Label htmlFor={`${passengerId}-nationality`}>Nationality</Label>
      <Select 
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger 
          id={`${passengerId}-nationality`} 
          className="w-full mt-1.5 border-chamBlue/20 shadow-sm hover:border-chamBlue/40 transition-colors"
        >
          <SelectValue placeholder="Select Nationality" />
        </SelectTrigger>
        <SelectContent className="max-h-[280px] overflow-y-auto border-chamBlue/20 shadow-lg">
          {nationalities.map((nation) => (
            <SelectItem 
              key={nation.value} 
              value={nation.value}
              className="hover:bg-blue-50/50 cursor-pointer"
            >
              {nation.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default NationalitySelect;
