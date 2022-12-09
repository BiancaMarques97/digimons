import { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { DigimonList } from "../components/DigimonList";
import { Home } from "../components/Home";
import { Context } from "../Context/CheckButton";

export function MyRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/digimons" element={
                <ProtectRoute>
                    <DigimonList />
                </ProtectRoute>
            } />
        </Routes>
    )
}

function ProtectRoute({ children }: { children: JSX.Element }) {
    const { checkButton } = useContext(Context);
    const location = useLocation();

    if (!checkButton    ) return <Navigate to="/" state={{ from: location }} />
    return children;
}