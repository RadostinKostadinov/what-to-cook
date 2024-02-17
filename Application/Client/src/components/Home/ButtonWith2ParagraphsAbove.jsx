import { Link } from "react-router-dom";
import Title from "../Title";

export default function ButtonWith2ParagraphsAbove({
  p1,
  p2,
  linkTo,
  btnText,
}) {
  return (
    <div className="flex flex-col items-center">
      <Title text={p1}></Title>
      <p className="mb-2 text-sm bg-clip-text bg-gradient-to-b from-app-red to-app-orange lowercase font-bold italic text-transparent">
        {p2}
      </p>
      <Link className="button-orange w-8/12" to={linkTo}>
        {btnText}
      </Link>
    </div>
  );
}
