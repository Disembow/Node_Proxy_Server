export const parseMeteors = (data) => {
  const result = Object.values(data).flatMap((day) =>
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
        meteor.close_approach_data[0]?.relative_velocity
          ?.kilometers_per_second || null,
    }))
  );

  return result;
};
