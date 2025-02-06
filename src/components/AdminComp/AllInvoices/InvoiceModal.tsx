import { Modal, Row, Col, Table, Button } from "react-bootstrap";
import companyLogo from '/company-logo.png';

interface InvoiceModalProps {
    show: boolean;
    onClose: () => void;
    invoice: any | null;
    invoiceDetailsRef: React.RefObject<HTMLParagraphElement>;
}

const InvoiceModal = ({ show, onClose, invoice, invoiceDetailsRef }: InvoiceModalProps) => (
    <Modal show={show} size="xl" onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Invoice Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div id="tablePdf" className="invoice-container p-0">
                {invoice ? (
                    <>
                        <Row>
                            <Col className="logo-container">
                                <img src={companyLogo} alt="Company Logo" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col><p><strong>Customer's Name:</strong> {invoice.customerName}</p></Col>
                            <Col><p><strong>Date:</strong> {invoice.date.slice(0, 10)}</p></Col>
                        </Row>
                        <Row className="mb-3">
                            <Col><p><strong>Address:</strong> {invoice.customerAddress}</p></Col>
                            <Col><p><strong>Phone:</strong> {invoice.customerPhone}</p></Col>
                        </Row>
                        <Row className="mb-3">
                            <Col><p><strong>Invoice Details:</strong></p><p ref={invoiceDetailsRef}></p></Col>
                        </Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Sl No.</th>
                                    <th>Items</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.description}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                        <td>{item.amount}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={4}><strong>Total:</strong></td>
                                    <td>{invoice.total}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </>
                ) : (
                    <p>No invoice details available.</p>
                )}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Close</Button>
        </Modal.Footer>
    </Modal>
);

export default InvoiceModal;
