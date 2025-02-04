import { useState, useEffect, useRef } from 'react';
import { jsPDF } from "jspdf";
import companyLogo from '/company-logo.png';
import 'react-quill/dist/quill.snow.css';
import { PrivateAPI } from '../../helper/api';
import Layout from '../../components/Layout/Layout';
import CommonBanner from '../../components/Banner/CommonBanner';
import { FaFilePdf } from 'react-icons/fa';
import { apiList } from './../../helper/apiList';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

interface Item {
    description: string;
    quantity: number;
    price: number;
    amount: number;
}

interface Invoice {
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

const PreviewPage: React.FC = () => {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const invoiceDetailsRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found');
                }

                const response = await PrivateAPI.get(`${apiList.GET_SINGLE_INVOICE}/${userId}`);
                const data = response.data[response.data.length - 1];
                setInvoice(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    useEffect(() => {
        if (invoice && invoiceDetailsRef.current) {
            invoiceDetailsRef.current.innerHTML = invoice.invoiceDetails;
        }
    }, [invoice]);

    const exportPDF = () => {
        const doc = new jsPDF({ format: 'a4', orientation: 'p' });
        const tablePdf = document.querySelector("#tablePdf") as HTMLElement; // Cast to HTMLElement

        if (tablePdf) {
            doc.html(tablePdf, {
                callback: function (doc) {
                    doc.save(`invoice.pdf`);
                },
                margin: [4, 0, 4, 0],
                autoPaging: "slice",
                x: 0,
                y: 0,
                width: 210, // Target width in the PDF document
                windowWidth: 1024, // Window width in CSS pixels
            });
        }
    };


    return (
        <Layout>
            <CommonBanner bannerTitle='Invoice Preview Page' />
            <section>
                <Container className="py-4">
                    <Row>
                        <Col>
                            <div id="tablePdf" className="invoice-container">
                                <Row className="">
                                    <Col className="logo-container">
                                        <img src={companyLogo} alt="Company Logo" />
                                    </Col>
                                    <Col className="company-address">
                                        <ul>
                                            <li>
                                                <strong>Phone:</strong> +9613661122 &nbsp;
                                                <strong>Email:</strong> info@digitaldecoderltd.com
                                            </li>
                                            <li>
                                                <strong>Address:</strong> E-9/6, China Town Naya Paltan, Dhaka - 1000, Bangladesh
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                                {isLoading ? (
                                    <p>Loading...</p>
                                ) : invoice ? (
                                    <>
                                        <Row className="mb-3">
                                            <Col className="info-item">
                                                <p><strong>Customer's Name:</strong></p>
                                                <p className="customer-name">{invoice.customerName}</p>
                                            </Col>
                                            <Col className="info-item">
                                                <p><strong>Date:</strong></p>
                                                <p className="date">{invoice.date.slice(0, 10)}</p>
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col className="info-item">
                                                <p><strong>Address:</strong></p>
                                                <p className="address">{invoice.customerAddress}</p>
                                            </Col>
                                            <Col className="info-item">
                                                <p><strong>Phone:</strong></p>
                                                <p className="phone">{invoice.customerPhone}</p>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row className="mb-3">
                                            <Col className="details-item">
                                                <p><strong>Invoice Details:</strong></p>
                                                <p ref={invoiceDetailsRef}></p>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row className="invoice-table">
                                            <Col>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th className="sl-no">Sl No.</th>
                                                            <th>Items</th>
                                                            <th><strong>Quantity</strong></th>
                                                            <th><strong>Price</strong></th>
                                                            <th><strong>Amount</strong></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {invoice.items.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className="text-center">{index + 1}</td>
                                                                <td>{item.description}</td>
                                                                <td className="text-end">{item.quantity}</td>
                                                                <td className="text-end">{item.price}</td>
                                                                <td className="text-end">{item.amount}</td>
                                                            </tr>
                                                        ))}
                                                        <tr>
                                                            <td colSpan={3}></td>
                                                            <td><strong>Total:</strong></td>
                                                            <td className="text-end"><strong><u>{invoice.total}</u></strong></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={3}></td>
                                                            <td><strong>Prepaid:</strong></td>
                                                            <td className="text-end"><strong>{invoice.prepaid}</strong></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={3}></td>
                                                            <td><strong>Balance:</strong></td>
                                                            <td className="text-end"><strong>{invoice.balance}</strong></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={3}></td>
                                                            <td><strong>Delivery:</strong></td>
                                                            <td className="text-end delivery-date"><strong>{invoice.delivery}</strong></td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <p>No invoice found.</p>
                                )}
                            </div>
                            <Button variant="info" className="d-flex align-items-center gap-2 ms-auto btn-lg me-4" onClick={exportPDF}>
                                <FaFilePdf /> <span>Download PDF</span>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Layout>
    );
};

export default PreviewPage;
