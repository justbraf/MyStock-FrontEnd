import { useEffect, useState } from "react";
import ShowCustomer from "../components/ShowCustomer";
import type { CustomerType } from "../components/dataInterfaces";
import { useNavigate, useParams } from "react-router";

// declare React component
const ShowOneCustomer = () => {
  const { uname } = useParams()
  // declare state variable to store the array of customers
  const [customerUno, setCustomerUno] = useState<CustomerType | undefined>()

  // function to fetch customer data by the specified page number
  const fetchCustomers = (username: string | undefined) => {
    // construct the URL and header for fetching the data from the API (backend)
    const getCustomerURL = `http://localhost:3000/customer/${username}`
    const getCustomerReq = new Request(getCustomerURL, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    // fetch the customer data
    fetch(getCustomerReq)
      .then((res) => res.json())
      .then((data) => {
        // store the retrieved data into the state variable
        setCustomerUno(data)
      })
  }

  // use effect is used to allow React to fetch data from an external source
  useEffect(() => {
    fetchCustomers(uname)
  }, [uname]); // the square brackets is for dependecies of the useEffect() method
  // and it will automatically re-render the useEffect whenever the dependcy changes

  // useNaviagte hook from React router allows the programatic control of navigation
  const navigate = useNavigate()
  const handleGoBack = () => {
    // Go back one page
    navigate(-1)
  }

  // JSX components to be rendered
  return (
    // fragment to hold JSX elements because a component can only render a single JSX element
    <>
      {/* <div className=" text-2xl">Customer List</div> */}
      <div className="w-full">
        {/* check if the filteredCustomers state variable is null or has zero indexes */}
        {customerUno && <ShowCustomer cust={customerUno} mode={true} />}
      </div>
      <div><button className="p-2 border rounded bg-teal-200 hover:bg-teal-600" onClick={handleGoBack}>Go Back</button></div>
    </>
  )
}

export default ShowOneCustomer;
