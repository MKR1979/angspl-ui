
export const getAcademicSession = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  if (month >= 4) {
    return `${year}-${year + 1}`;
  } else {
    return `${year - 1}-${year}`;
  }
};

  // const getAcademicSession = (): string => {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = today.getMonth() + 1;
  //   if (month >= 4) {
  //     return `${year}-${year + 1}`;
  //   } else {
  //     return `${year - 1}-${year}`;
  //   }
  // };