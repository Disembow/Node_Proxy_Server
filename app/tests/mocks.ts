import { CloseEarthObjects, Meteor } from "app/types/meteors.ts";

export const mockCloseEarthObjects: CloseEarthObjects = {
  "2024-12-16": [
    {
      id: "1",
      name: "xb-70",
      close_approach_data: [],
      estimated_diameter: {
        meters: {
          estimated_diameter_min: 20,
          estimated_diameter_max: 50,
        },
      },
      is_potentially_hazardous_asteroid: true,
      is_sentry_object: false,
    },
    {
      id: "2",
      name: "xb-60",
      close_approach_data: [],
      estimated_diameter: {
        meters: {
          estimated_diameter_min: 30,
          estimated_diameter_max: 80,
        },
      },
      is_potentially_hazardous_asteroid: false,
      is_sentry_object: false,
    },
    {
      id: "3",
      name: "xb-30",
      close_approach_data: [],
      estimated_diameter: {
        meters: {
          estimated_diameter_min: 30,
          estimated_diameter_max: 80,
        },
      },
      is_potentially_hazardous_asteroid: false,
      is_sentry_object: false,
    },
    {
      id: "4",
      name: "xb-90",
      close_approach_data: [],
      estimated_diameter: {
        meters: {
          estimated_diameter_min: 30,
          estimated_diameter_max: 80,
        },
      },
      is_potentially_hazardous_asteroid: true,
      is_sentry_object: false,
    },
  ],
};

export const mockStartDate = "2024-12-16";
export const mockEndDate = "2024-12-20";
export const mockDefaultStartDate = "2024-12-11";
export const mockDefaultEndDate = "2024-12-15";
export const mockIsDangerous = "true";

export const mockDate = "2024-12-20";
export const mockCount = "5";

export const mockFilteredMeteors: Meteor[] = [
  {
    id: "1",
    name: "xb-70",
    is_potentially_hazardous_asteroid: true,
    close_approach_date_full: "2024-12-16",
    diameter_in_meters: 80,
    relative_velocity: 120,
  },
];
