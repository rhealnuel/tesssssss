import Header from "./components/Header"
import Details from "./pages/Details"
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";



function App() {

  return (
    <div className="h-screen w-full overfow-y-auto bg-gray-900  py-[33px] overflow-x-hidden px-2 lg:px-[80px]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/:id" element={<Details/>} />
          {/* <Route path="/:id" element={<WeatherDetailPage/>} /> */}

        </Routes>
      </Router>
    </div>
  )
}

export default App
