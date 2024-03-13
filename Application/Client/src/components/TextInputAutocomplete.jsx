import { useRef, useState } from "react";
import { useOutsideClick } from "../hooks/Utils/useOutsideClick.js";

export default function TextInputAutocomplete({
  label,
  placeholder,
  rhfRegister,
  value,
  autocomplete,
  setValue,
  className,
}) {
  const [currentValue, setCurrentValue] = useState(value);
  const [autocompleteOpened, setAutocompleteOpened] = useState(false);

  const autocompleteRef = useRef(null);
  useOutsideClick(autocompleteRef, () => setAutocompleteOpened(false));

  return (
    <div
      className={
        className +
        " relative flex flex-col items-center justify-center font-montserrat w-full"
      }
    >
      <label className="text-app-darkBlue">{label}</label>
      <input
        autoComplete="off"
        className="z-20 text-center text-app-darkBlue placeholder:text-app-darkBlue placeholder:italic placeholder:font-light border border-app-darkBlue rounded-3xl p-2 w-full text-lg px-4"
        placeholder={placeholder}
        type="text"
        {...rhfRegister}
        onChange={(e) => {
          setCurrentValue(e.target.value);
        }}
        onFocus={(e) => {
          setAutocompleteOpened(true);
        }}
      />
      {autocompleteOpened && (
        <div
          ref={autocompleteRef}
          className="select-autocomplete absolute top-[42px] bg-white max-h-52 overflow-auto w-full border border-app-darkBlue rounded-b-3xl p-4 pt-[32px] z-10"
        >
          {autocomplete.map((target) => {
            if (
              currentValue === undefined ||
              target.toLowerCase().includes(currentValue.toLowerCase())
            ) {
              return (
                <p
                  key={target}
                  className="text-center font-montserrat text-lg p-1 border-b-2"
                  onClick={(e) => {
                    setAutocompleteOpened(false);
                    setValue(target);
                  }}
                >
                  {target}
                </p>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
