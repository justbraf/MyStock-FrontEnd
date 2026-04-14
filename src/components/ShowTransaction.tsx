
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
    const handleAddFave = () => {
        // console.log("Add To Faves", transData.account_id)
        const addFaveReq = new Request(
            `http://localhost:3000/faves/add/${transData.account_id}`,
            {
                method: 'POST'
            }
        )
        fetch(addFaveReq)
        .then(res => res.json())
        .then(msg =>{
            console.log(msg)
        })

    }

    return (
        <div key={transData._id}>
            <button className="border-2 p-2 cursor-pointer" onClick={handleAddFave}>Add To Faves</button>
            <div>Account NUmber: {transData.account_id}</div>
            <div>Number of Transactions: {transData.transaction_count}</div>
            {
                transData.transactions.map((trn: TransactionsType) => {
                    return (
                        <div className="m-1 border-1">
                            <div>Date: {trn.date.toString()}</div>
                            <div>Amount: {trn.amount}</div>
                            <div>Transaction Code: {trn.transaction_code}</div>
                            <div>Symbol: {trn.symbol}</div>
                            <div>Price: {trn.price}</div>
                            <div>Total: {trn.total}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ShowTransaction