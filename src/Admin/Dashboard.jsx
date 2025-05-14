import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { adminError, getCountStarted, setCount } from "../redux/adminSlice";
import api from "../utils/api";
import InfoCard, { InfoMiniCard } from "./Layout/InfoCard";
import NiceLayout from "./Layout/NiceLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const dispatch = useDispatch();
  const { counts } = useSelector((state) => state.admin.count);
  const { pending } = useSelector((state) => state.admin);

  useEffect(() => {
    getCounts();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Data Visualization - By Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    // "June",
    // "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Users",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10000 })),
        borderColor: "#4bc0c0",
        backgroundColor: "#4bc0c0",
      },
      {
        label: "Apparatus",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10000 })),
        backgroundColor: "#36a2eb",
        borderColor: "#36a2eb",
      },
      {
        label: "Courses",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10000 })),
        backgroundColor: "#ff6384",
        borderColor: "#ff6384",
      },
      {
        label: "Orders",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10000 })),
        backgroundColor: "#ffcd56",
        borderColor: "#ffcd56",
      },
    ],
  };

  const getCounts = async () => {
    dispatch(getCountStarted());
    try {
      const { data } = await api.get("/admin/counts");
      dispatch(setCount(data));
    } catch (error) {
      dispatch(adminError(error?.response?.data?.message.split(",")));
    }
  };

  return (
    <>
      {/* //<NiceLayout> */}
      {false ? (
        <Loading />
      ) : (
        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <InfoCard
                    title="All Users"
                    icon="bi bi-person-fill"
                    count={counts.users?.allUsers}
                  />
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12">
                  <InfoCard
                    title="Apparatus"
                    icon="bi bi-box"
                    count={counts?.apparatus}
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <InfoCard
                    title="Courses"
                    icon="bi bi-film"
                    count={counts?.courses}
                  />
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12">
                  <InfoCard
                    title="Orders"
                    icon="bi bi-cart"
                    count={counts?.orders}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="card top-selling overflow-auto">
                <div className="card-body pb-4" style={{ minHeight: "25rem" }}>
                  <h5 className="card-title">System status</h5>

                  <div className="row">
                    <div className="col-lg-6">
                      <table className="table table-borderless ">
                        <tbody>
                          <InfoMiniCard
                            title="Instructors"
                            icon="bi bi-person-fill"
                            count={counts?.users?.instructors}
                          />
                          <InfoMiniCard
                            title="Scholars"
                            icon="bi bi-person-fill"
                            count={counts?.users?.scholars}
                          />
                          <InfoMiniCard
                            title="Students"
                            icon="bi bi-person-fill"
                            count={counts?.users?.student}
                          />
                          <InfoMiniCard
                            title="Families"
                            icon="bi bi-person-fill"
                            count={counts?.users?.family}
                          />

                          <InfoMiniCard
                            title="Others"
                            icon="bi bi-person-fill"
                            count={counts?.users?.others}
                          />
                        </tbody>
                      </table>
                    </div>
                    <div className="col-lg-6">
                      <table className="table table-borderless ">
                        <tbody>
                          <InfoMiniCard
                            title="Feedbacks"
                            icon="bi bi-person-fill"
                            count={counts?.feedbacks}
                          />
                          <InfoMiniCard
                            title="Testimonies"
                            icon="bi bi-person-fill"
                            count={counts?.testimony}
                          />
                          <InfoMiniCard
                            title="Subjects"
                            icon="bi bi-person-fill"
                            count={counts?.subjects}
                          />
                          <InfoMiniCard
                            title="Equipement"
                            icon="bi bi-person-fill"
                            count={counts?.equipment}
                          />
                          <InfoMiniCard
                            title="Gallary"
                            icon="bi bi-person-fill"
                            count={counts?.gallary}
                          />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card top-selling overflow-auto">
                <div className="card-body pb-4" style={{ minHeight: "25rem" }}>
                  <h5 className="card-title">System status in Chart</h5>

                  <Bar options={options} data={data} />
                  {/* <Line options={options} data={data} /> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* //<NiceLayout> */}
    </>
  );
}

export default Dashboard;
