import { Link } from "react-router"
import { format } from "date-and-time"
import type { CustomerType } from "./dataInterfaces"

// component has a parameter called mode to determine what data to show
const ShowCustomer = ({ cust, mode }: { cust: CustomerType, mode: boolean }) => {
    return (
        <div key={cust._id} className={mode?"mb-3 p-3 border-2 w-100":"mb-3 p-3 border-2 w-75"}>
            {/* mode && will render the elements on the right, only if mode is true */}
            {mode && <div>Username: {cust.username}</div>}
            <div>Customer: {cust.firstname} {cust.lastname}</div>
            {mode && <div>Email: {cust.email}</div>}
            {mode && <div>Address:
                <p>{cust.address}</p>
            </div>}
            <div>Birthday: {format(new Date(cust.birthdate), 'MMM DD YYYY')}</div>
            {mode && <div className="py-3">Accounts:
                {cust.accounts.map((acct: number) => {
                    return (
                        <Link className="mx-2 p-2 border" to={`/transactions/${acct}`} key={acct}>{acct}</Link>
                    )
                })}
            </div>}
        </div>
    )
}

export default ShowCustomer