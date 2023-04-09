import {Route, Routes, BrowserRouter} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./component/Header";
import './App.css'
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";

function App() {
    const {user} = useSelector((state) => state.auth)

    return (
        <>
            <BrowserRouter>
                <div className="container">
                    <Header/>
                    <Routes>
                        {user ? (
                            <Route path="/" element={<Dashboard/>}/>
                        ) : (
                            <>
                                <Route path="/" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                            </>
                        )}
                    </Routes>
                </div>
            </BrowserRouter>
            <ToastContainer/>
        </>
    );
}

export default App;
