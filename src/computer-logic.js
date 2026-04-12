export { populateComputerMove };

function populateComputerMove() {
  const x = Math.ceil(Math.random() * 10);
  const y = Math.ceil(Math.random() * 10);

  return [x, y];
}
