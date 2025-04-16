
import React from 'react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { motion } from 'framer-motion';

interface FlightPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const FlightPagination: React.FC<FlightPaginationProps> = ({ currentPage, totalPages, handlePageChange }) => {
  if (totalPages <= 1) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-8"
    >
      <Pagination>
        <PaginationContent className="bg-gradient-to-r from-blue-50 to-purple-50 p-1.5 rounded-full shadow-sm border border-blue-100/50">
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))} 
              className={`rounded-full bg-white shadow-sm border-transparent hover:text-blue-600 hover:bg-blue-50 transition-all ${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <PaginationItem key={page}>
              <PaginationLink 
                isActive={currentPage === page} 
                onClick={() => handlePageChange(page)}
                className={`cursor-pointer rounded-full hover:bg-blue-50 transition-all ${currentPage === page ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md" : "bg-white shadow-sm"}`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} 
              className={`rounded-full bg-white shadow-sm border-transparent hover:text-blue-600 hover:bg-blue-50 transition-all ${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </motion.div>
  );
};

export default FlightPagination;
