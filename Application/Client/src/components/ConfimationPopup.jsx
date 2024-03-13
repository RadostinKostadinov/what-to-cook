import { useState } from "react";
import Title from "./Title";
import Button from "./Button";

export default function ConfirmationPopup({
  title,
  text,
  onConfirm,
  onCancel,
}) {
  const [isRequestSent, setIsRequestSent] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full h-screen animate-fadeInBackground bg-app-lightBlue40 z-50 overflow-hidden">
      <div className="mt-24 bg-white border-2 rounded-3xl border-app-darkBlue w-[80%] p-8 mx-auto text-center animate-slideInFromTop">
        <Title text={title}></Title>

        <p className="my-8">{text}</p>

        <div className="flex flex-col items-center gap-4">
          <Button
            className="bg-gradient-to-t from-app-darkBlue to-app-lightBlue"
            btnText={isRequestSent ? "Запазване..." : "Потвърди"}
            clickEvent={(e) => {
              e.preventDefault();
              setIsRequestSent(true);
              onConfirm();
            }}
          ></Button>

          <Button
            className="bg-gradient-to-t from-app-yellow to-app-yellow"
            btnText="Откажи"
            clickEvent={(e) => {
              e.preventDefault();
              onCancel();
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
}
