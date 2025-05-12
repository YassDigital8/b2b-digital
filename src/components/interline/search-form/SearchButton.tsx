
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchButtonProps {
  isSearching: boolean;
}

const SearchButton = ({ isSearching }: SearchButtonProps) => {
  return (
    <Button
      type="submit"
      className="w-full bg-chamBlue hover:bg-chamBlue/90"
      disabled={isSearching}
    >
      {isSearching ? (
        <>
          <Search className="mr-2 h-4 w-4 animate-pulse" />
          Searching Flights...
        </>
      ) : (
        <>
          <Search className="mr-2 h-4 w-4" />
          Search Flights
        </>
      )}
    </Button>
  );
};

export default SearchButton;
