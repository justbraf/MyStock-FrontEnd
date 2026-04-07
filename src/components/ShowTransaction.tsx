
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

const ShowTransaction = ({ transData }: { transData: TransactionType }) => {
    return (
        <div key={transData._id}>

        </div>
    )
}

export default ShowTransaction