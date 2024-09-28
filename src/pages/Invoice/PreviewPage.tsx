import { useState, useEffect, useRef } from 'react';
import { jsPDF } from "jspdf";
import companyLogo from '/company-logo.png';
import 'react-quill/dist/quill.snow.css';
import { PrivateAPI } from '../../helper/api';
import Layout from '../../components/Layout/Layout';
import CommonBanner from '../../components/Banner/CommonBanner';
import { FaFilePdf } from 'react-icons/fa';

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

                const response = await PrivateAPI.get(`/invoice/${userId}`);
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
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12">
                            <div id="tablePdf" className="invoice-container">
                                <div className="invoice-header">
                                    <div className="logo-container">
                                        <img src={companyLogo} alt="Company Logo" />
                                    </div>
                                    <div className="company-address">
                                        <ul>
                                            <li>
                                                <strong>Phone:</strong> +9613661122 &nbsp;
                                                <strong>Email:</strong> info@digitaldecoderltd.com
                                            </li>
                                            <li>
                                                <strong>Address:</strong> E-9/6, China Town Naya Paltan, Dhaka - 1000, Bangladesh
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {isLoading ? (
                                    <p>Loading...</p>
                                ) : invoice ? (
                                    <>
                                        <div className="customer-info">
                                            <div className="info-item">
                                                <p><strong>Customer's Name:</strong></p>
                                                <p className="customer-name">{invoice.customerName}</p>
                                            </div>
                                            <div className="info-item">
                                                <p><strong>Date:</strong></p>
                                                <p className="date">{invoice.date.slice(0, 10)}</p>
                                            </div>
                                        </div>
                                        <div className="customer-info">
                                            <div className="info-item">
                                                <p><strong>Address:</strong></p>
                                                <p className="address">{invoice.customerAddress}</p>
                                            </div>
                                            <div className="info-item">
                                                <p><strong>Phone:</strong></p>
                                                <p className="phone">{invoice.customerPhone}</p>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="customer-details">
                                            <div className="details-item">
                                                <p><strong>Invoice Details:</strong></p>
                                                <p ref={invoiceDetailsRef}></p>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="invoice-table">
                                            <div className="table-wrap">
                                                <table className="table">
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
                                                                <td className='text-end'>{item.quantity}</td>
                                                                <td className='text-end'>{item.price}</td>
                                                                <td className='text-end'>{item.amount}</td>
                                                            </tr>
                                                        ))}
                                                        <tr>
                                                            <td colSpan={3}></td>
                                                            <td><strong>Total:</strong></td>
                                                            <td colSpan={2} className="text-end"><strong><u>{invoice.total}</u></strong></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={3}></td>
                                                            <td><strong>Prepaid:</strong></td>
                                                            <td colSpan={2} className="text-end"><strong>{invoice.prepaid}</strong></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={3}></td>
                                                            <td><strong>Balance:</strong></td>
                                                            <td colSpan={2} className="text-end"><strong>{invoice.balance}</strong></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={3}></td>
                                                            <td><strong>Delivery:</strong></td>
                                                            <td colSpan={3} className="text-end delivery-date"><strong>{invoice.delivery}</strong></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <p>No invoice found.</p>
                                )}
                            </div>
                            <button className='btn btn-info d-flex align-items-center gap-2 ms-auto btn-lg me-4' onClick={exportPDF}>
                                <FaFilePdf /> <span>Download PDF</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default PreviewPage;
