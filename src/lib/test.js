for (let i = 0; i <= 15; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log(`angka ${i} adalah fizzbuzz`);
  } else if (i % 3 === 0) {
    console.log(`angka ${i} adalah fizz`);
  } else if (i % 5 === 0) {
    console.log(`angka ${i} adalah buzz`);
  } else {
    console.log(`angka ${i}`);
  }
}
