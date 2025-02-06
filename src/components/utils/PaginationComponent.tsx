import React from 'react';
import { Pagination } from 'react-bootstrap';

interface PaginationComponentProps {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ page, totalPages, setPage }) => {
    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const renderPaginationItems = () => {
        const items = [];
        for (let i = 1; i <= totalPages; i++) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={i === page}
                    onClick={() => setPage(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }
        return items;
    };

    return (
        <Pagination className="justify-content-end">
            <Pagination.Prev onClick={handlePrev} disabled={page === 1} />
            {renderPaginationItems()}
            <Pagination.Next onClick={handleNext} disabled={page === totalPages} />
        </Pagination>
    );
};

export default PaginationComponent;
