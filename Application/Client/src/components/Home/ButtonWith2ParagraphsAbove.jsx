import { Link } from "react-router-dom";

export default function ButtonWith2ParagraphsAbove({
  p1,
  p2,
  linkTo,
  btnText,
}) {
  return (
    <div className="flex flex-col items-center">
      <p className="bg-clip-text bg-gradient-to-b from-app-red to-app-orange uppercase font-bold italic text-transparent">
        {p1}
      </p>
      <p className="mb-2 text-sm bg-clip-text bg-gradient-to-b from-app-red to-app-orange lowercase font-bold italic text-transparent">
        {p2}
      </p>
      <Link className="button-orange w-8/12" to={linkTo}>
        {btnText}
      </Link>
    </div>
  );
}
