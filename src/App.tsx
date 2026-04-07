import { Route, Routes } from "react-router"
import HomePage from "./components/HomePage"
import NavBar from "./components/NavBar"
import ShowCustomers from "./components/ShowCustomers"
import NotFound from "./components/NotFound"
import ShowTransactions from "./components/ShowTransactions"

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/show" element={<ShowCustomers />} />
        <Route path="/transactions/:acctID" element={<ShowTransactions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
