import React from "react";
import {Link} from "react-router-dom";

const Menu = () => {
    return(
        <div>
            <Link to={'/board'}>
                <button className={"btn btn-outline-primary"}>게시판</button>
            </Link>
            <Link to={'/'}>
                <button className={"btn btn-outline-primary"}>Menu2</button>
            </Link>
            <Link to={'/'}>
                <button className={"btn btn-outline-primary"}>Menu3</button>
            </Link>
            <Link to={'/'}>
                <button className={"btn btn-outline-primary"}>Menu4</button>
            </Link>
        </div>
    );
};
export default Menu;