import { measurementUnitMappings } from "../constants";

export function shortenMeasurementUnit(measurementUnit) {
  if (Object.hasOwn(measurementUnitMappings, measurementUnit)) {
    return measurementUnitMappings[measurementUnit];
  }

  return measurementUnit;
}
