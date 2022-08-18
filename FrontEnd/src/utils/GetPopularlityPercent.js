export const GetPopularlityPercent = (userPopularity) => {
  if (userPopularity >= 96) {
    return 18;
  } else if (userPopularity >= 93) {
    return 17;
  } else if (userPopularity >= 89) {
    return 16;
  } else if (userPopularity >= 86) {
    return 15;
  } else if (userPopularity >= 85) {
    return 14;
  } else if (userPopularity >= 81) {
    return 13;
  } else if (userPopularity >= 76) {
    return 12;
  } else if (userPopularity >= 71) {
    return 11;
  } else if (userPopularity >= 61) {
    return 10;
  } else if (userPopularity >= 51) {
    return 9;
  } else if (userPopularity >= 41) {
    return 8;
  } else if (userPopularity >= 31) {
    return 7;
  } else if (userPopularity >= 23) {
    return 6;
  } else if (userPopularity >= 14) {
    return 5;
  } else if (userPopularity >= 8) {
    return 4;
  } else if (userPopularity >= 4) {
    return 3;
  } else if (userPopularity >= 1) {
    return 2;
  } else {
    return 1;
  }
};
