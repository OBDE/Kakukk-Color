function EmptyDiv(ID_NEV){
    var div = document.createElement("DIV");
    div.setAttribute("id",ID_NEV);
    document.body.appendChild(div);
}
function divkeszit(ID_NEV,TARTALOM){
    var div = document.createElement("DIV");
    var t = document.createTextNode(TARTALOM);
    div.setAttribute("id",ID_NEV);
    div.appendChild(t);
    document.body.appendChild(div);
}
function getValue(melyik){
    return document.getElementById(melyik).value;
}
function kiir(hova,mit){
    document.getElementById(hova).innerHTML = mit;
}

function diff_change(){
    localStorage.nehezseg = document.getElementById("nehezsegek").value;
}
var katt = 0;
var hkatt = 0;
function mode_onclick()
{   
    //modes
    if(katt === 0){  
    document.getElementById("modes").style.visibility = "visible";
    document.getElementById("highscores").style.visibility = "hidden";
    hkatt = 0;
    katt = 1;
    }    
    else if(katt === 1){  
    document.getElementById("modes").style.visibility = "hidden";
    katt = 0;
    }
    
}
function highscore_onclick(){
    //highscores
    if(hkatt === 0){  
    document.getElementById("highscores").style.visibility = "visible";
    document.getElementById("modes").style.visibility = "hidden";
    katt = 0;
    hkatt = 1;
    }    
    else if(hkatt === 1){  
    document.getElementById("highscores").style.visibility = "hidden";
    hkatt = 0;
    }
}
function highscore_kiir(){
    
    if(typeof localStorage.highscore_easy === 'undefined')
        localStorage.highscore_easy = 0;
    
    if(typeof localStorage.highscore_normal === 'undefined')
        localStorage.highscore_normal = 0;
    
    if(typeof localStorage.highscore_hard === 'undefined')
        localStorage.highscore_hard = 0;
    
    if(typeof localStorage.highscore_extreme === 'undefined')
        localStorage.highscore_extreme = 0;
    
    document.getElementById("easy_h").innerHTML = localStorage.highscore_easy;
    document.getElementById("normal_h").innerHTML = localStorage.highscore_normal;
    document.getElementById("hard_h").innerHTML = localStorage.highscore_hard;
    document.getElementById("extreme_h").innerHTML = localStorage.highscore_extreme;
}
