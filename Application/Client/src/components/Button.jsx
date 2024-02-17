import { Link } from "react-router-dom";

export default function Button({ btnText, clickEvent, className }) {
  return (
    <button
      className={"button-orange w-8/12 " + className}
      onClick={(e) => {
        clickEvent();
      }}
    >
      {btnText}
    </button>
  );
}
