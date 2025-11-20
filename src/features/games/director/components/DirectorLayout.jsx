import { Outlet } from "react-router";
import DirectorProvider from "../context/DirectorContext";

export default function DirectorLayout() {

    return (
        <DirectorProvider>
            <Outlet />
        </DirectorProvider>
    )
}