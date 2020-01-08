// Creates new row for use in createTable function
function createNewRow(){
    var newRow = document.querySelector(".grid").insertRow(0);
    for (var j = 0; j < 9; j++){
        var cell = newRow.insertCell(j);
        cell.classList.add(`row${i}-col${j}`, "covered")
    }
}

// CURRENTLY WORKING ON FUNCITON TO CREATE THE NUMBER OF BOMBS SURROUNDING EACH CELL; could just do in add class?
// Alter the uncover adjacent to take a function as an input; then use that!!!
//e.g functino selectAdjacent(function x){
    //if rowNo > 0{ function x}



// Fuction to reveal a square based on its rowNo/colNo
function revealCell(rowNo, colNo){
    var boxuncover = document.querySelector(`.row${rowNo}-col${colNo}`);

    // If it is covered and is not a bomb (replace with flag)
    if (boxuncover.classList.contains("covered") && !boxuncover.classList.contains("bomb")){
        boxuncover.classList.remove("covered");
        boxuncover.classList.add("uncovered");
    }
}


// Uncovers adjacent squares
function selectAdjacentCells(rowNo, colNo, func){
    // Reveal the selected box
    func(rowNo, colNo);

    // Reveal the left cell
    if (colNo > 0){
        func(rowNo, colNo-1);
    };

    // reveal to upper left cell
    if (rowNo < 8 && colNo > 0){
        func(rowNo+1, colNo-1);
    };

    // reveal upper cell
    if (rowNo < 8){
        func(rowNo+1, colNo);
    };

    // reveal upper right cell
    if (rowNo < 8 && colNo < 8){
        func(rowNo+1, colNo+1);
    };

    // reveal right cell
    if (colNo < 8){
        func(rowNo, colNo+1);
    };

    // reveal bottom right cell
    if (rowNo > 0 && colNo < 8){   
        func(rowNo-1, colNo+1);
    };

    // reveal bottom cell
    if (rowNo > 0){
        func(rowNo-1, colNo);
    };

    // reveal bottom left cell
    if (rowNo > 0 && colNo > 0){
        func(rowNo-1, colNo-1);
    };

}

// Places bombs in the table
function populateBombs(bombNo){
    var i = 0;
    while (i < bombNo){
        var rowIdx = Math.floor(Math.random() * 9);
        var colIdx = Math.floor(Math.random() * 9);
        console.log(rowIdx, colIdx);
        var bombcell = document.querySelector(`.row${rowIdx}-col${colIdx}`);
        if (!bombcell.classList.contains("bomb")){
            bombcell.classList.add("bomb");
            i++;
        }

        
    };
};


// Adds eventlistenrs and creates the base classes for each cell
function RunGame(){
    var boxes = document.querySelectorAll(".covered").forEach(item => {
        item.addEventListener("click", event =>{
            // BEHAVIOUR WHEN CLICKED HERE

            // If its a bomb then....
            if (item.classList.contains("bomb")){
                gameOver();
            }
            else if (item.classList.contains("flag")){
                item.classList.remove("covered")
                item.classList.add("uncovered")
            }
            else if (item.classList.contains("covered")){
                console.log("safe click")
                var rowNo = parseInt(item.classList[0][3])
                var colNo = parseInt(item.classList[0][8])
                selectAdjacentCells(rowNo, colNo, revealCell);
                
            }
        });
    });
};


function gameOver(){
    document.querySelectorAll(".covered").forEach(item => {
        item.classList.remove("covered");
        item.classList.add("uncovered");
    });
    setTimeout(function(){
        alert("Game Over!");
        document.location.reload();
    }, 50);
    
};

function addFlags(rowNo, colNo){
    var cell = document.querySelector(`.row${rowNo}-col${colNo}`);
    cell.classList.add("flag");
    if (!parseInt(cell.innerHTML)) {cell.innerHTML = "1"}
    else{cell.innerHTML = parseInt(cell.innerHTML) + 1};
};

function countFlag(){
    document.querySelectorAll(".bomb").forEach( item => {
        var rowNo = parseInt(item.classList[0][3]);
        var colNo = parseInt(item.classList[0][8]);
        selectAdjacentCells(rowNo, colNo, addFlags);
    });
};

function removeHTMLBomb(){
    document.querySelectorAll(".bomb").forEach( item => {
        item.innerHTML = "";
    });
}

// Creates the table
for (var i = 0; i < 9; i++){
    createNewRow();
};


// Adds classes to the cells in the table
RunGame();

// Fills x bombs into the table at random
populateBombs(5);

// Adds the flags
countFlag();

removeHTMLBomb();








