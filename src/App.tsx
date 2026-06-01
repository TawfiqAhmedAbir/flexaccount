import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Splash from "./screens/Splash";
import Passnumber from "./screens/Passnumber";
import Home from "./screens/Home";
import AccountDetail from "./screens/AccountDetail";
import TransactionDetail from "./screens/TransactionDetail";

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Splash />} />
        <Route path="/passnumber" element={<Passnumber />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<AccountDetail />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
        <Route path="*" element={<Splash />} />
      </Routes>
    </AnimatePresence>
  );
}
