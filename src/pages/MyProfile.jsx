import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";

function MyProfile() {
  const { user } = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Header />
      <section
        style={{ marginTop: "4rem" }}
        className="section courses img-bg"
        data-section="section4"
      >
        <Container style={{ paddingTop: "1rem" }} fluid>
          <section class="contact section my-profile profile">
            <div class="row">
              <div class="col-xl-4">
                <div
                  class="card"
                  style={{
                    backgroundColor: "rgba(250, 250, 250, 0.1)",
                    padding: "30px",
                    width: "100%",
                  }}
                >
                  <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
                    <img
                      src="images/profile-img.jpg"
                      alt="Profile"
                      class="rounded-circle"
                    />
                    <h2>{user.name}</h2>
                    <h3>{user.role}</h3>
                    <div class="social-links mt-2">
                      <a href="#" class="twitter">
                        <i class="bi bi-twitter"></i>
                      </a>
                      <a href="#" class="facebook">
                        <i class="bi bi-facebook"></i>
                      </a>
                      <a href="#" class="instagram">
                        <i class="bi bi-instagram"></i>
                      </a>
                      <a href="#" class="linkedin">
                        <i class="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-8">
                <div
                  class="card"
                  style={{
                    backgroundColor: "rgba(250, 250, 250, 0.1)",
                    padding: "30px",
                    width: "100%",
                  }}
                >
                  <div class="card-body pt-3">
                    <ul class="nav nav-tabs nav-tabs-bordered">
                      <li class="nav-item">
                        <button
                          class="nav-link active"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-overview"
                        >
                          Profile Overview
                        </button>
                      </li>

                      <li class="nav-item">
                        <button
                          class="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#my-videos"
                        >
                          My videos
                        </button>
                      </li>

                      <li class="nav-item">
                        <button
                          class="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-edit"
                        >
                          Edit Profile
                        </button>
                      </li>

                      <li class="nav-item">
                        <button
                          class="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-change-password"
                        >
                          Change Password
                        </button>
                      </li>
                    </ul>
                    <div class="tab-content pt-2">
                      {ProfileOverview(user)}

                      {ProfileEdit()}

                      {ChangePassword()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </section>
    </>
  );
}

export default MyProfile;
function ChangePassword() {
  return (
    <div class="tab-pane fade pt-3" id="profile-change-password">
      <form style={{ background: "none" }}>
        <div class="row mb-3">
          <label
            for="currentPassword"
            class="col-md-4 col-lg-3 col-form-label label"
          >
            Current Password
          </label>
          <div class="col-md-8 col-lg-9">
            <input
              name="password"
              type="password"
              class="form-control"
              id="currentPassword"
            />
          </div>
        </div>

        <div class="row mb-3">
          <label
            for="newPassword"
            class="col-md-4 col-lg-3 col-form-label label"
          >
            New Password
          </label>
          <div class="col-md-8 col-lg-9">
            <input
              name="newpassword"
              type="password"
              class="form-control"
              id="newPassword"
            />
          </div>
        </div>

        <div class="row mb-3">
          <label
            for="renewPassword"
            class="col-md-4 col-lg-3 col-form-label label"
          >
            Re-enter New Password
          </label>
          <div class="col-md-8 col-lg-9">
            <input
              name="renewpassword"
              type="password"
              class="form-control"
              id="renewPassword"
            />
          </div>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}

function ProfileEdit() {
  return (
    <div class="tab-pane fade profile-edit pt-3" id="profile-edit">
      <form style={{ background: "none" }}>
        <div class="row mb-3">
          <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">
            Profile Image
          </label>
          <div class="col-md-8 col-lg-9">
            <img src="images/profile-img.jpg" alt="Profile" />
            <div class="pt-2">
              <a
                href="#"
                class="btn btn-primary btn-sm"
                title="Upload new profile image"
              >
                <i class="bi bi-upload"></i>
              </a>
              <a
                href="#"
                class="btn btn-danger btn-sm"
                title="Remove my profile image"
              >
                <i class="bi bi-trash"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <label for="fullName" class="col-md-4 col-lg-3 col-form-label">
            Full Name
          </label>
          <div class="col-md-8 col-lg-9">
            <input
              name="fullName"
              type="text"
              class="form-control"
              id="fullName"
              value="Kevin Anderson"
            />
          </div>
        </div>

        <div class="row mb-3">
          <label for="about" class="col-md-4 col-lg-3 col-form-label">
            About
          </label>
          <div class="col-md-8 col-lg-9">
            <textarea
              name="about"
              class="form-control"
              id="about"
              style={{ height: "100px" }}
            >
              Sunt est soluta temporibus accusantium neque nam maiores cumque
              temporibus. Tempora libero non est unde veniam est qui dolor. Ut
              sunt iure rerum quae quisquam autem eveniet perspiciatis odit.
              Fuga sequi sed ea saepe at unde.
            </textarea>
          </div>
        </div>

        <div class="row mb-3">
          <label for="company" class="col-md-4 col-lg-3 col-form-label">
            Company
          </label>
          <div class="col-md-8 col-lg-9">
            <input
              name="company"
              type="text"
              class="form-control"
              id="company"
              value="Lueilwitz, Wisoky and Leuschke"
            />
          </div>
        </div>

        <div class="row mb-3">
          <label for="Job" class="col-md-4 col-lg-3 col-form-label">
            Job
          </label>
          <div class="col-md-8 col-lg-9">
            <input
              name="job"
              type="text"
              class="form-control"
              id="Job"
              value="Web Designer"
            />
          </div>
        </div>

        <div class="row mb-3">
          <label for="Country" class="col-md-4 col-lg-3 col-form-label">
            Country
          </label>
          <div class="col-md-8 col-lg-9">
            <input
              name="country"
              type="text"
              class="form-control"
              id="Country"
              value="USA"
            />
          </div>
        </div>

        <div class="row mb-3">
          <label for="Address" class="col-md-4 col-lg-3 col-form-label">
            Address
          </label>
          <div class="col-md-8 col-lg-9">
            <input
              name="address"
              type="text"
              class="form-control"
              id="Address"
              value="A108 Adam Street, New York, NY 535022"
            />
          </div>
        </div>

        <div class="row mb-3">
          <label for="Phone" class="col-md-4 col-lg-3 col-form-label">
            Phone
          </label>
          <div class="col-md-8 col-lg-9">
            <input
              name="phone"
              type="text"
              class="form-control"
              id="Phone"
              value="(436) 486-3538 x29071"
            />
          </div>
        </div>

        <div class="row mb-3">
          <label for="Email" class="col-md-4 col-lg-3 col-form-label">
            Email
          </label>
          <div class="col-md-8 col-lg-9">
            <input
              name="email"
              type="email"
              class="form-control"
              id="Email"
              value="k.anderson@example.com"
            />
          </div>
        </div>

        <div class="row mb-3">
          <label for="Twitter" class="col-md-4 col-lg-3 col-form-label">
            Twitter Profile
          </label>
          <div class="col-md-8 col-lg-9">
            <input
              name="twitter"
              type="text"
              class="form-control"
              id="Twitter"
              value="https://twitter.com/#"
            />
          </div>
        </div>

        <div class="row mb-3">
          <label for="Facebook" class="col-md-4 col-lg-3 col-form-label">
            Facebook Profile
          </label>
          <div class="col-md-8 col-lg-9">
            <input
              name="facebook"
              type="text"
              class="form-control"
              id="Facebook"
              value="https://facebook.com/#"
            />
          </div>
        </div>

        <div class="row mb-3">
          <label for="Instagram" class="col-md-4 col-lg-3 col-form-label">
            Instagram Profile
          </label>
          <div class="col-md-8 col-lg-9">
            <input
              name="instagram"
              type="text"
              class="form-control"
              id="Instagram"
              value="https://instagram.com/#"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

function ProfileOverview(user) {
  return (
    <div
      class="tab-pane fade show active profile-overview"
      id="profile-overview"
    >
      {/* <h5 class="card-title">About</h5>
      <p class="small fst-italic" style={{ color: "white" }}>
        Sunt est soluta temporibus accusantium neque nam maiores cumque
        temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt
        iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed
        ea saepe at unde.
      </p> */}

      <h5 class="card-title">Profile Details</h5>

      <div class="row">
        <div class="col-lg-3 col-md-4 label ">Full Name</div>
        <div class="col-lg-9 col-md-8 preview-label">{user.name}</div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-4 label ">Username</div>
        <div class="col-lg-9 col-md-8 preview-label">{user.username}</div>
      </div>

      {/* <div class="row">
        <div class="col-lg-3 col-md-4 label">Company</div>
        <div class="col-lg-9 col-md-8 preview-label">
          Lueilwitz, Wisoky and Leuschke
        </div>
      </div> */}

      <div class="row">
        <div class="col-lg-3 col-md-4 label">Role</div>
        <div class="col-lg-9 col-md-8 preview-label">{user.role}</div>
      </div>

      <div class="row">
        <div class="col-lg-3 col-md-4 label">Country</div>
        <div class="col-lg-9 col-md-8 preview-label">Ethiopian</div>
      </div>

      {/* <div class="row">
        <div class="col-lg-3 col-md-4 label">Address</div>
        <div class="col-lg-9 col-md-8 preview-label">
          A108 Adam Street, New York, NY 535022
        </div>
      </div> */}

      <div class="row">
        <div class="col-lg-3 col-md-4 label">Phone</div>
        <div class="col-lg-9 col-md-8 preview-label">{user.phone}</div>
      </div>

      <div class="row">
        <div class="col-lg-3 col-md-4 label">Email</div>
        <div class="col-lg-9 col-md-8 preview-label">{user.email}</div>
      </div>
    </div>
  );
}
