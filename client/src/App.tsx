import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { SignIn, SignUp } from "@/features/auth";
import { Home } from "@/features/home";
import { Navbar } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";

/**
 * Layout route that renders the navbar above nested page content.
 * Auth pages (sign-in, sign-up) are excluded by living outside this layout.
 *
 * @returns The layout with navbar and outlet content.
 */
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

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
        <Route element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
