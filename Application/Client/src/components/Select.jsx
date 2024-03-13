export default function Select({
  className,
  values,
  name,
  id,
  placeholder,
  label,
  rhfRegister,
}) {
  return (
    <div
      className={
        "flex flex-col items-center justify-center font-montserrat w-full " +
        className
      }
    >
      <label className="text-app-darkBlue">{label}</label>
      <select
        name={name}
        id={id}
        className={
          "text-center text-app-darkBlue border border-app-darkBlue rounded-3xl p-2 w-full text-lg px-4"
        }
        {...rhfRegister}
      >
        <option value="" className="text-app-darkBlue italic font-light">
          {placeholder}
        </option>
        {values.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
}
