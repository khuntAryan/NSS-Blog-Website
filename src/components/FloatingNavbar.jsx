
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

const FloatingNavbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full px-6 py-3 flex gap-6 z-50">
      {navItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className={cn(
            "text-gray-800 hover:text-orange-500 transition-all font-medium"
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default FloatingNavbar;
