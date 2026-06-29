import { Link, useNavigate } from "react-router-dom";
import { Landmark, LogOut } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

interface NavRoute {
  label: string;
  path: string;
}

const NAV_ROUTES: NavRoute[] = [{ label: "Home", path: "/" }];

/**
 * Top navigation bar with route links on the left and user name + signout
 * on the right. Sticky positioned at the top of the viewport.
 *
 * @returns The navbar component or null if the session is still loading.
 */
export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();

  if (isPending) {
    return null;
  }

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Signed out successfully");
    navigate("/sign-in");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* Left: brand + route links */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground"
          >
            <Landmark className="size-5" />
            SmartFin
          </Link>
          <div className="flex items-center gap-1">
            {NAV_ROUTES.map((route) => (
              <Button key={route.path} variant="ghost" size="sm" asChild>
                <Link to={route.path}>{route.label}</Link>
              </Button>
            ))}
          </div>
        </nav>

        {/* Right: user name + signout */}
        {session && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {session.user.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="size-4" />
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
