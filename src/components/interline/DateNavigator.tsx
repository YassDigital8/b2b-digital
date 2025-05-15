import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';  // Radix UI Tooltip
import { useAppSelector } from '@/redux/useAppSelector';
import { useDispatch } from 'react-redux';
import { getFlightsWithPriceService } from '@/redux/services/posService';
import { useInterlineBooking } from '@/hooks/useInterlineBooking';
import { toast } from 'sonner';

const DateNavigator = () => {
    const { searchInfo } = useAppSelector(state => state.auth);
    const { isLoadingSrarchFlights } = useAppSelector(state => state.pos);
    const {
        user,
        searchResults,
        selectedFlight,
        isSearching,
        isSubmitting,
        sortBy,
        passengers,
        lastSearchCriteria,
        setSelectedFlight,
        handleSearch,
        handleBooking,
        handleSortChange, setSearchResults
    } = useInterlineBooking();
    const [currentDate, setCurrentDate] = useState(new Date(searchInfo.date));  // Get initial date from searchInfo
    const dispatch = useDispatch()

    // Function to format the date to match the required format
    const formatDate = (date: Date) => {
        console.log('date From formatDate', date);

        if (date) {
            // Get the time zone offset in minutes
            const offset = date.getTimezoneOffset();

            // Adjust the date by the offset
            date.setMinutes(date.getMinutes() - offset);

            const formattedDate = `${date.toISOString().split('T')[0]}T00:00:00`;
            console.log("Formatted Date:", formattedDate);
            return formattedDate;
        }
        console.log("No date provided");
        return "";
    };

    // Handle date change for both + and - buttons
    const handleDateChange = (change: number) => {
        if (isLoadingSrarchFlights) {
            return;
        }
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate.setDate(prevDate.getDate() + change));  // Change the date by +1 or -1
            const formattedDate = formatDate(newDate); // Format the new date
            updateDataToSend(formattedDate); // Update the dataToSend object with the new date

            return newDate;
        });
    };

    // Update searchInfo but only override the `date` key
    const updateDataToSend = (formattedDate: string) => {
        const updatedSearchInfo = {
            ...searchInfo,  // Keep all other values intact
            date: formattedDate,  // Override the `date` key with the updated date
        };
        if (isLoadingSrarchFlights) {
            toast.error('Please wait for current result');
            return;
        }
        dispatch(getFlightsWithPriceService({ data: updatedSearchInfo })).then((action) => {
            if (getFlightsWithPriceService.fulfilled.match(action)) {
                const data = action.payload
                setSearchResults(data);

            }
        })
        console.log('Updated searchInfo:', updatedSearchInfo);  // You can send this data via API call here
    };

    useEffect(() => {
        // Update currentDate when searchInfo.date changes
        setCurrentDate(new Date(searchInfo.date));
    }, [searchInfo.date]);

    return (
        <div className="flex items-center justify-center space-x-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-4 rounded-lg shadow-md">
            {/* Tooltip for Prev Date */}
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <button
                        onClick={() => handleDateChange(-1)}  // Decrease the date
                        className="p-3 bg-white text-gray-700 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        <ArrowLeft size={24} />
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Content side="top" align="center" className="bg-black text-white rounded px-3 py-1 text-sm shadow-lg">
                    Previous Date
                    <Tooltip.Arrow className="fill-black" />
                </Tooltip.Content>
            </Tooltip.Root>

            {/* Current Date */}
            <span className="text-xl font-semibold text-gray-800">{currentDate.toLocaleDateString()}</span>

            {/* Tooltip for Next Date */}
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <button
                        onClick={() => handleDateChange(1)}  // Increase the date
                        className="p-3 bg-white text-gray-700 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        <ArrowRight size={24} />
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Content side="top" align="center" className="bg-black text-white rounded px-3 py-1 text-sm shadow-lg">
                    Next Date
                    <Tooltip.Arrow className="fill-black" />
                </Tooltip.Content>
            </Tooltip.Root>
        </div>
    );
};

export default DateNavigator;
