import { Link } from "react-router-dom";
import Button from "../components/Button";
import Title from "../components/Title";
import { useCurrentUserRecipes } from "../hooks/Recipe/useCurrentUserRecipes";

const DisplayedButtons = [
  {
    type: "Link",
    linkTo: "recipe",
    buttonText: "Добави нова",
  },
];

export default function MyRecipes() {
  const { isLoading, error, data: response } = useCurrentUserRecipes();

  if (isLoading) return <div className="pt-20 text-center">Loading...</div>;
  if (error)
    return (
      <div className="pt-20 text-center">
        Server Error. Please contact administrator.
      </div>
    );

  const { recipes } = response.data;

  return (
    <div className="pt-20">
      <h1 className="text-center text-xl py-8">
        <Title text="МОИТЕ РЕЦЕПТИ"></Title>
      </h1>
      <div className="flex flex-col items-center gap-8">
        {DisplayedButtons.map((info) => {
          if (info.type === "Button") {
            return (
              <Button
                key={info.buttonText}
                btnText={info.buttonText}
                clickEvent={info.action}
              ></Button>
            );
          } else if (info.type === "Link") {
            return (
              <Link
                className="button-orange w-8/12"
                to={info.linkTo}
                key={info.buttonText}
              >
                {info.buttonText}
              </Link>
            );
          }
          return "";
        })}
      </div>
      <div className="w-11/12 mx-auto pt-10">
        <p className="text-center text-xl bg-clip-text bg-gradient-to-b from-app-darkBlue to-app-lightBlue uppercase font-bold italic text-transparent font-montserrat">
          Вашите рецепти
        </p>
        <hr className="bg-app-darkBlue my-1"></hr>
        <p className="font-montserrat italic text-center text-base text-app-darkBlue">
          Натиснете върху рецепта, <br></br> за да я редактирате или премахнете
        </p>
      </div>
      <div className="w-11/12 mx-auto pt-10 flex flex-col gap-4 mb-10">
        {recipes.map((recipe) => {
          return (
            <Link key={recipe.image} to={"recipe"} state={recipe}>
              <div className="border border-app-darkBlue rounded-2xl py-2 px-4 min-h-[5rem] flex items-center">
                <p className="text-xl text-app-lightBlue uppercase font-semibold italic break-all">
                  {recipe.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
