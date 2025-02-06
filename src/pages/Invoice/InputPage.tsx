import { useState } from 'react';
import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { PublicAPI } from '../../helper/api';
import Layout from '../../components/Layout/Layout';
import CommonBanner from '../../components/Banner/CommonBanner';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { Form, Button, Table, Container, Row, Col } from 'react-bootstrap';
import { apiList } from '../../helper/apiList';

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


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            await PublicAPI.post(apiList.FREE_TRIAL, customerData);

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
            <section className="input-page-area">
                <Container>
                    {!onetimeAccess ? (
                        <Row>
                            <Col md={12}>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId='customerName'>
                                                <Form.Label>Customer's Name <span className='text-danger'>*</span></Form.Label>
                                                <Form.Control type='text' name='customerName' value={customerData.customerName} onChange={handleChange} required />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId='customerDate'>
                                                <Form.Label>Date <span className='text-danger'>*</span></Form.Label>
                                                <Form.Control type='date' name='date' value={customerData.date || currentDate} onChange={handleChange} required max={new Date().toISOString().split("T")[0]} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className='mt-3'>
                                        <Col md={6}>
                                            <Form.Group controlId='customerAddress'>
                                                <Form.Label>Customer Address <span className='text-danger'>*</span></Form.Label>
                                                <Form.Control type='text' name='customerAddress' value={customerData.customerAddress} onChange={handleChange} required />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId='customerPhone'>
                                                <Form.Label>Customer Phone <span className='text-danger'>*</span></Form.Label>
                                                <Form.Control type='tel' name='customerPhone' value={customerData.customerPhone} onChange={handleChange} required />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group controlId='invoiceDetails' className='mt-3'>
                                        <Form.Label>Invoice Details</Form.Label>
                                        <ReactQuill className='editor-input' placeholder={'Write something...'} theme='snow' value={customerData.invoiceDetails} onChange={handleModelChange} modules={modules} />
                                    </Form.Group>
                                    <Table striped bordered hover responsive className='mt-3'>
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th className='w-50'>Items</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customerData?.items?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td className='w-50'><Form.Control type='text' value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} /></td>
                                                    <td><Form.Control type='number' value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))} /></td>
                                                    <td><Form.Control type='number' value={item.price} onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))} /></td>
                                                    <td><Form.Control type='number' value={item.amount} readOnly /></td>
                                                    <td>
                                                        <Button variant='primary' className='me-1' onClick={handleAddItem}><FaPlusCircle /></Button>
                                                        {index > 0 && (<Button variant='danger' onClick={() => handleRemoveItem(index)}><FaMinusCircle /></Button>)}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td colSpan={2}></td>
                                                <td><strong>Total :</strong></td>
                                                <td colSpan={2}><Form.Control type='number' name='total' value={customerData.total} readOnly /></td>
                                                <td rowSpan={4}><Button variant='success' type='submit'>Submit</Button></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}></td>
                                                <td><strong>Prepaid :</strong></td>
                                                <td colSpan={2}><Form.Control type='number' name='prepaid' value={customerData.prepaid} onChange={handleChangeAmount} /></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}></td>
                                                <td><strong>Balance :</strong></td>
                                                <td colSpan={2}><Form.Control type='number' name='balance' value={customerData.balance} readOnly /></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}></td>
                                                <td><strong>Delivery :</strong></td>
                                                <td colSpan={2}><Form.Control type='date' name='delivery' value={customerData.delivery} onChange={handleChange} /></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Form>
                            </Col>
                        </Row>
                    ) : userToken && onetimeAccess ? (
                        <Row className='text-center'>
                            <Col md={12}>
                                <h2 className='text-danger'>Your one-time access has already been used!</h2>
                                <p>To create unlimited invoices, please visit your <Link className='text-theme fw-bold' to='/user'>PROFILE</Link> and click the <span className='text-theme fw-bold'>'Unlimited Invoice'</span> button.</p>
                            </Col>
                        </Row>
                    ) : !userToken && onetimeAccess ? (
                        <Row className='text-center'>
                            <Col md={12}>
                                <h2 className='text-danger'>Your one-time access has been used!</h2>
                                <p>Please <Link className='text-theme fw-bold' to='/user/register'>REGISTER</Link> to unlock unlimited access.</p>
                            </Col>
                        </Row>
                    ) : null}
                </Container>
            </section>

        </Layout>
    );
}

export default InputPage;
