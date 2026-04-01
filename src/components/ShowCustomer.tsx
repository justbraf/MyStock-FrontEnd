import { Link } from "react-router"

interface CustomerType {
    _id: string,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    address: string,
    birthdate: string,
    accounts: number[]
}

const ShowCustomer = ({ cust }: { cust: CustomerType }) => {
    return (
        <div key={cust._id} className="mb-3 p-3 border-2 w-2/5 ">
            <div>Username: {cust.username}</div>
            <div>First Name: {cust.firstname}</div>
            <div>Last Name: {cust.lastname}</div>
            <div>Email: {cust.email}</div>
            <div>Address:
                <p>{cust.address}</p>
            </div>
            <div>Birthday: {cust.birthdate}</div>
            <div className="py-3">Accounts:
                {cust.accounts.map((acct: number) => {
                    return (
                        <Link className="mx-2 p-2 border" to={`/transactions/${acct}`}>{acct}</Link>
                    )
                })}
            </div>
        </div>
    )
}

export default ShowCustomer