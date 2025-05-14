import { GridViewSharp } from "@mui/icons-material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function NiceSidebar() {
  let routes = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: "bi bi-grid-fill",
      mIcon: <GridViewSharp />,
      key: "dashboard",
    },
    {
      name: "User management",
      link: "/manage-users",
      icon: "bi bi-person-fill",
      key: "user_management",
      subRoute: [
        {
          name: "Manage System Users",
          link: "/manage-users",
          icon: "bi bi-list",
          key: "menuone",
        },
        {
          name: "Working Team",
          link: "/manage-team",
          icon: "bi bi-bag-check-fill",
          key: "menuone",
        },
        {
          name: "Instructor",
          link: "/manage-instructors",
          icon: "bi bi-person-workspace",
          key: "system",
        },
      ],
    },
    {
      name: "Courses",
      link: "/manage-courses",
      icon: "bi bi-film",
      key: "courses",
      subRoute: [
        {
          name: "Eth-Schitech Courses",
          link: "/manage-courses",
          icon: "bi bi-film",
          key: "vendors_and_purchases",
        },
        {
          name: "Others courses",
          link: "/manage-others-course",
          icon: "bi bi-film",
          key: "inventory_and_services",
        },
      ],
    },
    {
      name: "Subjects",
      link: "/manage-subjects",
      icon: "bi bi-book-half",
      key: "employees_and_payroll",
    },

    {
      name: "Apparatus",
      link: "/manage-apparatus",
      icon: "bi bi-box",
      key: "banking",
    },

    {
      name: "Order",
      link: "/orders",
      icon: "bi bi-cart-check",
      key: "system",
    },
    {
      name: "Projects",
      link: "/manage-projects",
      icon: "bi bi-bag-check",
      key: "system",
    },
    {
      name: "Gallary",
      link: "/manage-gallary",
      icon: "bi bi-images",
      key: "system",
    },
    {
      name: "Company Information",
      link: "/manage-subjects",
      icon: "bi bi-building",
      key: "company_information",
      subRoute: [
        {
          name: "Testimony",
          link: "/manage-testimonies",
          icon: "bi bi-chat-left-dots",
          key: "system",
        },
        {
          name: "Feedback",
          link: "/manage-feedbacks",
          icon: "bi bi-reply-all",
          key: "system",
        },
        {
          name: "About",
          link: "/manage-about-us",
          icon: "bi bi-building",
          key: "system",
        },
      ],
    },
  ];

  const { t } = useTranslation();
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {routes.map((route) => (
          <li key={route.name} className="nav-item">
            {route?.subRoute ? (
              <>
                <a
                  className="nav-link collapsed"
                  data-bs-target={`#${route.key}_nav`}
                  data-bs-toggle="collapse"
                  href="#"
                >
                  <i className="bi bi-menu-button-wide"></i>
                  <span>{route.name}</span>
                  <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                {route.subRoute.map((sr) => (
                  <ul
                    key={sr.name}
                    id={`${route.key}_nav`}
                    className="nav-content collapse "
                    data-bs-parent="#sidebar-nav"
                  >
                    <li>
                      <Link to={sr.link}>
                        <i className="bi bi-circle"></i>
                        <span>{sr.name}</span>
                      </Link>
                    </li>
                  </ul>
                ))}
              </>
            ) : (
              <Link
                to={route.link}
                className={`nav-link collapsed ${route.key === "dashboard"} ${
                  route.key === "dashboard" && "active"
                }`}
              >
                <i className={route.icon}></i>
                <span>{route.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default NiceSidebar;
