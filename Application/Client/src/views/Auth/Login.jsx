import { useLayoutEffect } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import HttpService from "../../services/http/HttpService.js";
import { useTranslation } from "react-i18next";
import MultiLangSelect from "../../components/Header/MultiLangSelect.jsx";

export default function Login() {
  const { t } = useTranslation();
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

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
            autoComplete="current-password"
            className="w-72 md:w-80"
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
            <span className="text-center text-app-darkBlue font-bold h-4 block text-sm max-w-xs">
              {t(data.password)}
            </span>
          ) : (
            <span className="h-4 block"></span>
          )}
        </label>
        <button
          disabled={isSubmitting}
          className="button-white w-40 mx-auto my-4"
          type="submit"
        >
          Вход
        </button>
      </Form>

      <Link
        className="block text-center text-app-darkBlue underline w-max mx-auto"
        to="/forgot-password"
      >
        Забравена парола
      </Link>

      <div className="text-center mt-8 md:mt-4">
        <p className="text-white">Нямате регистрация?</p>
        <p className="text-white">Може да се регистрирате от тук</p>
        <Link className="button-white w-56 mx-auto mt-2" to="/auth/register">
          Регистрация
        </Link>
      </div>
    </div>
  );
}

export async function action({ request, params, context }) {
  const userData = await request.formData();

  const email = userData.get("email");
  const password = userData.get("password");

  const credentials = { email, password };

  try {
    const api = HttpService.getInstance();
    await api.User.sendLoginRequest(credentials);

    return redirect("/");
  } catch (error) {
    const errors = {};

    if (error.code === 400 && error.data) {
      error.data.forEach((err) => {
        errors[err.label] = err.message;
      });

      return errors;
    }

    return null;
  }
}

export async function loader({ request }) {
  const api = HttpService.getInstance();

  try {
    await api.User.sendTestAuthRequest();
    return redirect("/");
  } catch (error) {
    return null;
  }
}

export function shouldRevalidate(data) {
  return data.formAction !== "/auth/login";
}
