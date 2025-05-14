import React from "react";

function InfoCard({ title, icon, count }) {
  return (
    <div className="card info-card sales-card">
      <div class="filter">
        <a class="icon" href="#" data-bs-toggle="dropdown">
          <i class="bi bi-three-dots"></i>
        </a>
        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <li
            class="dropdown-header text-start"
            style={{ padding: "0px 15px" }}
          >
            <h6>Filter</h6>
          </li>

          <li>
            <a class="dropdown-item" href="#" style={{ padding: "4px 15px" }}>
              Today
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#" style={{ padding: "4px 15px" }}>
              This Month
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#" style={{ padding: "4px 15px" }}>
              This Year
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <h5 className="card-title fw-bold">
          {title}
          <span> | All time</span>
        </h5>
        <div className="d-flex align-items-center">
          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i className={icon}></i>
          </div>

          <div className="ps-3">
            <h6>{count}</h6>
            <span
              class="text-success  pt-1 fw-bold"
              style={{ fontSize: "1rem" }}
            >
              {(count * 50) / 100} %
            </span>
            <span class="text-muted  pt-2 ps-1" style={{ fontSize: "1rem" }}>
              increase
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InfoMiniCard({ title, icon, count }) {
  return (
    <tr>
      <th scope="row">
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            color: "rgb(58 182 72)",
            background: "rgb(58 182 72 / 24%)",
            height: "40px",
            width: "40px",
            fontSize: "1.3rem",
          }}
        >
          <i className={icon}></i>
        </div>
      </th>
      <td className="text-primary fw-bold" style={{ fontSize: "1rem" }}>
        {title}
      </td>
      <td class="fw-bold" style={{ fontSize: "1.2rem" }}>
        {count || 0}
      </td>
    </tr>
  );
}

export default InfoCard;
