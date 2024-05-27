import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./Login";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import MainLogin from "./MainLogin";
import ManagerMain from "./ManagerMain";
import InvitePageConfirm from "./InvitePageConfirm";

const Nav = () => {
    const navigate= useNavigate()
    return (


        <div>
            <Routes>
                <Route path={"/error"} element={<ErrorPage navigate={navigate}/>}/>
                <Route path="/" element={<MainLogin navigate={navigate}/>} />
                <Route path="/user/*" element={<Home navigate={navigate}/>} />
                <Route path={"/manager/*"} element={<ManagerMain navigate={navigate}/>}/>
                <Route path={"/event-message/:id"} element={ <InvitePageConfirm/>}/>
            </Routes>
        </div>
    )
};

export default Nav;