import { useState } from "react"
import type { TransactionsType, TransactionType } from "./dataInterfaces"
import MessageResponse from "./MessageResponse"


const ShowTransaction = ({ transData }: { transData: TransactionType }) => {
    const [messageResp, setMessageResp] = useState<{ message: string }>()

    const handleAddFave = () => {
        const addFaveReq = new Request(
            `http://localhost:3000/faves/add/${transData.account_id}`,
            {
                method: 'POST'
            }
        )
        fetch(addFaveReq)
            .then(res => res.json())
            .then(msg => {
                // saved add to faves response message
                setMessageResp(msg)
            })

    }

    return (
        <div key={transData._id}>
            <button className="border-2 p-2 cursor-pointer" onClick={handleAddFave}>Add To Faves</button>
            <div>Account NUmber: {transData.account_id}</div>
            <div>Number of Transactions: {transData.transaction_count}</div>
            <div className="grid grid-cols-3">
                {
                    transData.transactions.map((trn: TransactionsType) => {
                        return (
                            <div className="m-1 border">
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
            {/* If there is a response message from adding to faves, then show the message */}
            {messageResp?.message != undefined && <MessageResponse msg={messageResp?.message} setMsg={setMessageResp} />}
        </div>
    )
}

export default ShowTransaction