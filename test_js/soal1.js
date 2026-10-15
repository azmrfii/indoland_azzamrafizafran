function pattern1(rows) {
    for (let a = 1; a <= rows; a++) {
        let row = "";
        for (let b = 1; b <= a; b++) {
            row += "*";
        }
        console.log(row);
    }
}

pattern1(5);