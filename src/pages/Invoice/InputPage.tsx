import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { PrivateAPI, PublicAPI } from '../../helper/api';
import Layout from '../../components/Layout/Layout';
import CommonBanner from '../../components/Banner/CommonBanner';

// Define types for customer data and invoice items
interface InvoiceItem {
    description: string;
    quantity: number;
    price: number;
    amount: number;
}

interface CustomerData {
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    date: string;
    invoiceDetails: string;
    userId: string;
    items: InvoiceItem[];
    total: number;
    prepaid: number;
    balance: number;
    delivery: string;
}

// Get values from localStorage with default fallback
const userToken = localStorage.getItem('userToken') || '';
const onetimeAccess = localStorage.getItem('onetimeaccess') || '';

const InputPage = () => {
    const currentDate = new Date().toISOString().split('T')[0];


    const [customerData, setCustomerData] = useState<CustomerData>({
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        date: currentDate,
        invoiceDetails: '',
        userId: "",
        items: [{
            description: '',
            quantity: 1,
            price: 0,
            amount: 0,
        }],
        total: 0,
        prepaid: 0,
        balance: 0,
        delivery: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await PrivateAPI.get('/backend');
                const data = response.data.user;
                setCustomerData(prevState => ({
                    ...prevState,
                    userId: data.id // Update only the userId
                }));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCustomerData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleModelChange = (value: string) => {
        setCustomerData(prevData => ({
            ...prevData,
            invoiceDetails: value
        }));
    };

    const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
        setCustomerData(prevData => {
            const updatedItems = [...prevData.items];
            const updatedItem = { ...updatedItems[index], [field]: value };

            let amount = 0;
            if (field === 'quantity') amount = Number(value) * updatedItem.price;
            if (field === 'price') amount = updatedItem.quantity * Number(value);

            updatedItem.amount = parseFloat(amount.toString());

            updatedItems[index] = updatedItem;

            const total = updatedItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
            const balance = total - prevData.prepaid;

            return {
                ...prevData,
                items: updatedItems,
                total: parseFloat(total.toString()),
                balance: parseFloat(balance.toString())
            };
        });
    };

    const handleAddItem = () => {
        setCustomerData(prevData => ({
            ...prevData,
            items: [
                ...prevData.items,
                { description: '', quantity: 1, price: 0, amount: 0 }
            ]
        }));
    };

    const handleRemoveItem = (index: number) => {
        setCustomerData(prevData => {
            const updatedItems = [...prevData.items];
            updatedItems.splice(index, 1);

            const total = updatedItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
            const balance = total - prevData.prepaid;

            return {
                ...prevData,
                items: updatedItems,
                total: parseFloat(total.toString()),
                balance: parseFloat(balance.toString())
            };
        });
    };

    const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerData(prevData => {
            const total = prevData.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
            const prepaid = name === 'prepaid' ? parseFloat(value) : prevData.prepaid;
            const balance = total - prepaid;

            return {
                ...prevData,
                prepaid,
                balance: parseFloat(balance.toString())
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await PublicAPI.post('/free-trial', customerData);

            if (!onetimeAccess) {
                localStorage.setItem('onetimeaccess', 'true');
                console.log('One-time access granted');
            }

            setCustomerData({
                userId: '',
                customerName: '',
                customerAddress: '',
                customerPhone: '',
                invoiceDetails: '',
                date: currentDate,
                items: [{ description: '', quantity: 1, price: 0, amount: 0 }],
                total: 0,
                prepaid: 0,
                balance: 0,
                delivery: ''
            });

            setTimeout(() => {
                window.open('/invoice/preview', '_self')
            }, 1500);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link"]
        ],
    };
    return (
        <Layout>
            <CommonBanner bannerTitle='Invoice Input Page' />
            {!onetimeAccess ? <section className='input-page-area'>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form onSubmit={handleSubmit}>
                                <div className="customer-info">
                                    <div className="info-item">
                                        <label htmlFor="customerName">
                                            Customer's Name <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input type="text"
                                            id='customerName'
                                            name="customerName"
                                            value={customerData.customerName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="info-item">
                                        <label htmlFor="customerDate">
                                            Date <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input type="date"
                                            id='customerDate'
                                            name="date"
                                            value={customerData.date || currentDate}
                                            onChange={handleChange}
                                            required
                                            max={new Date().toISOString().split("T")[0]}
                                        />
                                    </div>
                                </div>
                                <div className="customer-details">
                                    <div className="details-item">
                                        <label htmlFor="customerAddress">
                                            Customer Address <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input type="text"
                                            id='customerAddress'
                                            name="customerAddress"
                                            value={customerData.customerAddress}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>
                                    <div className="details-item">
                                        <label htmlFor="customerPhone">
                                            Customer Phone <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input type="tel"
                                            id='customerPhone'
                                            name="customerPhone"
                                            value={customerData.customerPhone}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>
                                </div>
                                <div className="invoice-details">
                                    <div className="">
                                        <label htmlFor="invoiceDetails">
                                            Invoice Details
                                        </label>
                                        <ReactQuill className='editor-input' placeholder={"Write something..."} theme="snow" value={customerData.invoiceDetails} onChange={handleModelChange} modules={modules} />
                                    </div>
                                </div>
                                <br />
                                <div className="invoice-table">
                                    <div className="table-wrap">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th >
                                                        No.
                                                    </th>
                                                    <th style={{ width: "60%" }}>Items</th>
                                                    <th style={{ width: "10%" }}>
                                                        <strong>Quantity</strong>
                                                    </th>
                                                    <th style={{ width: "10%" }}>
                                                        <strong>Price</strong>
                                                    </th>
                                                    <th style={{ width: "10%" }}>
                                                        <strong>Amount</strong>
                                                    </th>
                                                    <th style={{ width: "10%" }}>
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {customerData?.items?.map((item, index: number) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="sl-no-style">
                                                                {index + 1}
                                                            </td>
                                                            <td>
                                                                <input type="text"
                                                                    value={item.description}
                                                                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input style={{ textAlign: 'end' }}
                                                                    type="number"
                                                                    value={item.quantity}
                                                                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input style={{ textAlign: 'end' }}
                                                                    type="number"
                                                                    value={item.price}
                                                                    onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input style={{ textAlign: 'end' }}
                                                                    type="number"
                                                                    value={item.amount}
                                                                    readOnly />
                                                            </td>
                                                            <td>
                                                                <button type="button" className='btn-add' onClick={handleAddItem}>Add </button>
                                                                {index > 0 && (<button type="button" className='btn-dlt' onClick={() => handleRemoveItem(index)}>Dlt</button>)}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                <tr>
                                                    <td colSpan={2}></td>
                                                    <td><strong>Total :</strong></td>
                                                    <td colSpan={2} className="text-right">
                                                        <input style={{ textAlign: 'end' }}
                                                            type="number"
                                                            name="total"
                                                            value={customerData.total}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td rowSpan={4}> <button type="submit">Submit</button></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}></td>
                                                    <td><strong>Prepaid :</strong></td>
                                                    <td colSpan={2} className="text-right">
                                                        <input style={{ textAlign: 'end' }}
                                                            type="number"
                                                            name="prepaid"
                                                            value={customerData.prepaid}
                                                            onChange={handleChangeAmount}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}></td>
                                                    <td><strong>Balance :</strong></td>
                                                    <td colSpan={2} className="text-right">
                                                        <input style={{ textAlign: 'end' }}
                                                            type="number"
                                                            name="balance"
                                                            value={customerData.balance}
                                                            readOnly
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} ></td>
                                                    <td><strong>Delivery :</strong></td>
                                                    <td colSpan={2} className="text-right">
                                                        <input type="date"
                                                            name="delivery"
                                                            value={customerData.delivery}
                                                            onChange={handleChange}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section> : userToken && onetimeAccess ?
                <section className='input-page-area'>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h2 className='mb-4 text-danger'>Your one-time access has already been used!</h2>
                                <p>To create unlimited invoices, please visit your <Link className='text-theme fw-bold' to='/user'>PROFILE</Link> and click the <u className='text-theme fw-bold'>'Unlimited Invoice'</u> button.</p>
                            </div>
                        </div>
                    </div>
                </section>
                : !userToken && onetimeAccess ? <section className='input-page-area'>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h2 className='mb-4 text-danger'>Your one-time access has been used!</h2>
                                <p>Please <Link className='text-theme fw-bold' to='/user/register'>REGISTER</Link> to unlock unlimited access.</p>
                            </div>
                        </div>
                    </div>
                </section>
                    : <section className='input-page-area'>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                </div>
                            </div>
                        </div>
                    </section>
            }
        </Layout>
    );
}

export default InputPage;
