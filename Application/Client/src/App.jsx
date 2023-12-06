import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import Home from "./views/Home";
import RootLayout from "./layouts/RootLayout";
import Register from "./views/Auth/Register";
import ForgotPassword from "./views/Auth/ForgotPassword";
import NotFound from "./views/NotFound";
import { action as LoginAction } from "./views/Auth/Login";
import { action as RegisterAction } from "./views/Auth/Register";
import { loader as AuthLoader } from "./views/Home";
import Login, {
  loader as LoginLoader,
  shouldRevalidate as LoginRevalidation,
} from "./views/Auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import "./services/multilang-i18n/i18n.js";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} loader={AuthLoader}>
        <Route index element={<Home />} />
        <Route path="fridge" element={<ForgotPassword />} />
        <Route path="my-recipes" element={<ForgotPassword />} />
        <Route path="find-recipe" element={<ForgotPassword />} />
      </Route>
      <Route
        path="/auth"
        element={<AuthLayout />}
        loader={LoginLoader}
        shouldRevalidate={LoginRevalidation}
      >
        <Route path="login" element={<Login />} action={LoginAction} />
        <Route path="register" element={<Register />} action={RegisterAction} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback="loading">
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
