//game configuration
 const gameData = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

//editing in Player names

const Player1 = document.getElementById('player');
const Player2 = document.getElementById('player2');
const getAside = document.querySelector('.aside');
const backdrop = document.getElementById('background');

const Players = [
    {name: '',
    symbol: 'X'},
    { name: '',
    symbol: '0'
}]
let editedPlayer = 0;
let ActivePlayer = 0;
let NoActiveField = 1;

function AddPlayerName(event){
    editedPlayer = +event.target.dataset.playerid;
    getAside.style.display='block';
    backdrop.style.display = 'block';
    

}
Player1.addEventListener('click', AddPlayerName);
Player2.addEventListener('click', AddPlayerName);

//hiding the backdrop & pop up screen
const cancelBtn = document.getElementById('hide');

const FormInput = document.getElementById('Player-name');
const errorMessage = document.getElementById('error');


const formElement = document.querySelector('form');
const submitBtn = document.getElementById('sbmt');

function CancelEdit(){
        
    getAside.style.display = 'none';
    backdrop.style.display = 'none';
    FormInput.classList.remove('Player-name');
    errorMessage.textContent = null;
    FormInput.value ='';
}

function cancelSubmit(){

}
cancelBtn.addEventListener('click', CancelEdit)
backdrop.addEventListener('click', CancelEdit );


//Adding in the names


const Name = document.getElementById('PlayerName');


function displayName(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredname = formData.get('Playername').trim();

    
    if(!enteredname){

        FormInput.classList.add('Player-name')
        errorMessage.style.color = 'red'
        errorMessage.textContent ='Please enter valid name';
        return;
    } 
    
    const UpdatedName = document.getElementById('Player'+editedPlayer+'ID');
    UpdatedName.textContent = enteredname.toUpperCase();


    Players[editedPlayer-1].name = enteredname;
    CancelEdit();
    
}

formElement.addEventListener('submit', displayName)


//Displaying the game board

const StartBtn = document.getElementById('Start');

let DisplayedPlayerName = document.getElementById('PlayerActive'); 




function DisplayBoard(){
    if(Players[0].name ==='' || Players[1].name===''){
        alert('Please fill in the name(s) FIRST!!!');
        return;
    }
    const Activate = document.querySelector('.game-board');
    Activate.style.display = 'block';
}

StartBtn.addEventListener('click', DisplayBoard);

//Switch Player
function SwitchPlayer(){
    if(ActivePlayer===0){
        ActivePlayer=1;
    } else {
        ActivePlayer= 0;
    }

    
    DisplayedPlayerName.textContent = Players[ActivePlayer].name;
}


//logic for game
const GameBtns = document.querySelectorAll('li');

function selectedBtn(event){

    const Selectedfield = event.target;
    const selectedcol = Selectedfield.dataset.col-1;
    const selectedrow = Selectedfield.dataset.row-1;

    if(gameData[selectedrow][selectedcol]>0){
        alert('Please select an empty field')
        return;
    }
    
    Selectedfield.textContent = Players[ActivePlayer].symbol;
    Selectedfield.classList.add('disable');

    

    gameData[selectedrow][selectedcol] =ActivePlayer +1;
    console.log(gameData);
    const winnerID = Checkforwinner();
    NoActiveField++;

     if(winnerID!== 0){
         gameOver(winnerID);
    } 
    
    SwitchPlayer();

   
    



}



for(const GameBtn of GameBtns){
    GameBtn.addEventListener('click', selectedBtn)
}


function Checkforwinner(){
    for(let i = 0; i<3; i ++){
        if(gameData[0][i]>0 && gameData[0][i]==gameData[1][i] && gameData[2][i]==gameData[0][i]){
             return gameData[0][i];
        }


        
    }

    for(let i = 0; i<3; i ++){
        if(gameData[i][0]>0 && gameData[i][0]==gameData[i][1] && gameData[i][2]==gameData[i][0]){
            return gameData[i][0];
        }
    }

    if(gameData[0][0]>0 && gameData[0][0]== gameData[1][1] && gameData[0][0]==gameData[2][2]){
        return gameData[0][0];
    }
   
    if (gameData[2][0]>0 && gameData[2][0]==gameData[1][1] && gameData[1][1]== gameData[0][2]){
        return gameData[2][0];
    }

    if(NoActiveField==9){
        return -1;
    }


return 0;
}



  function gameOver( winnerID){



         const Switchtext = document.querySelector('.Switch')
         const ClassAnnounceBanner = document.querySelector('.Winner');
         ClassAnnounceBanner.style.display = 'block';
    
         const AnnounceBanner = document.getElementById('Winnerannounce');

         if(winnerID>0){
             const winnerName = Players[winnerID-1].name.toUpperCase();
             AnnounceBanner.textContent = winnerName;
             Switchtext.style.display = 'none'


        
         } else{
             ClassAnnounceBanner.textContent = 'It\'s a Draw';
             Switchtext.style.display = 'none'
         }
        
     }