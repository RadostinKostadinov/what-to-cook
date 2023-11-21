import { useLayoutEffect } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import HttpService from "../../services/http/HttpService";

export default function Register() {
  const data = useActionData();

  useLayoutEffect(() => {
    document.body.classList.add("bg-app-gradientBg");
  });

  return (
    <div className="w-full h-full py-12 md:py-4">
      <img
        src="/images/Logo.png"
        alt="App-logo"
        className="max-h-60 mb-8 ml-auto mr-auto"
      />

      <Form method="post" className="flex flex-col items-center gap-4">
        <label className="input-field text-center">
          <p>Имейл</p>
          <input
            type="email"
            name="email"
            className="w-72 md:w-80"
            autoComplete="email"
          ></input>
          {data && data.email ? (
            <span className="text-center text-app-darkBlue font-bold h-4 block">
              {data.email}
            </span>
          ) : (
            <span className="h-4 block"></span>
          )}
        </label>
        <label className="input-field text-center">
          <p>Парола</p>
          <input
            type="password"
            name="password"
            className="w-72 md:w-80"
            autoComplete="current-password"
          ></input>
          {data && data.password ? (
            <span className="text-center text-app-darkBlue font-bold h-4 block">
              {data.password}
            </span>
          ) : (
            <span className="h-4 block"></span>
          )}
        </label>
        <label className="input-field text-center">
          <p>Потребителско име</p>
          <input
            type="text"
            name="username"
            className="w-72 md:w-80"
            autoComplete="username"
          ></input>
          {data && data.username ? (
            <span className="text-center text-app-darkBlue font-bold h-4 block">
              {data.username}
            </span>
          ) : (
            <span className="h-4 block"></span>
          )}
        </label>
        <label className="input-field text-center">
          <p>Приемам и се съгласявам с общите условия</p>
          <input type="checkbox" name="terms"></input>
        </label>
        <button
          className="button-white w-56 mx-auto mt-9 md:mt-15"
          type="submit"
        >
          Регистрация
        </button>
      </Form>
    </div>
  );
}

export async function action({ request, params, context }) {
  const userData = await request.formData();

  const email = userData.get("email");
  const password = userData.get("password");
  const username = userData.get("username");

  const credentials = { email, password, username };

  try {
    const api = HttpService.getInstance();
    await api.User.sendRegisterRequest(credentials);

    return redirect("/");
  } catch (error) {
    const errors = {};

    if (error.message.toLowerCase().includes("email")) {
      errors.email = "Невалиден имейл.";
    }
    if (error.message.toLowerCase().includes("password")) {
      errors.password = "Невалидна парола.";
    }
    if (error.message.toLowerCase().includes("username")) {
      errors.username = "Невалидно потребителско име.";
    }

    return errors;
  }
}
