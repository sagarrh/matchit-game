const tcontainer = document.querySelector('.tiles');    
const colors = ["aqua", "red", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "grey","purple","#40E0D0"];
const colorpicker=[...colors,...colors];
const tilecount=colorpicker.length;

let revealedcount=0;
let activeTile =null;
let awaitingEndofMove=false;

function buildtile(color)
{
    const element=document.createElement('div');
    element.classList.add('tile');
    element.setAttribute('data-color',color);
    element.setAttribute('data-reveal',"false");
    element.addEventListener("click",()=>{
        const rev=element.getAttribute('data-reveal');
        if(awaitingEndofMove || rev===true || element==activeTile )
        {
            return;
        }
        element.style.backgroundColor=color;
        if(!activeTile)
        {
            activeTile=element;
            return;
        }
        const colortomatch=activeTile.getAttribute('data-color');
        if(colortomatch===color)
        {
            activeTile.setAttribute('data-reveal','true');
            element.setAttribute('data-reveal','true');
            activeTile=null;
            awaitingEndofMove=false;

            revealedcount+=2;

            if(revealedcount===tilecount)
            {
                alert('you won the game ! you may refresh now!');
            }
            return;
        }
        
        awaitingEndofMove=true;
        setTimeout(()=>{
            element.style.backgroundColor=null;
            activeTile.style.backgroundColor=null;
            awaitingEndofMove=false;
            activeTile=null;
            
        },400)

    });
    return element;
}

for(let i =0;i<tilecount;i++)
{
    const randomindex = Math.floor(Math.random()*colorpicker.length );
    const color=colorpicker[randomindex];
    const tile=buildtile(color);
    colorpicker.splice(randomindex,1);
    tcontainer.appendChild(tile);

    
}

