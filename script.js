var board
var score=0
let r=4
let c=4

window.onload=function() {
    resetgame();
}
document.addEventListener("keyup",(e)=>{
    if(e.code=="ArrowLeft"){
        if (gameContinueRow()){
            left();
        }
        else{
            alert("Game Over!!")
        }

    }
    else if(e.code=="ArrowUp"){
        if (gameContinueColumn()){
            up();
        }
    }
    else if(e.code=="ArrowRight"){
        if (gameContinueRow()){
            right();
        }
    }
    else if(e.code=="ArrowDown"){
        if (gameContinueColumn()){
            down();
        }
    }

})
function hasEmptyTile(){
    for(let i=0;i<r;i++){
        for(let j=0;j<c;j++){
            if(board[i][j]==0){
                return true
            }
        }
    }
    return false
    
}
function setTwo(){
    if (!hasEmptyTile){
         return
     }
    flag=false
    while (!flag){
        a=Math.floor(Math.random()*4)
        b=Math.floor(Math.random()*4)
        if(board[a][b]==0){
            board[a][b]=2
            let tile=document.getElementById(a.toString()+b.toString())
            updatetile(tile,2)
            flag=true
        }
    }
    
}
// function setTwoLeft(){
//     if(board[3][0]==0){
//         board[3][0]=2
//         let tile=document.getElementById(a.toString()+b.toString())
//         updatetile(tile,2)
//     }
//     else{
//         return
//     }
// }
// function setTwoUp(){
//     if(board[0][0]==0){
//         board[0][0]=2
//         let tile=document.getElementById(a.toString()+b.toString())
//         updatetile(tile,2)
//     }
//     else{
//         return
//     }
// }
// function setTwoRight(){
//     if(board[0][3]==0){
//         board[0][3]=2
//         let tile=document.getElementById(a.toString()+b.toString())
//         updatetile(tile,2)
//     }
//     else{
//         return
//     }
// }
// function setTwoDown(){
//     if(board[3][3]==0){
//         board[3][3]=2
//         let tile=document.getElementById(a.toString()+b.toString())
//         updatetile(tile,2)
//     }
//     else{
//         return
//     }
// }
  

function resetgame(){
    board=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    

    for (let i=0;i<r;i++){
        for (let j=0;j<c;j++){
            let tile=document.createElement("div")
            tile.id=i.toString()+j.toString()
            let n=board[i][j]
            updatetile(tile,n)
            document.getElementById("board").append(tile)
        }
    }
    setTwo()
    setTwo()
}
function updatetile(tile,n){
    tile.className="tile"
    if(n==0){
        tile.innerText=""
    }
    else{
        tile.className="tile x"+n.toString()
        tile.innerText= n
    }
}
function filterZero(l){
    return l.filter((a)=>{return a>0})
}
function slide(l){
    l=filterZero(l)
    for(let i=0;i<l.length;i++){
        if(l[i]==l[i+1]){
            score+=l[i]*2
            l[i]*=2
            l[i+1]=0
        }
    }
    l=filterZero(l)
    while(l.length<r){
        l.push(0)
    }
    document.getElementById("Score").innerHTML=`Score: ${score}`
    // if(score>=2048){
    //     alert("Hey! You Won!!")
// }
    return l
}
function gameContinueRow(){
    if (!hasEmptyTile){
        let flag=false
        for(let i=0;i<r;i++){
            let l=board[i]
            
            for(let j=0;j<l.length;j++){
                if(l[j]=l[j+1]){
                    flag=true
                    return true
                }
            }
        }
        
        if(flag===false){
            alert("Game Over!")
            return false
        }
    }
    return true
    
}
function gameContinueColumn(){
    if (!hasEmptyTile){
        let flag=false
        
        for(let i=0;i<r;i++){
            let l=[board[0][j],board[1][j],board[2][j],board[3][j]]
            
            for(let j=0;j<l.length;j++){
                if(l[j]=l[j+1]){
                    flag=true
                    return true
                }
            }
        }
        
        if(flag===false){
            alert("Game Over!")
            return false
        }
    }
    return true
}
function up(){
    
        for(let j=0;j<c;j++){
            let l=[board[0][j],board[1][j],board[2][j],board[3][j]]
            l=slide(l)
            board[0][j]=l[0]
            board[1][j]=l[1]
            board[2][j]=l[2]
            board[3][j]=l[3]

            for(let i=0;i<r;i++){
                let tile= document.getElementById(i.toString()+j.toString())
                updatetile(tile,board[i][j])
            }
        }
        setTwo()
    
    return
}
function left(){
    
        for(let i=0;i<r;i++){
            let l=board[i]
            l=slide(l)
            board[i]=l

            for(let j=0;j<c;j++){
                let tile= document.getElementById(i.toString()+j.toString())
                updatetile(tile,board[i][j])
            }
        }
        setTwo()
    
    return
}
function right(){
    
        for(let i=0;i<r;i++){
            let l=board[i].reverse()
            let list= slide(l)
            board[i]=list.reverse()

            for(let j=0;j<c;j++){
                let tile= document.getElementById(i.toString()+j.toString())
                updatetile(tile,board[i][j])
            }
        }
        setTwo()
    
    return
}
function down(){
    
        for(let j=0;j<c;j++){
            let l=[board[3][j],board[2][j],board[1][j],board[0][j]]
            l=slide(l)
            board[3][j]=l[0]
            board[2][j]=l[1]
            board[1][j]=l[2]
            board[0][j]=l[3]

            for(let i=0;i<r;i++){
                let tile= document.getElementById(i.toString()+j.toString())
                updatetile(tile,board[i][j])
            }
        }
        setTwo()
    
    return

}






