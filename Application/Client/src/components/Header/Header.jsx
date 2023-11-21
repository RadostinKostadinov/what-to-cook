import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HttpService from "../../services/http/HttpService";
import MultiLangSelect from "./MultiLangSelect";

export default function Header() {
  const [isHeaderOpened, setIsHeaderOpened] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="w-full h-18 bg-app-gradientBg py-2 ps-2 pe-4 shadow-header absolute z-50 top-0">
        <div className="relative h-full w-full flex justify-between items-center">
          <Link to="/" onClick={() => setIsHeaderOpened(false)}>
            <img
              src="/images/Logo.png"
              alt="App logo"
              className="w-14 object-cover"
            />
          </Link>
          <img
            src={
              isHeaderOpened
                ? "/images/menu-opened.svg"
                : "/images/menu-closed.svg"
            }
            alt="App logo"
            className="h-6 object-cover cursor-pointer"
            onClick={() => setIsHeaderOpened((previous) => !previous)}
          />
        </div>
      </header>
      {isHeaderOpened && (
        <div className="w-full h-full top-0 bg-app-lightBlue bg-opacity-40 absolute z-40 pt-18">
          <div className="relative py-28 flex flex-col justify-between items-center h-full">
            <div className="absolute top-12">
              <MultiLangSelect />
            </div>
            <Link
              className="button-orange w-8/12"
              to="/"
              onClick={() => setIsHeaderOpened(false)}
            >
              Начало
            </Link>
            <div className="flex flex-col gap-8 justify-between items-center w-full">
              <Link
                className="button-orange w-8/12"
                to="/my-recipes"
                onClick={() => setIsHeaderOpened(false)}
              >
                Моите рецепти
              </Link>
              <Link
                className="button-orange w-8/12"
                to="/fridge"
                onClick={() => setIsHeaderOpened(false)}
              >
                Хладилник
              </Link>
            </div>
            <div className="flex flex-col gap-8 justify-between items-center w-full">
              <Link
                className="button-orange w-8/12"
                to="/find-recipe"
                onClick={() => setIsHeaderOpened(false)}
              >
                Открий рецепта
              </Link>
            </div>
            <button
              className="button-orange w-8/12"
              onClick={async () => {
                const api = HttpService.getInstance();
                await api.User.sendLogoutRequest();
                navigate("/auth/login");
              }}
            >
              Изход
            </button>
          </div>
        </div>
      )}
    </>
  );
}
