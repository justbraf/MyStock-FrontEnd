import { useEffect, useState } from "react"
import { useParams } from "react-router"

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

    const [allTransactions, setAllTransactions] = useState<TransactionType[] | undefined>()

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
                setAllTransactions(data)
            })
    }, [])

    return (
        <>
            <div>ShowTransactions</div>
            {allTransactions && allTransactions.length > 0 ?
                <p>Transcations found</p>
                :
                <p>No Transactions Found.</p>
            }
        </>
    )
}

export default ShowTransactions