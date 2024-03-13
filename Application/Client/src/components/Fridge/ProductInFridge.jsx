import { shortenMeasurementUnit } from "../../utils/dataTransform";

export default function ProductInFridge({ product, selectProduct }) {
  const shortenedMeasurementUnit = shortenMeasurementUnit(
    product.product.measurementUnit
  );
  return (
    <div
      onClick={selectProduct}
      className="w-full border border-app-darkBlue rounded-3xl py-2 px-4 flex justify-between items-center text-app-lightBlue text-lg uppercase font-bold"
    >
      <span>{product.product.name}</span>
      <span>
        {product.amount} {shortenedMeasurementUnit}.
      </span>
    </div>
  );
}
