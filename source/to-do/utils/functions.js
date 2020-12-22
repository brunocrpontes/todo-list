function sortCalculator(firstItem, secondItem) {
  if (!firstItem.done && secondItem.done) {
    return -1;
  }

  return 0;
}

export default function sortToDos(todos = []) {
  return todos.sort(sortCalculator);
}
