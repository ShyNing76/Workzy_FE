import Navbar from "./components/layout/Navbar/Navbar.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./components/layout/Footer/Footer.jsx";

function App() {

  return <>
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <div className="flex-grow">
        <Outlet/>
      </div>
      <Footer/>
    </div>

    </>
    }

    export default App;
