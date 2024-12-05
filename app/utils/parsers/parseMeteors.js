import { dangerousQueryParams } from "../../constants/queryConstants.js";

export const filterMeteors = (data, count, isDangerous) => {
  let result = parseMeteors(data);

  if (isDangerous) {
    result = handleIsDangerous(isDangerous, result);
  }

  if (count) {
    result = handleCount(count, result);
  }

  return result;
};

const parseMeteors = (data) => {
  return Object.values(data).flatMap((day) =>
    day.map((meteor) => ({
      id: meteor.id,
      name: meteor.name,
      diameter_in_meters:
        meteor.estimated_diameter?.meters?.estimated_diameter_max || null,
      is_potentially_hazardous_asteroid:
        meteor.is_potentially_hazardous_asteroid,
      close_approach_date_full:
        meteor.close_approach_data[0]?.close_approach_date_full || null,
      relative_velocity:
        parseFloat(
          meteor.close_approach_data[0]?.relative_velocity
            ?.kilometers_per_second
        ) || null,
    }))
  );
};

const handleIsDangerous = (isDangerous, data) => {
  if (!dangerousQueryParams.includes(isDangerous)) {
    throw new Error(
      `Invalid isDangerous value. Count should be true or false.`
    );
  }

  const flag = isDangerous === "true";

  return data.filter(
    (meteor) => meteor.is_potentially_hazardous_asteroid === flag
  );
};

const handleCount = (count, data) => {
  const parsedCount = parseInt(count);

  if (parsedCount <= 0) {
    throw new Error(`Invalid count value. Count should be greater then zero.`);
  }

  if (isNaN(parsedCount)) {
    throw new Error(`Invalid count value. Count should be number type.`);
  }

  return data.slice(0, parseInt(count));
};
