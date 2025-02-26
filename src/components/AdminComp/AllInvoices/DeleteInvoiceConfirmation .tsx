import { Modal, Button } from "react-bootstrap";

interface DeleteInvoiceConfirmationProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteInvoiceConfirmation = ({ show, onClose, onConfirm }: DeleteInvoiceConfirmationProps) => (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete this invoice?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="danger" onClick={onConfirm}>Delete</Button>
        </Modal.Footer>
    </Modal>
);

export default DeleteInvoiceConfirmation;
