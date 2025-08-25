import { useCallback } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  UserCircleIcon,
  BasketIcon,
  CategoryIcon,
  ShoppingIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  // {
  //   icon: <GridIcon />,
  //   name: "Dashboard",
  //   path: "/",
  // },
  {
    name: "Products",
    icon: <ShoppingIcon />,
    path: "/",
  },
  {
    name: "Orders",
    icon: <BasketIcon />,
    path: "/orders",
  },
  {
    name: "Customers",
    icon: <UserCircleIcon />,
    path: "/customers",
  },
  {
    name: "Categories",
    icon: <CategoryIcon />,
    path: "/api/categories",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen } = useSidebar();
  const location = useLocation();

  // Updated function to highlight nested routes
  const isActive = useCallback(
    (path: string) => {
      if (path === "/") return location.pathname === "/";
      return location.pathname.startsWith(path);
    },
    [location.pathname]
  );

  return (
    <aside className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
    >
      {/* Logo Section */}
      <div
        className={`py-8 flex ${
          !isExpanded ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo_text_black.png"
                alt="Logo"
                width={180}
                height={80}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo_text_white.png"
                alt="Logo"
                width={180}
                height={80}
              />
            </>
          ) : (
            <>
            <img
                className="dark:hidden"
                src="/images/logo/logo_black.png"
                alt="Logo"
                width={30}
                height={30}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo_white.png"
                alt="Logo"
                width={30}
                height={30}
              />
              </>
          )}
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <ul className="flex flex-col gap-4">
            {navItems.map((nav) => (
              <li key={nav.name}>
                <Link
                  to={nav.path}
                  className={`menu-item group ${
                    isActive(nav.path)
                      ? "menu-item-active"
                      : "menu-item-inactive"
                  } ${!isExpanded ? "lg:justify-center" : "lg:justify-start"}`}
                >
                  <span
                    className={`menu-item-icon-size ${
                      isActive(nav.path)
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isMobileOpen) && (
                    <span className="menu-item-text">{nav.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
