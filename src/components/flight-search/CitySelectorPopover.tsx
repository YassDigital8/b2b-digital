
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CityOption {
  city: string;
  code: string;
}

interface CitySelectorPopoverProps {
  value: string;
  onChange: (city: string) => void;
  options: CityOption[];
  placeholder: string;
  excludeCity?: string;
  icon?: React.ReactNode;
}

const CitySelectorPopover: React.FC<CitySelectorPopoverProps> = ({
  value,
  onChange,
  options,
  placeholder,
  excludeCity,
  icon
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = options
    .filter(option => 
      option.city !== excludeCity && 
      (option.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
       option.code.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleSelect = (city: string) => {
    onChange(city);
    setOpen(false);
    setSearchQuery('');
  };

  const selectedOption = options.find(option => option.city === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-start font-normal"
        >
          {icon && <span className="mr-2">{icon}</span>}
          {value ? (
            <span>
              {selectedOption?.city} <span className="text-gray-500 ml-1">({selectedOption?.code})</span>
            </span>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <div className="flex items-center p-3 border-b">
          <Search className="h-4 w-4 text-gray-500 mr-2" />
          <Input
            placeholder="Search cities or airport codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-8"
          />
        </div>
        <ScrollArea className="h-56 p-1">
          {filteredOptions.length > 0 ? (
            <div className="grid gap-1">
              {filteredOptions.map((option) => (
                <button
                  key={option.code}
                  onClick={() => handleSelect(option.city)}
                  className={`
                    flex justify-between items-center p-2.5 text-sm rounded-md w-full
                    ${value === option.city ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}
                  `}
                >
                  <span className="font-medium">{option.city}</span>
                  <span className="text-gray-500 text-xs">{option.code}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-gray-500">No results found</div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default CitySelectorPopover;
