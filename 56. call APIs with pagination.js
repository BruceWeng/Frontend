// fetchList is provided for you
// const fetchList = (since?: number) => 
//   Promise<{items: Array<{id: number}>}>

const fetchListWithAmount = async (amount = 5) => {
  const result = await fetchList();
  let items = result.items;
  while (amount > items.length) {
    const lastId = items[items.length - 1].id;
    const newResult = await fetchList(lastId);
    if (newResult.items.length === 0) break;
    items = items.concat(newResult.items);
  }
  return items.slice(0, amount);
}