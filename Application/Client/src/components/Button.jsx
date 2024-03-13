export default function Button({
  btnText,
  className,
  type = "button",
  disabled = false,
  clickEvent = false,
  form = null,
}) {
  return (
    <button
      form={form}
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
