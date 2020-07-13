export const getDateParts = (dateStr) => {
  return dateStr
    .split('-')
    .map((datePart, index) => {
      const partAsNum = Number(datePart);
      if (index === 1) return partAsNum - 1;
      return partAsNum;
    });
};