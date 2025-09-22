"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  MdKeyboardArrowRight,
  MdDashboard,
  MdPeople,
  MdWork,
  MdEvent,
  MdSettings,
  MdLogout,
} from "react-icons/md";

const Sidebar = ({ onSelectMenu }) => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <MdDashboard />,
      children: [{ name: "Dashboard Home", path: "/admin/dashboard" }],
    },
    {
      name: "Users",
      icon: <MdPeople />,
      children: [{ name: "User List", path: "/admin/users" }],
    },
    {
      name: "Careers",
      icon: <MdWork />,
      children: [
        { name: "Job Added", path: "/Admin/dashboard/pages/careers/AddJob" },
        { name: "Applied Job", path: "/Admin/dashboard/pages/careers/AppliedJob" },
      ],
    },
    {
      name: "Event",
      icon: <MdEvent />,
      children: [{ name: "Event List", path: "/admin/event" }],
    },
    {
      name: "Settings",
      icon: <MdSettings />,
      children: [{ name: "General Settings", path: "/admin/settings" }],
    },
    {
      name: "Logout",
      icon: <MdLogout />,
      children: [{ name: "Confirm Logout", path: "/admin/logout" }],
    },
  ];

  const toggleMenu = (name) => setOpenMenu(openMenu === name ? null : name);

  // 🔹 Auto select based on current route
  useEffect(() => {
    if (!onSelectMenu) return;

    for (const menu of menuItems) {
      for (const child of menu.children) {
        if (pathname === child.path) {
          // Send parent + child
          onSelectMenu(`${menu.name} -> ${child.name}`);
          setOpenMenu(menu.name); 
          return;
        }
      }
    }
  }, [pathname]);

  return (
    <aside className="admin-sidebar position-fixed">
      <div className="sidebar-header">
        <Image
          src="/images/career/iis-logo.png"
          alt="iis-logo"
          height={40}
          width={40}
        />
      </div>
      <div className="sidebar-menu">
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="label-container">
                <button
                  type="button"
                  className="sidebar-parent-btn d-flex justify-content-between align-items-center w-100"
                  onClick={() => toggleMenu(item.name)}
                >
                  <span className="d-flex align-items-center sidebar-parent-lable">
                    {item.icon}
                    {item.name}
                  </span>
                  <MdKeyboardArrowRight
                    className={openMenu === item.name ? "rotate-90" : ""}
                  />
                </button>
                <ul
                  className={`sidebar-submenu gap-3 d-flex flex-column ${
                    openMenu === item.name ? "open" : ""
                  }`}
                >
                  {item.children.map((child) => (
                    <li
                      key={child.path}
                      className={`d-flex align-items-center gap-1 ${
                        pathname === child.path ? "active-item" : ""
                      }`}
                    >
                      <MdKeyboardArrowRight size={16} />
                      <Link
                        href={child.path}
                        onClick={() =>
                          onSelectMenu &&
                          onSelectMenu(`${item.name} → ${child.name}`) // 👈 parent + child
                        }
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
