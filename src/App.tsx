import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import NavBar from "./components/NavBar"
import ShowCustomers from "./pages/ShowCustomers"
import NotFound from "./pages/NotFound"
import ShowTransactions from "./pages/ShowTransactions"

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
