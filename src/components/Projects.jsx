import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllProject } from "../redux/apis/manage-projects";
import moment from "moment";
import { apiUrl } from "../utils/api";
import ReadMore from "../utils/ReadMore";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

function Projects() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.project.project);
  const { projects } = response;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getAllProject(dispatch);
  };
  return (
    <>
      {projects.length > 0 && (
        <Container className="img-bg pt-5" style={{ paddingTop: "1rem" }} fluid>
          <div className="col-md-12 pb-4">
            <div className="section-heading" style={{ marginBottom: "0" }}>
              <h2 style={{ marginTop: "0" }}>Projects</h2>
            </div>
          </div>
          <section
            id="projects"
            class="projects"
            style={{ position: "relative" }}
          >
            <div class="container" data-aos="fade-up">
              {/* <div class="section-title">
                <p>
                  Voluptatem quibusdam ut ullam perferendis repellat non ut
                  consequuntur est eveniet deleniti fignissimos eos quam Lorem
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatem minima error amet deleniti ex explicabo! Itaque
                  iste quisquam cumque atque?
                </p>
              </div> */}

              <Swiper
                // style={{ paddingRight: "rem", paddingLeft: "3rem" }}
                modules={[Pagination, Autoplay, Navigation]}
                spaceBetween={10}
                slidesPerView="auto"
                // centeredSlides
                centerInsufficientSlides
                // autoplay={{ delay: 5000, disableOnInteraction: false }}
                // loop
                navigation={{
                  nextEl: ".swiper-button-next-unique",
                  prevEl: ".swiper-button-prev-unique",
                }}
                // pagination={{
                //   el: ".swiper-pagination",
                //   type: "bullets",
                //   clickable: true,
                // }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 160,
                  },
                  480: {
                    slidesPerView: 1,
                    spaceBetween: 60,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  992: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
              >
                {projects.map((project) => (
                  <SwiperSlide key={project.id}>
                    <div className="item card">
                      <img
                        src={`${apiUrl}/static/project/${project.photo}`}
                        alt="Course #2"
                      />
                      <div className="down-content" style={{ padding: "1rem" }}>
                        <h4 className="text-center">{project.name}</h4>
                        <h6 className="d-flex align-items-center">
                          <i
                            className="bi bi-geo-alt-fill"
                            style={{
                              fontSize: "1.2rem",
                              color: "#2080d3",
                              marginRight: "10px",
                            }}
                          ></i>
                          <span>{project.location}</span>
                        </h6>
                        <h6 className="d-flex align-items-center">
                          <i
                            className="bi bi-calendar2-week-fill"
                            style={{
                              fontSize: "1.2rem",
                              color: "#2080d3",
                              marginRight: "10px",
                            }}
                          ></i>
                          <span>
                            {moment(project.startDate).format("MMM Do, YYYY")}
                          </span>
                        </h6>

                        <p>
                          <ReadMore
                            text={project.description}
                            length={70}
                            title={<strong>description</strong>}
                          />
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div class="swiper-button-prev-unique"></div>
              <div class="swiper-button-next-unique"></div>
            </div>
          </section>
        </Container>
      )}
    </>
  );
}

export default Projects;
