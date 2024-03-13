export default function TextInput({
  label,
  placeholder,
  rhfRegister,
  disabled = false,
}) {
  return (
    <div className="flex flex-col items-center justify-center font-montserrat w-full">
      <label className="text-app-darkBlue">{label}</label>
      <input
        autoComplete="off"
        disabled={disabled}
        className="text-center text-app-darkBlue placeholder:text-app-darkBlue placeholder:italic placeholder:font-light border border-app-darkBlue rounded-3xl p-2 w-full text-lg px-4"
        placeholder={placeholder}
        type="text"
        {...rhfRegister}
      />
    </div>
  );
}
