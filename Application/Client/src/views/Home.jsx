import { redirect } from "react-router-dom";
import HttpService from "../services/http/HttpService";
import { useCurrentUser } from "../hooks/User/useCurrentUser";
import ButtonWith2ParagraphsAbove from "../components/Home/ButtonWith2ParagraphsAbove";

const DisplayedButtons = [
  {
    heading: "Напазарува ли?",
    paragraph: "добави продуктите в хладилника",
    forwardTo: "/fridge",
    buttonText: "Хладилник",
  },
  {
    heading: "Търсиш рецепта?",
    paragraph: "разгледай нашите предложения",
    forwardTo: "/find-recipe",
    buttonText: "Открий рецепта",
  },
  {
    heading: "Откри нова рецепта?",
    paragraph: "добави я, и я сподели с приятели",
    forwardTo: "/my-recipes",
    buttonText: "Моите рецепти",
  },
];

export default function Home() {
  const { isLoading, error, data } = useCurrentUser();

  if (isLoading) return <div className="pt-20 text-center">Loading...</div>;
  if (error)
    return (
      <div className="pt-20 text-center">
        Server Error. Please contact administrator.
      </div>
    );

  return (
    <div className="pt-20 text-center flex flex-col justify-around h-screen">
      <h2>
        Здравей,
        <br /> {data.data.username}
      </h2>

      {DisplayedButtons.map((info) => {
        return (
          <ButtonWith2ParagraphsAbove
            p1={info.heading}
            p2={info.paragraph}
            linkTo={info.forwardTo}
            btnText={info.buttonText}
          />
        );
      })}
    </div>
  );
}

export async function loader() {
  const api = HttpService.getInstance();

  try {
    await api.User.sendTestAuthRequest();
  } catch (error) {
    return redirect("/auth/login");
  }

  return null;
}
