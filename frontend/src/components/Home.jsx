import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Nav, Row, Col, Container, Card, Form, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
const { ExportCSVButton } = CSVExport;

const transactionsTableColumns = [
    {
        dataField: 'amount',
        text: 'Amount',
        sort: true
    },
    {
        dataField: 'balance',
        text: 'Balance',
        sort: true
    },
    {
        dataField: 'description',
        text: 'Description',
        sort: false
    },
    {
        dataField: 'type',
        text: 'Type',
        sort: false
    },
    {
        dataField: 'createdAt',
        text: 'Date',
        sort: true
    }
];

function Home() {
    const [transactions, setTransactions] = useState([]);
    const [transactionPage, setPage] = useState(1);
    const [sizePerPageState, setSizePerPage] = useState(10);
    const [totalSize, settotalSize] = useState(0);
    const [transactionLimit, setTransactionLimit] = useState(10);
    const [skipTransactions, setSkipTransactions] = useState(0);
    const [userName, setUserName] = useState('');
    const [userBalance, setUserBalance] = useState('');
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState('credit');
    const [transactionDescription, setDescription] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const hasMounted = useRef(false);
    const host = `http://localhost:3000`;

    const getTransactions = async () => {
        return axios.get(`${host}/transactions?wallet_id=${localStorage.getItem('wallet_id')}&skip=${skipTransactions}&limit=${transactionLimit}`);
    }

    const getWallet = async () => {
        return axios.get(`${host}/wallet/${localStorage.getItem('wallet_id')}`);
    }

    const doTransaction = async () => {
        const body = {
            "amount": transactionType === 'credit' ? Number(transactionAmount) : Number(transactionAmount) * -1,
            "description": transactionDescription
        };
        await axios.post(`${host}/wallet/transact/${localStorage.getItem('wallet_id')}`, body).then(() => setShowAlert(true));
        const [wallet, transactions] = await Promise.all([
            getWallet(),
            getTransactions()
        ]);
        setUserName(wallet.data.data.name);
        setUserBalance(wallet.data.data.balance);
        setTransactions(transactions.data.data.transactions);
    }

    const onTableChange = (type, { page, sizePerPage, filters, sortField, sortOrder, cellEdit }) => {
        console.log(type, { page, sizePerPage, filters, sortField, sortOrder, cellEdit });
        if (type === "pagination") {
            if (sizePerPage !== sizePerPageState) {
                setSizePerPage(sizePerPage);
                setSkipTransactions(transactionPage - 1 * sizePerPage);
                setTransactionLimit(sizePerPage);
            }
            if (page !== transactionPage) {
                if (page < transactionPage) setSkipTransactions(page - 1 * sizePerPageState);
                else setSkipTransactions(transactionPage * sizePerPageState);
                setPage(page);
            }
        } else if (type === "sort") {
            if (sortField === "amount") {
                let transac;
                if (sortOrder === "desc") {
                    transac = transactions.sort((a, b) => b.amount - a.amount);
                    setTransactions(transac);
                } else if (sortOrder === "asc") {
                    transac = transactions.sort((a, b) => a.amount - b.amount);
                    setTransactions(transac);
                }
            } else if (sortField === "balance") {
                let transac;
                if (sortOrder === "desc") {
                    transac = transactions.sort((a, b) => b.balance - a.balance);
                    setTransactions(transac);
                } else if (sortOrder === "asc") {
                    transac = transactions.sort((a, b) => a.balance - b.balance);
                    setTransactions(transac);
                }
            } else if (sortField === "createdAt") {
                let transac;
                if (sortOrder === "desc") {
                    transac = transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setTransactions(transac);
                } else if (sortOrder === "asc") {
                    transac = transactions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    setTransactions(transac);
                }
            }
        }
    }

    useEffect(() => {
        if (!hasMounted.current) return;
        console.log('data.data.data: ', sizePerPageState, transactionPage);
        getTransactions().then((data) => {
            setTransactions(data.data.data.transactions);
        });
    }, [skipTransactions, transactionLimit]);

    const onDataSizeChange = (...a) => {
        console.log('datasizechanged: ', a);
    }


    useEffect(() => {
        if (!hasMounted.current) {
            getTransactions().then((data) => {
                setTransactions(data.data.data.transactions);
                setSizePerPage(data.data.data.transactions.length);
                settotalSize(data.data.data.transactionsCount)
            });
            getWallet().then((data) => {
                setUserName(data.data.data.name);
                setUserBalance(data.data.data.balance);
            });
            hasMounted.current = true;
        } else {
            // do componentDidUpdate logic
        }
    });

    return (
        <Container fluid>
            <Row className='mt-3'>
                <Col md={4}>
                    <Nav className="d-md-block bg-light sidebar">
                        <Nav.Item className='p-3'>
                            <small>Username: {userName}</small><br />
                            <small>Balance: {userBalance}</small>
                        </Nav.Item>
                        <Nav.Item className="m-3">
                            <Card>
                                <Card.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBalance">
                                            <Form.Label>Balance</Form.Label>
                                            <Form.Control required type="number" placeholder="Balance" onChange={(e) => setTransactionAmount(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formDesc">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control required type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formType">
                                            <Form.Label>Type</Form.Label>
                                            <Form.Select defaultValue={transactionType} aria-label="Transaction Type" onChange={(e) => setTransactionType(e.target.value)}>
                                                <option value="credit">Credit</option>
                                                <option value="debit">Debit</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Button onClick={doTransaction}>Submit</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col md={8}>
                    <ToolkitProvider
                        keyField="_id"
                        data={transactions}
                        columns={transactionsTableColumns}
                        exportCSV={{
                            fileName: 'custom.csv',
                            separator: '|',
                            ignoreHeader: true,
                            noAutoBOM: false,
                            blobType: 'text/csv;charset=ansi'
                        }}
                    >
                        {
                            props => (
                                <div>
                                    <div className='d-flex justify-content-between'>
                                        <h4>Transactions</h4>
                                        <ExportCSVButton {...props.csvProps} className='btn btn-primary'>Export CSV!!</ExportCSVButton>
                                    </div>
                                    <hr />
                                    <BootstrapTable
                                        {...props.baseProps}
                                        pagination={paginationFactory({ page: transactionPage, sizePerPage: sizePerPageState, totalSize })}
                                        remote={{ sort: true, pagination: true }}
                                        onTableChange={onTableChange}
                                        onDataSizeChange={() => onDataSizeChange()}
                                        bootstrap4
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </Col>
            </Row >
        </Container>
    )
}

export default Home;