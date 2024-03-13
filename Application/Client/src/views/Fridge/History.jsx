import React from "react";
import { useCurrentUserFridge } from "../../hooks/User/useCurrentUserFridge";
import Title from "../../components/Title";
import { shortenMeasurementUnit } from "../../utils/dataTransform";

export default function LowAmount() {
  const { isLoading, error, data: fridge } = useCurrentUserFridge();

  if (isLoading) return <div className="pt-20 text-center">Loading...</div>;
  if (error)
    return (
      <div className="pt-20 text-center">
        Server Error. Please contact administrator.
      </div>
    );

  const latestActivities = fridge.data.activity.slice(0, 20);
  return (
    <div className="pt-20">
      <h1 className="text-center text-xl py-8">
        <Title text="Хладилник"></Title>
        <Title text="История"></Title>
      </h1>
      <div className="w-11/12 mx-auto">
        {latestActivities.map((activity) => {
          const activityInfo = generateActivityData(activity);
          return (
            <div
              key={activity.product.name} // fix this
              className="w-full border border-app-darkBlue rounded-3xl p-4 mb-4 uppercase italic text-lg font-semibold"
            >
              <p className="text-app-darkBlue">{activity.product.name}</p>
              <div className="flex justify-between">
                <span className={`${activityInfo.color} text-app`}>
                  {activity.actionType}
                </span>
                <span className="text-app-darkBlue">
                  КОЛ: {activity.amount}{" "}
                  {shortenMeasurementUnit(activity.product.measurementUnit)}.
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function generateActivityData(acitvity) {
  let color = "";
  switch (acitvity.actionType) {
    case "добавяне":
      color = "text-app-lightBlue";
      break;
    case "редактиране":
      color = "text-app-yellow";
      break;
    case "премахване":
      color = "text-app-red";
      break;
    case "използване":
      color = "text-app-orange";
      break;
    default:
      break;
  }
  return { color };
}
