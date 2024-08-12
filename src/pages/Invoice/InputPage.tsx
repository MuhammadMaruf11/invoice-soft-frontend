import { useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { PrivateAPI, PublicAPI } from '../../helper/api';
import Layout from '../../components/Layout/Layout';
import CommonBanner from '../../components/Banner/CommonBanner';

// global variables 
const userToken = localStorage.getItem('userToken');
const onetimeAccess = localStorage.getItem('onetimeaccess');

const InputPage = () => {


    const currentDate = new Date().toISOString().split('T')[0];

    const navigate = useNavigate();


    // useEffect(() => {
    //     if (userToken) {
    //         localStorage.removeItem('onetimeaccess')
    //     } else if (onetimeAccess && !userToken) {
    //         // Redirect to the registration page if onetimeaccess is true
    //         navigate('/user/register');
    //     }
    // }, [navigate]);

    const [customerData, setCustomerData] = useState({
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        date: currentDate,
        invoiceDetails: '',
        items: [{
            description: '',
            quantity: 1,
            price: '',
            amount: 0,
        }],
        total: 0,
        prepaid: 0,
        balance: 0,
        delivery: ''
    });

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link"],
            // ["link", "image", "video"],
        ],
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCustomerData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleModelChange = (event) => {
        setCustomerData(prevData => ({
            ...prevData,
            invoiceDetails: event
        }));
    }

    const handleItemChange = (index: number, field: string, value: string | number) => {
        setCustomerData(prevData => {
            const updatedItems = [...prevData.items];

            let amountItem = 0.00;
            if (field === 'quantity')
                amountItem = value * updatedItems[index]?.price;
            else if (field === 'price')
                amountItem = updatedItems[index]?.quantity * value;
            else {
                amountItem = updatedItems[index]?.quantity * updatedItems[index]?.price;
            }

            const updatedItem = {
                ...updatedItems[index],
                [field]: value,
                amount: parseFloat(amountItem).toFixed(2),
            };

            updatedItems[index] = updatedItem;

            const subtotalAmount = updatedItems.reduce(
                (acc, item) => Number(acc) + Number(item.quantity * item.price),
                0
            );

            const balanceAmount = subtotalAmount - prevData.prepaid;

            return {
                ...prevData,
                items: updatedItems,
                total: parseFloat(subtotalAmount).toFixed(2),
                balance: parseFloat(balanceAmount).toFixed(2),
            };
        });

    };

    const handleChangeAmount = (e) => {
        const { name, value } = e.target;

        setCustomerData(prevData => {
            const updatedItems = [...prevData.items];
            let updatedPrepaid = prevData.prepaid;
            let updatedBalance = prevData.balance;

            if (name === 'prepaid') {
                updatedPrepaid = parseFloat(value);
            }

            const subtotalAmount = updatedItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
            );

            updatedBalance = subtotalAmount - updatedPrepaid;

            return {
                ...prevData,
                prepaid: updatedPrepaid,
                balance: parseFloat(updatedBalance).toFixed(2),
            };
        });
    };

    const handleAddItem = () => {
        setCustomerData(prevData => ({
            ...prevData,
            items: [...prevData.items, {
                description: '',
                quantity: 1,
                price: '',
                amount: 0,
            }],
        }));
    };

    const handleRemoveItem = (index: number) => {
        setCustomerData(prevData => {
            const updatedItems = [...prevData.items];
            updatedItems.splice(index, 1);

            const subtotalAmount = updatedItems.reduce(
                (acc, item) => Number(acc) + Number(item.quantity * item.price),
                0
            );

            const balanceAmount = subtotalAmount - prevData.prepaid;

            return {
                ...prevData,
                items: updatedItems,
                total: parseFloat(subtotalAmount).toFixed(2),
                balance: parseFloat(balanceAmount).toFixed(2),
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Here, you can use Axios or any other library to make an HTTP request
            await PublicAPI.post('/free-trial', customerData);
            // await PrivateAPI.post('/invoice', customerData);

            // if (!userToken) {
            //     // If userToken is not found and user is not found, set one-time access
            //     localStorage.setItem('onetimeaccess', 'true');
            //     console.log('One-time access granted');
            // } else if (userToken) {
            //     // If userToken is found and user is found, remove one-time access if it exists
            //     if (localStorage.getItem('onetimeaccess')) {
            //         localStorage.removeItem('onetimeaccess');
            //         console.log('One-time access removed');
            //     }
            // }

            if (!onetimeAccess) {
                localStorage.setItem('onetimeaccess', 'true');
                console.log('One-time access granted');
            }


            setCustomerData({
                customerName: '',
                customerAddress: '',
                customerPhone: '',
                invoiceDetails: '',
                date: currentDate,
                items: [{
                    description: '',
                    quantity: 1,
                    price: '',
                    amount: 0,
                }],
                total: 0,
                prepaid: 0,
                balance: 0,
                delivery: ''
            })
            setTimeout(() => {
                window.open("/invoice/preview", '_self');
            }, 1500);
        } catch (error) {
            console.error("error " + error);
        }
    };

    console.log('customerData', customerData);

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
                                <p>To create unlimited invoices, please visit your <Link className='text-theme fw-bold' to='/user'>PROFILE</Link> and click the <u className='text-theme fw-bold'>'Unlimited Access'</u> button.</p>
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
