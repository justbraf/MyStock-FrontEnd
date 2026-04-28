import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import NavBar from "./components/NavBar"
import ShowCustomers from "./pages/ShowCustomers"
import NotFound from "./pages/NotFound"
import ShowTransactions from "./pages/ShowTransactions"
import ShowOneCustomer from "./pages/ShowOneCustomer"

function App() {

  return (
    <>
      <NavBar /> {/* reusuable navbar component */}
      <Routes>
        {/* Define the URL routes and the pages they will load */}
        {/* Routes are processed in the order they  are listed */}

        {/* index is a child route that renders at the exact URL of its parent, in this case path="/" */}
        <Route index element={<HomePage />} />
        <Route path="/show" element={<ShowCustomers />} />
        <Route path="/show/:uname" element={<ShowOneCustomer />} />

        {/* This route has a parameter variable denoted by the colon followed by a variable name */}
        <Route path="/transactions/:acctID" element={<ShowTransactions />} />

        {/* The asterisk matches all routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
