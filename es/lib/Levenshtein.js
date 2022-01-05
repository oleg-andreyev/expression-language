export var getEditDistance = function (a, b) {
    if (a.length === 0)
        return b.length;
    if (b.length === 0)
        return a.length;
    var matrix = [];
    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    // increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
        if (matrix[0] === undefined) {
            matrix[0] = [];
        }
        matrix[0][j] = j;
    }
    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            }
            else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                Math.min(matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j] + 1)); // deletion
            }
        }
    }
    if (matrix[b.length] === undefined) {
        matrix[b.length] = [];
    }
    return matrix[b.length][a.length];
};
