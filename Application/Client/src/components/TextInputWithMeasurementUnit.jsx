export default function TextInputWithMeasurementUnit({
  label,
  placeholder,
  value,
  setValue,
  unit,
  className,
}) {
  return (
    <div
      className={
        className +
        " relative flex flex-col items-center justify-center font-montserrat w-full"
      }
    >
      <label className="text-app-darkBlue">{label}</label>
      <input
        className="text-center text-app-darkBlue placeholder:text-app-darkBlue placeholder:italic placeholder:font-light border border-app-darkBlue rounded-3xl p-2 w-full text-lg px-4"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <span className="absolute bottom-[0.6rem] right-6 text-xl font-montserrat italic font-light">
        {unit}
      </span>
    </div>
  );
}
