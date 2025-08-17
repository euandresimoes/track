import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import Login from "@/pages/Login";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // navbar visible on scroll
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`bg-background border-b border-border top-0 z-50 backdrop-blur-md bg-background/95 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } fixed w-full`}
      >
        <div className="w-screen h-2 bg-gradient-to-r from-orange-500 to-purple-500"></div>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-xl font-bold text-foreground">
                <Link to="/">Trackify</Link>
              </div>
            </div>

            {/* Desktop Navigation - Center */}
            <nav className="hidden md:flex w-full justify-start pl-10 pt-1 items-center space-x-8">
              <Link
                to="#home"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Recursos
              </a>
              <a
                href="#integrations"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Integrações
              </a>
              <a
                href="#pricing"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Preços
              </a>
            </nav>

            {/* Desktop Actions - Right */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-muted-foreground hover:text-foreground"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Alternar tema</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-sm">
                <Link
                  to="/login"
                  className="w-full h-full flex justify-center items-center"
                >
                  Log in
                </Link>
              </Button>
              <Button variant="default" size="sm" className="text-sm">
                <Link
                  to="/register"
                  className="w-full h-full flex justify-center items-center"
                >
                  Sign up
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-muted transition-colors text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border pt-4 pb-4">
              {/* Mobile Navigation */}
              <nav className="space-y-3 mb-6">
                <a
                  href="#home"
                  className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </a>
                <a
                  href="#features"
                  className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Recursos
                </a>
                <a
                  href="#integrations"
                  className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Integrações
                </a>
                <a
                  href="#pricing"
                  className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Preços
                </a>
              </nav>

              {/* Mobile Actions */}
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full justify-start text-muted-foreground hover:text-foreground relative"
                >
                  <Sun className="h-4 w-4 mr-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="h-4 w-4 mr-2 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  Alternar tema
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sm"
                >
                  <Link
                    to="/login"
                    className="w-full flex justify-start items-center"
                  >
                    Log in
                  </Link>
                </Button>
                <Button variant="default" size="sm" className="w-full text-sm">
                  <Link
                    to="/register"
                    className="w-full flex justify-center items-center"
                  >
                    Sign up
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
