import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@/features/auth";
import { Home } from "@/features/home";
import { Toaster } from "@/components/ui/sonner";

/**
 * Root application component with routing and toast provider.
 *
 * @returns The application with routing and global Toaster.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
