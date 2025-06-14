import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import HomePage from "./pages/HomePage.tsx";
import AuthProvider from "./contexts/AuthContext.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import EmployeesPage from "./pages/EmployeesPage.tsx";
import TeamsPage from "./pages/TeamsPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import MeetingsPage from "./pages/MeetingsPage.tsx";

import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/employees", element: <EmployeesPage /> },
      { path: "/teams", element: <TeamsPage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/projects/:projectId", element: <div>Project</div> },
      { path: "/meetings", element: <MeetingsPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
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
