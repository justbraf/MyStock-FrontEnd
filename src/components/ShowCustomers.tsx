import { useEffect, useState } from "react"
import ShowCustomer from "./ShowCustomer"

const ShowCustomers = () => {
  interface CustomerType {
    _id: string,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    address: string,
    birthdate: string
  }

  const [allCustomers, setAllCustomers] = useState<CustomerType[] | undefined>()
  const getCustomersURL = "http://localhost:3000/customers"
  const getCustomersReq = new Request(
    getCustomersURL, {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  )

  useEffect(() => {
    fetch(getCustomersReq)
      .then(res => res.json())
      .then(data => {
        // console.log(data[0])
        setAllCustomers(data)
      })
  }, [])
  return (
    <>
      <div className="justify-center">Customer List</div>
      {allCustomers && allCustomers.length > 0 ?
        allCustomers.map((customer: CustomerType) => {
          return (
            <ShowCustomer key={customer._id} cust={customer} />
          )
        })
        :
        <p>No Customers Found.</p>}
    </>
  )
}

export default ShowCustomers