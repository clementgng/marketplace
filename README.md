Basic marketplace app

# Buyer/Seller Marketplace REST website design using Javascript

## Project Description:
This project uses the REST Javascript frameworks React&Express using NodeJS for building a website used for :
- Creating users as buyers or sellers
- Creating items to sell as a seller
- Buying items as a buyer
- Listing the order history for a specific buyer

![alt text](https://github.com/clementgng/marketplace/blob/main/Images/OrderHistory.png "Order_History")

## Project Setup
Copy the required files in a directory. Then use the following steps to setup the project:

1. Install NodeJS
2. Create .env file and specifiy the envirnoment variables below
```
PORT: the port to run the NodeJS server

MONGO_URL: URL of the MongoDB server to connect to.

JWT_SECRET: JWT secret key

JWT_LIFETIME: Lifetime of the JsonWebToken
```
3. cd client/
4. npm install && npm start
5. cd server/
6. npm install && npm start
7. Finally, test the project using - http://127.0.0.1:3000

