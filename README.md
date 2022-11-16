# Wallet-System

## Tools/ Technologies used:
### Backend: TypeScript, ExpressJs, MongoDB, Mongoose (ORM)
### Frontend: JavaScript, ReactJs.

## Setting-up
### Frontend:

To Run:
```bash
npm run start
```
To Deploy:
```bash
npm run build
pm2 serve build/ 80 --spa
```

### Backend:

To Run:
```bash
npm run dev
```
To Deploy:
```bash
npm run deploy:dev
```





## Frontend:
A basic wallet project with the following features.
1. User can join the system with an initial balance(default balance is 20) & name.
2. Username & balance is shown on login.
3. User can credit debit amount.
4. The transaction history on the home page with pagination & table sorting features.
5. The transaction history can be exported in "CSV" file.
6. Session is maintained with help of localStorage in frontend.

## Backend:
Total 4 APIs as following:
### 1. POST - /wallet/setup.
#### Request:
```
{
    "name": "jack",
    "balance": 1200.98642468
}
```
#### Response:
```
{
    "data": {
        "name": "omnamahshivaya1",
        "balance": 1200.9864,
        "_id": "6372721bb383e9dd20b75b22",
        "createdAt": "2022-11-14T16:51:39.060Z",
        "updatedAt": "2022-11-14T16:51:39.060Z",
        "__v": 0,
        "id": "6372721bb383e9dd20b75b22"
    },
    "message": "Wallet setup successful !"
}
```

### 2. GET - /wallet/:walletID.
#### Request:
```
{
    "name": "jack",
    "balance": 1200.98642468
}
```
#### Response:
```
{
    "data": {
        "_id": "6370e6dd4cf84ace5f2031c6",
        "name": "jack",
        "balance": 1305.4254,
        "createdAt": "2022-11-13T12:45:17.890Z",
        "updatedAt": "2022-11-14T16:31:30.159Z",
        "__v": 0,
        "id": "6370e6dd4cf84ace5f2031c6"
    },
    "message": "Wallet found !"
}
```

### 3. POST - /wallet/transact/:walletID
#### Request:
```
{
    "amount": -0.0110,
    "description": "shop1-paytm"
}
```
#### Response:
```
{
    "data": {
        "_id": "6370e6dd4cf84ace5f2031c6",
        "name": "jack",
        "balance": 1200.4254,
        "createdAt": "2022-11-13T12:45:17.890Z",
        "updatedAt": "2022-11-14T14:12:13.035Z",
        "__v": 0,
        "id": "6370e6dd4cf84ace5f2031c6"
    },
    "message": "Transaction done !"
}
```

### 4. GET - /transactions?wallet_id=walletID&skip=0&limit=100
#### Request:
```
{
    "amount": -0.0110,
    "description": "shop1-paytm"
}
```
#### Response:
```
{
    "data": {
        "transactions": [
            {
                "_id": "6370e6dd4cf84ace5f2031c8",
                "wallet_id": "6370e6dd4cf84ace5f2031c6",
                "amount": 1200.9864,
                "balance": 1200.9864,
                "description": "Transaction added on wallet setup",
                "type": "Credit",
                "createdAt": "2022-11-13T12:45:17.954Z",
                "updatedAt": "2022-11-13T12:45:17.954Z",
                "__v": 0,
                "id": "6370e6dd4cf84ace5f2031c8"
            },
            {
                "_id": "6370e6eb4cf84ace5f2031d5",
                "wallet_id": "6370e6dd4cf84ace5f2031c6",
                "amount": -0.011,
                "balance": 1200.9534,
                "description": "shop1-paytm",
                "type": "Debit",
                "createdAt": "2022-11-13T12:45:31.202Z",
                "updatedAt": "2022-11-13T12:45:31.202Z",
                "__v": 0,
                "id": "6370e6eb4cf84ace5f2031d5"
            }
        ],
        "transactionsCount": 2
    }
}
```