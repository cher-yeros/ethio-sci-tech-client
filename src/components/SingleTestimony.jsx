import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { approvedTestimonies } from "../redux/apis/manage-testimony";

function SingleTestimony() {
  const dispatch = useDispatch();
  const testimonies = useSelector(
    (state) => state.testimony.approvedTestimonies
  );
  useEffect(() => {
    fetchTestimonies();
  }, []);

  const fetchTestimonies = async () => {
    await approvedTestimonies(dispatch);
  };
  const events = {
    onDragged: function (event) {},
    onChanged: function (event) {},
  };
  const options = {
    items: testimonies.length > 4 ? 3 : 1,
    nav: true,
    autoplay: true,
    loop: true,
    stagePadding: 2,
    navText: ["next", "prev"],
    autoPlayHoverPause: false,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
      },
    },
  };
  return (
    <>
      {testimonies.length > 0 && (
        <Container className="img-bg img-testimonies" fluid>
          <Row className="pt-3">
            <div className="col-md-12">
              <div className="section-heading" style={{ marginBottom: "0" }}>
                <h2 style={{ marginTop: "0" }}>Testimonials</h2>
              </div>
            </div>
            <section
              id="testimonials"
              class="testimonials"
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
                  style={{ paddingRight: "2rem", paddingLeft: "1.9rem" }}
                  modules={[Pagination, Autoplay, Navigation]}
                  spaceBetween={10}
                  slidesPerView="auto"
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  loop
                  navigation={{
                    nextEl: ".swiper-button-next-testimony",
                    prevEl: ".swiper-button-prev-testimony",
                  }}
                  pagination={{
                    el: ".swiper-pagination",
                    type: "bullets",
                    clickable: true,
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 40,
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
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {testimonies.map((testimony) => (
                    <SwiperSlide key={testimony.id}>
                      <div class="testimonial-wrap">
                        <div class="testimonial-item">
                          <div class="d-flex align-items-center">
                            <img
                              crossOrigin="anonymous"
                              src="/images/team/team-1.jpg"
                              class="testimonial-img flex-shrink-0"
                              alt=""
                            />
                            <div>
                              <h3>{testimony.name}</h3>
                              <h4>{testimony.role}</h4>
                              <div class="stars">
                                {/* <Rating
                                  name="size-small"
                                  defaultValue={2}
                                  size="small"
                                /> */}
                                {/* <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i> */}
                              </div>
                            </div>
                          </div>
                          <p>
                            <i class="bi bi-quote quote-icon-left"></i>
                            {testimony.description}
                            <i class="bi bi-quote quote-icon-right"></i>
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="swiper-pagination" />

                <div class="swiper-button-prev-testimony"></div>
                <div class="swiper-button-next-testimony"></div>
              </div>
            </section>
          </Row>
        </Container>
      )}
    </>
  );
}

export default SingleTestimony;
