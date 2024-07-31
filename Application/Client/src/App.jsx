import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import Home from "./views/Home";
import Fridge from "./views/Fridge.jsx";
import { default as FridgeLowAmount } from "./views/Fridge/LowAmount.jsx";
import { default as FridgeHistory } from "./views/Fridge/History.jsx";
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
import MyRecipes from "./views/MyRecipes.jsx";
import Recipe from "./views/MyRecipes/Recipe.jsx";
import FindRecipe from "./views/FindRecipe.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} loader={AuthLoader}>
        <Route index element={<Home />} />
        <Route path="fridge">
          <Route index element={<Fridge />} />
          <Route path="low-amount" element={<FridgeLowAmount />} />
          <Route path="history" element={<FridgeHistory />} />
        </Route>
        <Route path="my-recipes">
          <Route index element={<MyRecipes />}></Route>
          <Route path="recipe" element={<Recipe />}></Route>
        </Route>
        <Route path="find-recipe">
          <Route index element={<FindRecipe />}></Route>
        </Route>
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
