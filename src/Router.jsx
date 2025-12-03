import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventory from "./pages/Inventory.jsx";
import NotFound from "./pages/NotFound";
import StatisticsPage from "./pages/StatisticsPage.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/stats" element={<StatisticsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
