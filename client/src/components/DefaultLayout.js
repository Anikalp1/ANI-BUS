import React from "react";
import "../resources/layout.css";
import { useNavigate } from "react-router-dom";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);
  const userMenu = [];
  const adminMenu = [
    {
      name: "Home",
      path: "/admin",
      icon: "ri-home-3-line",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const menuToBeRendered = adminMenu;
  const activeRoute = window.location.pathname;
  return (
    <div className="layout-parent">
      <div className="sidebar">
        <div className="d-flex flex-column gap-3 justify-content-start">
          {menuToBeRendered.map((item, index) => {
            return (
              <div
                className={`${
                  activeRoute === item.path && "active-menu-item"
                } menu-item`}
              >
                <i className={item.icon}></i>
                <span
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="body">
        <div className="header">
          {collapsed ? (
            <i
              class="ri-menu-2-line"
              onClick={() => setCollapsed(!collapsed)}
            ></i>
          ) : (
            <i
              class="ri-close-circle-line"
              onClick={() => setCollapsed(!collapsed)}
            ></i>
          )}
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
