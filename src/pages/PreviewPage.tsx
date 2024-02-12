import { useState, useEffect } from 'react';
import API from '../helper/api';
import { jsPDF } from "jspdf";
import companyLogo from '/company-logo.png'

interface Invoice {
    customerName: string;
    date: string;
    customerAddress: string;
    customerPhone: string;
    items: Item[];
    // Add other properties as needed
}

interface Item {
    description: string;
    quantity: number;
    price: number;
    amount: number;
    // Add other properties as needed
}

const PreviewPage = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const fetchInvoices = async () => {
            try {
                const response = await API.get('/getInvoice'); // adjust URL based on your backend setup
                const data = response.data[response.data.length - 1]
                setInvoices(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                // handle error here, e.g., display an error message to the user
            }
        };

        fetchInvoices();
    }, []);


    const exportPDF = () => {
        // Landscape export, 2×4 inches
        const doc = new jsPDF({ format: 'a4', orientation: 'landscape' });
        const tablePdf = document.querySelector("#tablePdf");

        doc.html(tablePdf, {
            callback: function (doc) {
                // Add image after rendering the HTML

                doc.save(`invoice.pdf`);
            },
            margin: [4, 4, 4, 4],
            autoPaging: "slice",
            x: 0,
            y: 0,
            width: 140, // Target width in the PDF document
            windowWidth: 813, // Window width in CSS pixels
        });
    };

    return (
        <>
            <div id="tablePdf" className="invoice-container">
                <div className="invoice-header">
                    <div className="logo-container">
                        <img src={companyLogo} alt="logo" />
                    </div>
                    <div className="company-address">
                        <ul>
                            <li>
                                <strong>Phone: </strong>+9613661122 &nbsp;
                                <strong>Email: </strong>info@digitaldecoderltd.com
                            </li>
                            <li>
                                <strong>Address: </strong>E-9/6, China Town Naya Paltan, Dhaka - 1000, Bangladesh
                            </li>
                        </ul>
                    </div>
                </div>
                {isLoading ? 'Loading...' :
                    <>
                        <div className="customer-info">
                            <div className="info-item">
                                <p>
                                    <strong>Customer's Name :</strong>
                                </p>
                                <p className="customer-name">
                                    {invoices?.customerName}
                                </p>
                            </div>
                            <div className="info-item">
                                <p>
                                    <strong> Date :</strong>
                                </p>
                                <p className="date">
                                    {invoices?.date && invoices?.date.slice(0, 10)}
                                </p>
                            </div>
                        </div>
                        <div className="customer-details">
                            <div className="details-item">
                                <p>
                                    <strong>Address :</strong>
                                </p>
                                <p className="address">
                                    {invoices?.customerAddress}
                                </p>
                            </div>
                            <div className="details-item">
                                <p>
                                    <strong> Phone :</strong>
                                </p>
                                <p className="phone">
                                    {invoices?.customerPhone}
                                </p>
                            </div>
                        </div>
                        <div className="invoice-table">
                            <div className="table-wrap">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="sl-no">
                                                Sl No.
                                            </th>
                                            <th>Items</th>
                                            <th>
                                                <strong>Quantity</strong>
                                            </th>
                                            <th>
                                                <strong>Price</strong>
                                            </th>
                                            <th>
                                                <strong>Amount</strong>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.from({ length: Math.max(18, invoices?.items?.length || 0) }).map((_, index: number) => {
                                                const item = invoices?.items?.[index];
                                            return (
                                                <tr key={index}>
                                                    <td className="sl-no-style">{index + 1}</td>
                                                    <td>{item?.description}</td>
                                                    <td>{item?.quantity}</td>
                                                    <td>{item?.price}</td>
                                                    <td>{item?.amount}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <td colSpan={2}></td>
                                            <td><strong>Total :</strong></td>
                                            <td colSpan={2} className="text-right"><strong><u>{invoices?.total}</u></strong></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}></td>
                                            <td><strong>Prepaid :</strong></td>
                                            <td colSpan={2} className="text-right"><strong>{invoices?.prepaid}</strong></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}></td>
                                            <td><strong>Balance :</strong></td>
                                            <td colSpan={2} className="text-right"> <strong>  {invoices?.balance}</strong></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}></td>
                                            <td><strong>Delivery :</strong></td>
                                            <td colSpan={3} className="text-right" style={{ color: '#00d100' }}>  <strong> {invoices?.delivery}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>}

            </div>
            <button style={{ marginLeft: 'auto', display: 'flex', marginTop: "20px" }} onClick={exportPDF}>pdf</button>
        </>
    );
};


export default PreviewPage;
