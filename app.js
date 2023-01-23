const boxes = document.querySelectorAll(".box");
const msg = document.querySelector(".msg");
const popup = document.querySelector(".popup");
const cont = document.querySelector(".container");
const winner = document.querySelector(".winner");

let player = "X";
let pwinner;

var pointp1 = localStorage.getItem("pointp1") || 0;
var pointp2 = localStorage.getItem("pointp2") || 0;


window.addEventListener("load", () => {
    printPoint();
})

function printPoint(){
    const p1 = document.querySelector(".p1p");
    const p2 = document.querySelector(".p2p");
    p1.innerHTML = pointp1;
    p2.innerHTML = pointp2;
}

boxes.forEach(box => box.addEventListener("click",()=>{
    print(box)
}));

function print(box){
    if(box.textContent == ""){
       box.textContent = player; 
       turnPlayer();
    }
    else{
        msg.innerText = "This block is not empty, please select another block";
        setTimeout(()=>{
            msg.innerText = ""
        },2500)
    }
    checkWin();
    checkTie();
}

function turnPlayer(){
    if(player === "X"){
       player = "O"; 
    }
    else if(player === "O"){
        player = "X"; 
    }
}

function checkWin(){
    checkRows();
    checkCols();
    checkDiags();
}

function checkRows(){
    let row1 = boxes[0].textContent === boxes[1].textContent && boxes[0].textContent === boxes[2].textContent && boxes[0].textContent !== "";
    let row2 = boxes[3].textContent === boxes[4].textContent && boxes[3].textContent === boxes[5].textContent && boxes[3].textContent !== "";
    let row3 = boxes[6].textContent === boxes[7].textContent && boxes[6].textContent === boxes[8].textContent && boxes[6].textContent !== "";
    if(row1){
        winner.textContent = boxes[0].textContent;
        pwinner = boxes[0].textContent;
    }
    if(row2){
        winner.textContent = boxes[3].textContent;
        pwinner = boxes[3].textContent;
    }
    if(row3){
        winner.textContent = boxes[6].textContent;
        pwinner = boxes[6].textContent;
    }
    if(row1 || row2 || row3){
        showPopup()
    }
}

function checkCols(){
    let col1 = boxes[0].textContent === boxes[3].textContent && boxes[0].textContent === boxes[6].textContent && boxes[0].textContent !== "";
    let col2 = boxes[1].textContent === boxes[4].textContent && boxes[1].textContent === boxes[7].textContent && boxes[1].textContent !== "";
    let col3 = boxes[2].textContent === boxes[5].textContent && boxes[2].textContent === boxes[8].textContent && boxes[2].textContent !== "";
    if(col1){
        winner.textContent = boxes[0].textContent;
        pwinner = boxes[0].textContent;
    }
    if(col2){
        winner.textContent = boxes[1].textContent;
        pwinner = boxes[1].textContent;
    }
    if(col3){
        winner.textContent = boxes[2].textContent;
        pwinner = boxes[2].textContent;
    }
    if(col1 || col2 || col3){
        showPopup()
    }
}

function checkDiags(){
    let dia1 = boxes[0].textContent == boxes[4].textContent &&
        boxes[0].textContent == boxes[8].textContent && boxes[0].textContent !== ""
    let dia2 = boxes[2].textContent == boxes[4].textContent &&
        boxes[2].textContent == boxes[6].textContent && boxes[2].textContent !== "";
    
    if(dia1){
            winner.textContent = boxes[0].textContent;
            pwinner = boxes[0].textContent;
    }
    if(dia2){
            winner.textContent = boxes[2].textContent;
            pwinner = boxes[2].textContent;
    }
    if(dia1 || dia2){
            showPopup()
    }
}

function checkTie(){
    const x = [];
    boxes.forEach(box => x.push(box.textContent));
    if(!x.includes("")){
        showPopup("any");
    }
}

function showPopup(status = ""){
    if(status != ""){
        winner.parentElement.innerHTML = "Tie!";
    } else{
        if(pwinner == "X"){
            pointp1++;
            localStorage.setItem("pointp1", JSON.stringify(pointp1));
        }
        else if(pwinner == "O"){
            pointp2++;
            localStorage.setItem("pointp2", JSON.stringify(pointp2));
        }
    }
    cont.classList.add("hide");
    popup.classList.remove("hide");
    popup.querySelector(".btn").addEventListener("click",()=>{
        window.location.reload()
    });
}