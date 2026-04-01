import { useEffect } from "react"
import { useParams } from "react-router"

const ShowTransactions = () => {
    const { custid } = useParams() // custid is the account number
    const getTransactionsURL = `http://localhost:3000/transactions/${custid}`
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
                console.log(data)
                // setAllTransactions(data)
            })
    }, [])

    return (
        <div>ShowTransactions</div>
    )
}

export default ShowTransactions