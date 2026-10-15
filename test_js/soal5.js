function pattern5(rows) {
    for (let a = 1; a <= rows; a++) {
        let row = "";
        let totalCols = 2 * rows - 1;

        for (let b = 1; b <= totalCols; b++) {
            let left = rows - a + 1;
            let right = rows + a - 1;

            if (b === left || b === right || a === rows) {
                row += "*";
            } else {
                row += " ";
            }
        }

        console.log(row);
    }
}

pattern5(1);