import { getTransactions, getTransactionByIdUser, createTransaction ,getUserIncomeFourWeeks, updateTransaction, getLastTransactions,getPendingLastTransactions,getUserOutcome,getUserIncome,weeklyIncome,weeklyOutcome} from "../Controllers/Transaction.js";
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
transactionRouter.get('/weeklyIncome',weeklyIncome)
transactionRouter.get('/weeklyOutcome',weeklyOutcome)
transactionRouter.get('/fourweeks',getUserIncomeFourWeeks)

 export default transactionRouter