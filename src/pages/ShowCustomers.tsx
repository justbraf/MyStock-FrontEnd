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

  const [allCustomers, setAllCustomers] = useState<
    CustomerType[] | undefined
  >();
  const [pageNum, setPageNum] = useState<number>(0);
  // const getCustomersURL = `http://localhost:3000/customers/${pageNum}`;
  let getCustomersURL = `http://localhost:3000/customers/${pageNum}`;
  const getCustomersReq = new Request(getCustomersURL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const fetchCustomers = () => {
    fetch(getCustomersReq)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data[0])
        setAllCustomers(data);
      });

  }

  useEffect(() => {
    fetchCustomers()
  }, []);
  
  const handlePages = (pageTurn: number) => {
    if (pageNum - pageTurn < 0) pageTurn = 0;
    setPageNum(curPage => {
      curPage + pageTurn
    })
    fetchCustomers()
  };

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
        <div className="border p-2" onClick={handlePages(-1)}>Prev</div>
        <div className="border p-2" onClick={handlePages(1)}>Next</div>
      </div>
    </>
  );
};

export default ShowCustomers;
