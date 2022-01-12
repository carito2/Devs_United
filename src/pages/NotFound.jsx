import React from "react";
import { Outlet } from "react-router";

function NotFound() {
    return(
        <>
            <h1>NOT FOUND error 404</h1>
            <Outlet/>
        </>
    )
}

export default NotFound;