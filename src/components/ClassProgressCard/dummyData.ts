export const getDummyData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(75);
    }, 5000);
  });
