import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import {
  Container,
  Footer,
  Footerbar,
  Header,
  Layout,
  Main,
  Navbar,
} from "./components/layouts";
import BookingPage from "./pages/BookingPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import MoreInfoPage from "./pages/MoreInfoPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserRegPage from "./pages/UserRegPage";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Header className={"bg-gray-100"}>
            <Container
              pageTitle="React TS Starter"
              FULL
              className={"flex justify-center"}
            >
              <Navbar className={"w-11/12 xl:w-4/5"} />
            </Container>
          </Header>
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/reg" element={<UserRegPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/more-info" element={<MoreInfoPage />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </Main>
          <Footer className={"bg-gray-200"}>
            <Footerbar />
          </Footer>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
