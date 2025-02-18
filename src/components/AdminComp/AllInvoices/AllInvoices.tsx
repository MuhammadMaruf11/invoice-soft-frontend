/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { Container, Spinner } from "react-bootstrap";
import { AdminPrivateAPI } from "../../../helper/api";
import { apiList } from "../../../helper/apiList";
import PaginationComponent from "../../utils/PaginationComponent";
import InvoiceTable from "./InvoiceTable";
import InvoiceModal from "./InvoiceModal";
import DeleteInvoiceConfirmation from "./DeleteInvoiceConfirmation ";

// Interfaces

interface Invoice {
    _id: string;
    customerName: string;
    date: string;
    customerAddress: string;
    customerPhone: string;
    invoiceDetails: string;
    items: Item[];
    total: number;
    prepaid: number;
    balance: number;
    delivery: string;
}

interface Item {
    description: string;
    quantity: number;
    price: number;
    amount: number;
}

const AllInvoices = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);

    const invoiceDetailsRef = useRef<HTMLParagraphElement>(null);

    const fetchInvoices = async () => {
        try {
            const response = await AdminPrivateAPI.get(`${apiList.GET_INVOICE}?page=${page}&itemsPerPage=10`);
            const data = response.data.invoices;
            setInvoices(data);
            setTotalPages(response.data.pagination.totalPages);
        } catch (err) {
            setError("Failed to fetch invoices.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, [page]);

    useEffect(() => {
        if (selectedInvoice && invoiceDetailsRef.current) {
            invoiceDetailsRef.current.innerHTML = selectedInvoice.invoiceDetails;
        }
    }, [selectedInvoice]);

    const handleDeleteInvoice = async () => {
        if (invoiceToDelete) {
            try {
                await AdminPrivateAPI.delete(`${apiList.DELETE_SINGE_INVOICE}/${invoiceToDelete}`);
                fetchInvoices();
                setShowDeleteConfirmation(false);
            } catch (err: any) {
                console.error('error', err.message);
            }
        }
    };

    const handleShowModal = (userId: string) => {
        const invoice = invoices.find((inv) => inv._id === userId);
        setSelectedInvoice(invoice || null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDeleteClick = (userId: string) => {
        setInvoiceToDelete(userId);
        setShowDeleteConfirmation(true);
    };

    return (
        <Container className="py-4">
            <h2 className="text-center mb-4">All Invoices</h2>

            {isLoading && <Spinner animation="border" role="status" className="d-block mx-auto" />}


            {!isLoading && !error && (
                <>
                    <InvoiceTable
                        invoices={invoices}
                        onDelete={handleDeleteClick}
                        onView={handleShowModal}
                    />
                    {totalPages > 1 && (
                        <PaginationComponent page={page} totalPages={totalPages} setPage={setPage} />
                    )}
                </>
            )}

            <InvoiceModal
                show={showModal}
                onClose={handleCloseModal}
                invoice={selectedInvoice}
                invoiceDetailsRef={invoiceDetailsRef}
            />

            <DeleteInvoiceConfirmation
                show={showDeleteConfirmation}
                onClose={() => setShowDeleteConfirmation(false)}
                onConfirm={handleDeleteInvoice}
            />
        </Container>
    );
};

export default AllInvoices;
