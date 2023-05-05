export const processItem = (item) => ({
  ...item,
  id: item._id,
  price: item.price / 100,
});
