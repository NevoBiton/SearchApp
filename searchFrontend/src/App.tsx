import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@/costumComponents/SideBar.tsx";
import HomePage from "@/costumComponents/pages/HomePage.tsx";
import SearchPage from "@/costumComponents/pages/SearchPage.tsx";
import {ThemeProvider} from "@/components/ui/theme-provider.tsx";
import SearchHistoryPage from "@/costumComponents/pages/SearchHistoryPage.tsx";

function App() {
    return (
        <Router>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Sidebar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/search-history" element={<SearchHistoryPage />} />
                </Routes>
            </ThemeProvider>
        </Router>
    );
}

export default App;
