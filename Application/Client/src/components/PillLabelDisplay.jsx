export default function PillLabelDisplay({ label, value, wrapperClassName }) {
    return (
        <div className={"flex flex-col items-center justify-center font-montserrat " + wrapperClassName}>
            <label className="text-sm text-app-lightBlue text-center">{label}</label>
            <span className="text-sm text-app-darkBlue border w-full text-center border-app-darkBlue rounded-3xl p-2 uppercase">{value}</span>
        </div>
    );
}