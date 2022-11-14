import React, { useState } from 'react';
import {
    Row,
    Form,
    Button,
    Card
}
    from 'react-bootstrap';
import axios from 'axios';

function SetupWallet() {
    const [username, setUsername] = useState('');
    const [amount, setAmount] = useState(20);

    const host = `http://localhost:3000`;

    const setupWallet = async () => {
        const body = {
            "name": username,
            "balance": amount
        }
        await axios.post(`${host}/wallet/setup`, body).then((data) => {
            localStorage.setItem('wallet_id', data.data.data.id);
            window.location = window.location.href;
        });
    }

    return (
        <Row className="justify-content-md-center align-item-md -center" style={{ alignItems: 'center', height: '80vh' }}>
            <Card className="mt-3" style={{ width: '21rem', height: '16rem', margin: '0 auto' }}>
                <Form className="m-3">
                    <Form.Group className="mb-3" controlId="usernameInput">
                        <Form.Label>Username</Form.Label>
                        <Form.Control min={0.0001} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="balanceInput">
                        <Form.Label>Balance (Optional)</Form.Label>
                        <Form.Control type="number" placeholder="Enter balance" onChange={(e) => setAmount(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" onClick={setupWallet}>
                        Create Wallet
                    </Button>
                </Form>
            </Card>
        </Row>
    );
}

export default SetupWallet;