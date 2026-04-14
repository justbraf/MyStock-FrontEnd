import { useEffect, useState } from "react"
import { useParams } from "react-router"
import ShowTransaction from "../components/ShowTransaction"

const ShowTransactions = () => {
    interface TransactionsType {
        date: Date,
        amount: number,
        transaction_code: string,
        symbol: string,
        price: string,
        total: string
    }
    interface TransactionType {
        _id: string,
        account_id: number,
        transaction_count: number,
        bucket_start_date: Date,
        bucket_end_date: Date,
        transactions: TransactionsType[]
    }

    const [allTransaction, setAllTransaction] = useState<TransactionType>()

    const { acctID } = useParams() // acctID is the account number
    const getTransactionsURL = `http://localhost:3000/transactions/${acctID}`
    const getTransactionsReq = new Request(
        getTransactionsURL, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    useEffect(() => {
        fetch(getTransactionsReq)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setAllTransaction(data)
            })
    },)

    return (
        <>
            <div>ShowTransactions</div>
            {allTransaction ?
                <ShowTransaction transData={allTransaction} />
                :
                <p>No Transactions Found!</p>
            }
        </>
    )
}

export default ShowTransactions