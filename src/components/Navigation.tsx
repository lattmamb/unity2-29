import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MobileNav } from "@/components/navigation/MobileNav";
import { DesktopNav } from "@/components/navigation/DesktopNav";

export const Navigation = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/f66d8175-3ad2-4099-9ad2-0c6e0879da43.png" 
                alt="Unity Logo" 
                className="h-10 w-10"
              />
              <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Unity
              </span>
            </Link>
            <DesktopNav />
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name} />
                      <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" className="bg-gradient-to-r from-primary to-secondary text-white">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};