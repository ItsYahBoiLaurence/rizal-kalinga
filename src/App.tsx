import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import Dashboard from "./pages/dashboard";
import OnSiteVerification from "./pages/onsite-verification";
import AidDisbursement from "./pages/aid-disbursement";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path={"on-site-verification"} element={<OnSiteVerification />} />
        <Route path={"aid-disbursement"} element={<AidDisbursement />} />
      </Route>
    </Routes>
  );
}

export default App;
