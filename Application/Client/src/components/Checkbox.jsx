export default function Checkbox({
  label,
  id,
  value,
  rhfRegister,
  disabled = false,
}) {
  return (
    <div className="flex flex-row items-center justify-start font-montserrat w-full gap-2">
      <input
        type="checkbox"
        id={id}
        value={value}
        {...rhfRegister}
        disabled={disabled}
      />
      <label htmlFor={id} className="text-app-darkBlue cursor-pointer">
        {label}
      </label>
    </div>
  );
}
