export interface PaginationProps {
    active: number;
    last: number;
    visible: number;
    handlePageChange: (now: number) => void;
}