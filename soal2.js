function pattern2(rows) {
    for (let a = rows; a >= 1; a--) {
        let row = "";
        for (let b = 1; b <= a; b++) {
            row += "*";
        }
        console.log(row);
    }
}

pattern2(5);