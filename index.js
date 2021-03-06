let xMoves = [];
let oMoves = [];
let isOver = false; // see whether game is ended

$(document).ready(function () {
    let player = "x";

    // Reset button functionality
    $("button").on("click", function () {
        location.reload();
    });

    $("td").on("click", function () {

        // Function so that player can not do any more moves once win the game
        if (isOver) {
            return;
        }

        let marked = $(this);

        if (marked.hasClass("x") || marked.hasClass("o")) {
            alert("Please choose another square!")
        } else {
            if (player === "x") {
                $("#message").text("It's X's turn!")
                marked.addClass("x");
                xMoves.push(this.id);
                console.log(xMoves);
                if (checkDiag(diagArr(3, 1), xMoves) || checkDiag(diagArr(3, 0), xMoves) || checkOther(xMoves)) {
                    $("#message").text("Player X wins!") // if either one of 3 winning conditions meet,
                    isOver = true; // game is ended
                } else {

                    //Draw functionality - X reaches the last step 5 and not winning (as X started first so always it goes 5 steps and O goes 4 steps), it's a draw
                    if (xMoves.length === 5) {
                        $("#message").text("It's a draw!")
                        isOver = true;
                        return;
                    } 

                    player = "o";
                    $("#message").text("It's O's turn!")
                }
            } else {
                marked.addClass("o");
                oMoves.push(this.id);
                if (checkDiag(diagArr(3, 1), oMoves) || checkDiag(diagArr(3, 0), oMoves) || checkOther(oMoves)) {
                    $("#message").text("Player O wins!")
                    isOver = true;
                } else {
                    player = "x";
                    $("#message").text("It's X's turn!")
                }
            }
        }
    });

    let diagArr = function (size, booleanNum) {
        let row = [];
        let col = [];
        let diagonal = [];

        for (let i = 1; i <= size; i++) {
            i = String(i);
            row.push(i);

            if (booleanNum) {
                col.unshift(i);
            } else {
                col.push(i);
            }
        }

        for (let i = 0; i < row.length; i++) {
            diagonal.push(row[i] + col[i]);
        }
        return diagonal;
    };

    let checkDiag = function (diagonal, playerMoves) {

        for (let i = 0; i < diagonal.length; i++) {
            if (playerMoves.indexOf(diagonal[i]) === -1) {
                return false;
            }
        }
        return true;
    };

    let checkOther = function (playerMoves) {
        let row = [];
        let col = [];

        for (let i = 0; i < playerMoves.length; i++) {
            row.push(Number(playerMoves[i][0]));
            col.push(Number(playerMoves[i][1]));
        }

        row.sort();
        col.sort();

        for (let i = 0; i < row.length; i++) {
            if (row[i] === row[i + 1] && row[i] === row[i + 2]) {
                return true;
            }
        }

        for (let i = 0; i < col.length; i++) {
            if (col[i] === col[i + 1] && col[i] === col[i + 2]) {
                return true;
            }
        }

        return false;
    };

});
