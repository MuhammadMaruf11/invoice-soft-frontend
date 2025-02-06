import { Table, Button } from "react-bootstrap";

interface Invoice {
    _id: string;
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    date: string;
}

interface InvoiceTableProps {
    invoices: Invoice[];
    onDelete: (userId: string) => void;
    onView: (userId: string) => void;
}

const InvoiceTable = ({ invoices, onDelete, onView }: InvoiceTableProps) => (
    <Table striped bordered hover responsive>
        <thead className="bg-primary text-white">
            <tr>
                <th>No.</th>
                <th>Customer Name</th>
                <th>Customer Address</th>
                <th>Customer Phone</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {invoices.length > 0 ? (
                invoices.map((user, index) => (
                    <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.customerName}</td>
                        <td>{user.customerAddress}</td>
                        <td>{user.customerPhone}</td>
                        <td>{user.date.slice(0, 10)}</td>
                        <td>
                            <Button variant="info" onClick={() => onView(user._id)}>
                                View
                            </Button>
                            &nbsp;
                            <Button variant="danger" onClick={() => onDelete(user._id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={6} className="text-center">
                        No invoices found
                    </td>
                </tr>
            )}
        </tbody>
    </Table>
);

export default InvoiceTable;
