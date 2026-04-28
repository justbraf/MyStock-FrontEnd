import { useEffect, useState } from "react";
import ShowCustomer from "../components/ShowCustomer";
import type { CustomerType } from "../components/dataInterfaces";
import { Link } from "react-router";

// declare React component
const ShowCustomers = () => {
  // declare state variable to store the array of customers
  const [allCustomers, setAllCustomers] = useState<CustomerType[] | undefined>()
  // declare state variable to store the array of customers based on user input
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerType[] | undefined>()
  // declare state variable to track the page number. Default value is set to 1
  const [pageNum, setPageNum] = useState<number>(1)

  // function to fetch customer data by the specified page number
  const fetchCustomers = (pgNum: number) => {
    // construct the URL and header for fetching the data from the API (backend)
    const getCustomersURL = `http://localhost:3000/customers/pg${pgNum}`
    const getCustomersReq = new Request(getCustomersURL, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    // fetch the customer data
    fetch(getCustomersReq)
      .then((res) => res.json())
      .then((data) => {
        // store the retrieved data into the state variables
        setAllCustomers(data)
        setFilteredCustomers(data)
      })
  }

  // use effect is used to allow React to fetch data from an external source
  useEffect(() => {
    fetchCustomers(pageNum)
  }, [pageNum]); // the square brackets is for dependecies of the useEffect() method
  // and it will automatically re-render the useEffect whenever the dependcy changes


  const handlePageNext = () => {
    setPageNum(pg => pg + 1)
  }
  const handlePagePrev = () => {
    setPageNum(pg => pg - 1 <= 0 ? 1 : pg - 1)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value
    setFilteredCustomers(
      // use the array filter function to create a new array containing only matching elements
      allCustomers?.filter(cust => {
        // truthy condition for adding elements to the new array
        if (cust.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || cust.lastname.toLowerCase().includes(searchTerm.toLowerCase()))
          return cust
      })
    )
  }

  // JSX components to be rendered
  return (
    // fragment to hold JSX elements because a component can only render a single JSX element
    <>
      <div className=" text-2xl">Customer List</div>
      <div className="">
        {/* trigger the handleSearch function every time a change event is detected on the input element */}
        <input onChange={handleSearch} className="border m-2 p-1 w-50" type="text" id="search" />
      </div>
      <div className="columns-3 gap-4">
        <div className="aspect-auto">
          {/* check if the filteredCustomers state variable is null or has zero indexes */}
          {filteredCustomers && filteredCustomers.length > 0 ? (
            // the array method map creates a new array by executing a specified transformation function
            // Here the usage is to convert the data in each index into a JSX element
            filteredCustomers.map((customer: CustomerType) => {
              // Since each element has a consistent look, we use a component
              // a unique key must be specified for each copy and each index is passed to it
              return (
                <Link to={"/show/" + customer.username} key={customer._id} >
                  <ShowCustomer cust={customer} mode={false} />
                </Link>
              )
            })
          ) : (
            // else component for the ternary operator
            <p>No Customers Found.</p>
          )}
        </div>
      </div>
      <div className="flex justify-around mt-3">
        <div className="border rounded p-2 w-24 cursor-pointer justify-center flex hover:bg-slate-300" onClick={handlePagePrev}>Prev</div>
        <div className="border rounded p-2 w-24 cursor-pointer justify-center flex hover:bg-slate-300" onClick={handlePageNext}>Next</div>
      </div>
    </>
  )
}

export default ShowCustomers;
