import { getTransactions, getTransactionByIdUser, createTransaction , updateTransaction, getLastTransactions,getPendingLastTransactions,getUserOutcome,getUserIncome} from "../Controllers/Transaction.js";
import  express  from "express";

 const transactionRouter= express.Router()

 transactionRouter.get('/read/transactions',getTransactions);
 transactionRouter.get('/read/transaction/byId',getTransactionByIdUser);
 transactionRouter.get('/read/lastTransaction',getLastTransactions);
 transactionRouter.post('/create/transaction', createTransaction);
 transactionRouter.put('/update/transaction',updateTransaction)
transactionRouter.get('/transaction/getlastPending',getPendingLastTransactions)
transactionRouter.get('/Outcome',getUserOutcome)
transactionRouter.get('/Income',getUserIncome)

 export default transactionRouter