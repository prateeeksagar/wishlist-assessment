import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  
  type PaginationProps = {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  };
  
  export const CustomPagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
  }: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const handlePageChange = (page: number) => {
      if (page !== currentPage && page > 0 && page <= totalPages) {
        onPageChange(page);
      }
    };
  
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
            //   disabled={() => {currentPage === 1}} // Disable if on the first page
            />
          </PaginationItem>
          
          {/* Only display the first two pages and the last two pages to manage the number of displayed pages */}
          {totalPages > 2 && (
            <>
              {currentPage > 2 && (
                <>
                  <PaginationItem>
                    <PaginationLink href="#" onClick={() => handlePageChange(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {currentPage > 3 && <PaginationEllipsis />}
                </>
              )}
  
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                if (page === currentPage || (page >= currentPage - 1 && page <= currentPage + 1) || page === totalPages) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                return null;
              })}
            </>
          )}
  
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
            //   disabled={currentPage === totalPages} // Disable if on the last page
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  