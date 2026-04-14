import { useEffect, useState } from "react";
import ShowCustomer from "../components/ShowCustomer";

const ShowCustomers = () => {
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

  const [allCustomers, setAllCustomers] = useState<CustomerType[] | undefined>()
  const [pageNum, setPageNum] = useState<number>(1)

  const fetchCustomers = (pgNum: number) => {
    const getCustomersURL = `http://localhost:3000/customers/pg${pgNum}`
    const getCustomersReq = new Request(getCustomersURL, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    fetch(getCustomersReq)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data[0])
        setAllCustomers(data);
      })
  }

  useEffect(() => {
    fetchCustomers(pageNum)
  }, [pageNum]);

  const handlePageNext = () => {
    setPageNum(pg => pg + 1)
  }
  const handlePagePrev = () => {
    setPageNum(pg => pg - 1)
  }

  return (
    <>
      <div className="justify-center">Customer List</div>
      {allCustomers && allCustomers.length > 0 ? (
        allCustomers.map((customer: CustomerType) => {
          return <ShowCustomer key={customer._id} cust={customer} />;
        })
      ) : (
        <p>No Customers Found.</p>
      )}
      <div className="justify-between">
        <div className="border p-2 w-24 cursor-pointer" onClick={handlePagePrev}>Prev</div>
        <div className="border p-2 w-24 cursor-pointer" onClick={handlePageNext}>Next</div>
      </div>
    </>
  );
};

export default ShowCustomers;
