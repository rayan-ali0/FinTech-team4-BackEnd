import { getTransactions, getTransactionByIdUser, createTransaction , updateTransaction, getLastTransactions} from "../controllers/Transaction.js";
import  express  from "express";

 const transactionRouter= express.Router()

 transactionRouter.get('/read/transactions',getTransactions);
 transactionRouter.get('/read/transaction/byId',getTransactionByIdUser);
 transactionRouter.get('/read/lastTransaction',getLastTransactions);
 transactionRouter.post('/create/transaction', createTransaction);
 transactionRouter.put('/update/transaction',updateTransaction)

 export default transactionRouter