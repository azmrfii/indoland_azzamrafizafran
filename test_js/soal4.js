function pattern4(rows) {
  for (let a = 1; a <= rows; a++) {
    let row = "";

    for (let b = 1; b <= rows - a; b++) {
      row += " ";
    }

    for (let c = 1; c <= a; c++) {
      row += "* ";
    }

    console.log(row);
  }

  for (let a = rows - 1; a >= 1; a--) {
    let row = "";

    for (let b = 1; b <= rows - a; b++) {
      row += " ";
    }

    for (let c = 1; c <= a; c++) {
      row += "* ";
    }

    console.log(row);
  }
}

pattern4(1);
