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
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerType[] | undefined>()
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
        setAllCustomers(data)
        setFilteredCustomers(data)
      })
  }

  useEffect(() => {
    fetchCustomers(pageNum)
  }, [pageNum]);

  const handlePageNext = () => {
    setPageNum(pg => pg + 1)
  }
  const handlePagePrev = () => {
    setPageNum(pg => pg - 1 <= 0 ? 1 : pg - 1)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value
    setFilteredCustomers(
      allCustomers?.filter(cust => {
        if (cust.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || cust.lastname.toLowerCase().includes(searchTerm.toLowerCase()))
          return cust
      })
    )
  }

  return (
    <>
      <div className=" text-2xl">Customer List</div>
      <div className=""><input onChange={handleSearch} className="border m-2 p-1 w-50" type="text" id="search" /></div>
      <div className="columns-3 gap-4">
        <div className="aspect-auto">

          {filteredCustomers && filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer: CustomerType) => {
              return <ShowCustomer key={customer._id} cust={customer} />;
            })
          ) : (
            <p>No Customers Found.</p>
          )}
        </div>
      </div>
      <div className="flex justify-around mt-3">
        <div className="border p-2 w-24 cursor-pointer justify-center flex hover:bg-slate-300" onClick={handlePagePrev}>Prev</div>
        <div className="border p-2 w-24 cursor-pointer justify-center flex hover:bg-slate-300" onClick={handlePageNext}>Next</div>
      </div>
    </>
  )
}

export default ShowCustomers;
