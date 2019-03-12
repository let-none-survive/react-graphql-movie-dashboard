export const actorsDataToActor = actorsData => actorsData.map(item => item.fullname).join(', ');
export const actorsToActorsData = actors => actors.split(", ").map(item => item.fullname);