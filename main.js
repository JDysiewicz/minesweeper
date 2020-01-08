// Creates new row for use in createTable function
function createNewRow(size){
    var newRow = document.querySelector(".grid").insertRow(0);
    for (var j = 0; j < size; j++){
        var cell = newRow.insertCell(j);
        cell.classList.add(`row-${i}-col-${j}`, "covered")
    }
}

// CURRENTLY WORKING ON FUNCITON TO CREATE THE NUMBER OF BOMBS SURROUNDING EACH CELL; could just do in add class?
// Alter the uncover adjacent to take a function as an input; then use that!!!
//e.g functino selectAdjacent(function x){
    //if rowNo > 0{ function x}



// Fuction to reveal a square based on its rowNo/colNo
function revealCell(rowNo, colNo){
    var boxuncover = document.querySelector(`.row-${rowNo}-col-${colNo}`);

    if (boxuncover.classList.contains("flag")){
        boxuncover.classList.remove("covered");
        boxuncover.classList.add("uncovered");
    }
    // If it is covered and is not a bomb (replace with flag)
    else if (boxuncover.classList.contains("covered") && !boxuncover.classList.contains("bomb")){
        boxuncover.classList.remove("covered");
        boxuncover.classList.add("uncovered");
        selectAdjacentCells(rowNo, colNo, revealCell);
    }
    
};


// Uncovers adjacent squares
function selectAdjacentCells(rowNo, colNo, func){
    // Reveal the selected box

    // Reveal the left cell
    if (colNo > 0){
        func(rowNo, colNo-1);
    };

    // reveal to upper left cell
    if (rowNo < size-1 && colNo > 0){
        func(rowNo+1, colNo-1);
    };

    // reveal upper cell
    if (rowNo < size-1){
        func(rowNo+1, colNo);
    };

    // reveal upper right cell
    if (rowNo < 8 && colNo < 8){
        func(rowNo+1, colNo+1);
    };

    // reveal right cell
    if (colNo < size-1){
        func(rowNo, colNo+1);
    };

    // reveal bottom right cell
    if (rowNo > 0 && colNo < size-1){   
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
        var rowIdx = Math.floor(Math.random() * size);
        var colIdx = Math.floor(Math.random() * size);
        console.log(rowIdx, colIdx);
        var bombcell = document.querySelector(`.row-${rowIdx}-col-${colIdx}`);
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
                var rowNo = parseInt(item.classList[0].split("-")[1]);
                var colNo = parseInt(item.classList[0].split("-")[3]);
                revealCell(rowNo, colNo);
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
    var cell = document.querySelector(`.row-${rowNo}-col-${colNo}`);
    cell.classList.add("flag");
    if (!parseInt(cell.innerHTML)) {cell.innerHTML = "1"}
    else{cell.innerHTML = parseInt(cell.innerHTML) + 1};
};

function countFlag(){
    document.querySelectorAll(".bomb").forEach( item => {
        var rowNo = parseInt(item.classList[0].split("-")[1]);
        var colNo = parseInt(item.classList[0].split("-")[3]);
        selectAdjacentCells(rowNo, colNo, addFlags);
    });
};

function removeHTMLBomb(){
    document.querySelectorAll(".bomb").forEach( item => {
        item.innerHTML = "";
    });
}


// Size of table to be created
size = 15;
// Creates the table
for (var i = 0; i < size; i++){
    createNewRow(size);
};


// Adds classes to the cells in the table
RunGame();

// Fills x bombs into the table at random
populateBombs(40);

// Adds the flags
countFlag();

removeHTMLBomb();









