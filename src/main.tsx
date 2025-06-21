import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";

import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";
import AuthProvider from "./contexts/AuthContext.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import EmployeesPage from "./pages/EmployeesPage.tsx";
import TeamsPage from "./pages/TeamsPage.tsx";
import TeamPage from "./pages/TeamPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import ProjectPage from "./pages/ProjectPage.tsx";
import MeetingsPage from "./pages/MeetingsPage.tsx";
import MeetingPage from "./pages/MeetingPage.tsx";
import CheckPresencePage from "./pages/CheckPresencePage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/employees", element: <EmployeesPage /> },
      { path: "/teams", element: <TeamsPage /> },
      { path: "/teams/:teamId", element: <TeamPage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/projects/:projectId", element: <ProjectPage /> },
      { path: "/meetings", element: <MeetingsPage /> },
      { path: "/meetings/:meetingId", element: <MeetingPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/check-presence",
    element: <CheckPresencePage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          border: "2px solid oklch(0.623 0.214 259.815)",
          background: "white",
          color: "black",
        },
      }}
    />
  </StrictMode>,
);
