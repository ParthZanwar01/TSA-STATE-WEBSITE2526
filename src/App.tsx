import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/AuthContext";
import { BusinessStoreProvider } from "@/contexts/BusinessStoreContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Directory from "./pages/Directory";
import MapPage from "./pages/MapPage";
import About from "./pages/About";
import Events from "./pages/Events";
import SubmitBusiness from "./pages/SubmitBusiness";
import BusinessDetail from "./pages/BusinessDetail";
import BusinessLogin from "./pages/BusinessLogin";
import MyFavorites from "./pages/MyFavorites";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <BusinessStoreProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/submit" element={<SubmitBusiness />} />
            <Route path="/business/:id" element={<BusinessDetail />} />
            <Route path="/favorites" element={<MyFavorites />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<BusinessLogin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </BusinessStoreProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
