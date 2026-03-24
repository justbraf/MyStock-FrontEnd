interface CustomerType {
    _id: string,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    address: string,
    birthdate: string
}

const ShowCustomer = ({ cust }: { cust: CustomerType }) => {
    return (
        <div key={cust._id} className="mb-5">
            <div>Username: {cust.username}</div>
            <div>First Name: {cust.firstname}</div>
            <div>Last Name: {cust.lastname}</div>
            <div>Email: {cust.email}</div>
            <div>Address:
                <p>{cust.address}</p>
            </div>
            <div>Birthday: {cust.birthdate}</div>
        </div>
    )
}

export default ShowCustomer