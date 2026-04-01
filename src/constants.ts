export const COASTAL_REGIONS = [
  { id: 'chennai', name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { id: 'kochi', name: 'Kochi', lat: 9.9312, lng: 76.2673 },
  { id: 'goa', name: 'Goa', lat: 15.2993, lng: 74.1240 },
  { id: 'mumbai', name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { id: 'vizag', name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185 },
];

export const REPORT_CATEGORIES = {
  pollution: ['plastic_litter', 'fishing_gear', 'oil_chemical', 'natural_debris', 'unknown'],
  biodiversity: ['turtle_sighting', 'dolphin_sighting', 'fish_kill', 'coral_damage', 'mangrove_cutting'],
  resource: ['overfishing', 'illegal_gear', 'unauthorized_zone'],
};

export const IMPACT_LEVELS = {
  GUARDIAN: { min: 80, label: 'Ocean Guardian', color: 'text-green-600' },
  PATH: { min: 60, label: 'On the Right Path', color: 'text-blue-600' },
  IMPROVE: { min: 0, label: 'Needs Improvement', color: 'text-yellow-600' },
};
