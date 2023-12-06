import { useLayoutEffect } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import HttpService from "../../services/http/HttpService";
import { useTranslation } from "react-i18next";
import MultiLangSelect from "../../components/Header/MultiLangSelect";

export default function Register() {
  const { t } = useTranslation();
  const data = useActionData();

  useLayoutEffect(() => {
    document.body.classList.add("bg-app-gradientBg");
  });

  return (
    <div className="w-full h-full py-12 md:py-4">
      <div className="absolute right-4">
        <MultiLangSelect />
      </div>
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
            required
            onInvalid={(e) =>
              e.target.setCustomValidity(t("Please enter a valid email"))
            }
            onInput={(e) => e.target.setCustomValidity("")}
          ></input>
          {data && data.email ? (
            <span className="text-center text-app-darkBlue font-bold h-4 block text-sm  max-w-xs">
              {t(data.email)}
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
            required
            pattern="^(?=.*[A-Za-z])(?=.*\d).{8,}$"
            onInvalid={(e) =>
              e.target.setCustomValidity(
                t(
                  "Password must be at least 8 characters long and must contain at least 1 letter and 1 number"
                )
              )
            }
            onInput={(e) => e.target.setCustomValidity("")}
          ></input>
          {data && data.password ? (
            <span className="text-center text-app-darkBlue font-bold h-4 block text-sm  max-w-xs">
              {t(data.password)}
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
            required
            onInvalid={(e) =>
              e.target.setCustomValidity(t("Please fill out this field"))
            }
            onInput={(e) => e.target.setCustomValidity("")}
          ></input>
          {data && data.username ? (
            <span className="text-center text-app-darkBlue font-bold h-4 block">
              {t(data.username)}
            </span>
          ) : (
            <span className="h-4 block"></span>
          )}
        </label>
        <label className="input-field text-center">
          <p>Приемам и се съгласявам с общите условия</p>
          <input
            type="checkbox"
            name="terms"
            required
            onInvalid={(e) =>
              e.target.setCustomValidity(
                t("Please, confirm that you agree to the site's policy")
              )
            }
            onInput={(e) => e.target.setCustomValidity("")}
          ></input>
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

    console.log(error);
    console.log(error.code);
    console.log(error.data);
    if (error.code === 400 && error.data) {
      error.data.forEach((err) => {
        errors[err.label] = err.message;
      });

      return errors;
    }

    return null;
  }
}
