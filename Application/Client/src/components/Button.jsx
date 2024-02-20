export default function Button({
  btnText,
  className,
  type = "button",
  disabled = false,
  clickEvent = false,
}) {
  return (
    <button
      className={"button-orange w-8/12 " + className}
      disabled={disabled}
      type={type}
      onClick={(e) => {
        if (clickEvent) {
          clickEvent(e);
        }
      }}
    >
      {btnText}
    </button>
  );
}
