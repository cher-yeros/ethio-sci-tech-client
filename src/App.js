import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import Courses from "./components/Courses";
import Apparatus from "./components/Apparatus";
import Gallery from "./components/Gallery";
import Testimony from "./components/Testimony";
import Teachers from "./components/Teachers";
import AboutUs from "./components/AboutUs";
import Header from "./components/Layout/Header";
import SingleCourse from "./components/SingleCourse";
import Mission from "./components/Mission";
import Vision from "./components/Vision";
import AddOthersCourse from "./components/AddOthersCourse";
import Dashboard from "./Admin/Dashboard";
import Layout from "./Admin/Layout";
import Apparatuses from "./Admin/Apparatus";
import ManageCourses from "./Admin/Courses";
import Orders from "./Admin/Orders";
import OthersCourses from "./Admin/OthersCourse";
import Subjects from "./Admin/Subjects";
import Testimonies from "./Admin/Testimonies";
import Users from "./Admin/Users";
import EditCourse from "./Admin/EditCourse";
import EditSubject from "./Admin/EditSubject";
import EditApparatus from "./Admin/EditApparatus";
import Projects from "./Admin/Projects";
import Feedbacks from "./Admin/Feedbacks";
import EditProject from "./Admin/EditProject";
import RequireAuth, { Authenticated } from "./RequireAuth";
import Team from "./Admin/Team";
import Gallary from "./Admin/Gallary";
import Instructors from "./Admin/Instructors";
import ManageAboutUs from "./Admin/AboutUs";
import Goal from "./components/Goal";
import Teams from "./components/Teams";
import Equipment from "./components/Equipement";
import KidsCourses from "./components/KidsCourse";
import SingleKidsCourse from "./components/SingleKidsCourse";
import NiceLayout from "./Admin/Layout/NiceLayout";
import TestingClass from "./TestingClass";
import MyProfile from "./pages/MyProfile";
import Error404Page from "./pages/Error404Page";
import AdminProfile from "./Admin/Layout/AdminProfile";

function App() {
  return (
    <>
      {/*<Header />*/}
      <Router>
        <Routes>
          <Route path="/test" element={<TestingClass />} />
          <Route path="/nice" element={<NiceLayout />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/apparatus" element={<Apparatus />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/kids-courses" element={<KidsCourses />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimony" element={<Testimony />} />
          <Route path="/instructors" element={<Teachers />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/goal" element={<Goal />} />
          <Route path="/team" element={<Teams />} />
          {/*<Route path="/layout" element={<Layout />} />*/}

          <Route path="/course/:subject" element={<SingleCourse />} />
          <Route path="/kids-course/:category" element={<SingleKidsCourse />} />
          <Route path="/profile" element={<AddOthersCourse />} />

          <Route element={<Authenticated />}>
            <Route path="/my-profile" element={<MyProfile />} />
          </Route>

          <Route element={<NiceLayout />}>
            <Route element={<RequireAuth allowedRoles={["admin"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/edit-course/:id" element={<EditCourse />} />

              <Route path="/manage-apparatus" element={<Apparatuses />} />
              <Route path="/edit-apparatus/:id" element={<EditApparatus />} />

              <Route path="/manage-courses" element={<ManageCourses />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/manage-others-course" element={<OthersCourses />} />

              <Route path="/manage-subjects" element={<Subjects />} />
              <Route path="/edit-subject/:id" element={<EditSubject />} />

              <Route path="/manage-testimonies" element={<Testimonies />} />
              <Route path="/manage-users" element={<Users />} />
              <Route path="/manage-projects" element={<Projects />} />
              <Route path="/edit-project/:id" element={<EditProject />} />
              <Route path="/manage-feedbacks" element={<Feedbacks />} />

              <Route path="/manage-team" element={<Team />} />
              <Route path="/manage-gallary" element={<Gallary />} />
              <Route path="/manage-about-us" element={<ManageAboutUs />} />
              <Route path="/manage-instructors" element={<Instructors />} />
              <Route path="/user-profile" element={<AdminProfile />} />
            </Route>
          </Route>

          <Route path="*" element={<Error404Page />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
