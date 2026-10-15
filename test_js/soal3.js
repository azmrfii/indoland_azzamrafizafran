function pattern3(rows) {
  for (let a = 0; a < rows; a++) {
    let row = "";

    for (let b = 0; b < rows - a - 1; b++) {
      row += " ";
    }

    for (let c = 0; c < (2 * a) + 1; c++) {
      row += "*";
    }

    console.log(row);
  }
}

pattern3(1);