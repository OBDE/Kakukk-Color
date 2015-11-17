var x;
var ghiv = 1;
var level = 1;
var pontszam = 0;
var csalas = 0;
var start_time = 15;
var szamlalo;
var g_remainingtime;
var kiir_szint = 0;
var ido_elindit = 0;
var pontszorzo = 1;
var map = 1;
var max_szin = 0;
var game_started = 0;
var A;


function default_settings() {    
    level = 0; // 1 - 9999
    pontszam = 0; // 0 - inf.
    start_time = 15; // 0 - 35
    max_szin = 200;
    map = 1; // 1 - 8
    set_alpha();
    kiir("diff_kiir",localStorage.nehezseg);
    setLevel(1);
}

function setLevel(x) {
    map = x;
    makeLevel();
}
function addLevel() {
    if (map < 9) {
        makeLevel();
    }
    else {
        setLevel(8);
    }
}
function makeLevel()
{
    clearTimeout(szamlalo);
    ++level;
    var sor = oszlop = (map + 1);

    var R = random_szam(max_szin);
    var G = random_szam(max_szin);
    var B = random_szam(max_szin);

    
    // kiir("difficult",localStorage.nehezseg);
    var sx = random_szam(sor); //random szám a max oszlopszám és 0 között
    var sy = random_szam(oszlop); //random szám a max sorszám és 0 között szebben így nézne ki:     var qx = Math.floor((Math.random() * ghiv) + 0);

    var header = "<table id='level_" + map + "'>";
    var body = "";

    for (var i = 0; i < sor; i++)
    {
        body += "<tr>";
        for (var j = 0; j < oszlop; j++)
        {
            if (sx === i && sy === j) {
                body += "<td>";
                body += "<div id='kakukk' onclick='kattint(1);'style='background: rgba(" + R + "," + G + "," + B + "," + A + ")'></div>";
                body += "</td>";
            } else {
                body += "<td>";
                body += "<div id='nokakukk' onclick='kattint(0);' style='background: rgba(" + R + "," + G + "," + B + ",1)'></div>";
                body += "</td>";

            }

        }
        body += "</tr>";

    }
    kiir("tablazat", header + body + "</table>");
    kiir("szint", level);
    //divkeszit("1",localStorage.nehezseg);
    
    idozito(start_time);

    if (((level + 1) % 5) === 0) {
        ++map;
    }
}
function idozito(remainingtime) {
    g_remainingtime = remainingtime;
    
    if(level>1 || game_started === 1){
        szamlalo = setTimeout(function () {
            idozito(--remainingtime);
        }, 1000);
    }
    if (remainingtime <= 0)
    {
        lejartazido();
    }
    else
        kiir("ido", remainingtime);
}

var pluszidozizo;
var pluszpontidozito;

function kattint(x) {
    game_started = 1;
    if (x === 1) {
        clearTimeout(pluszpontidozito);

        if (map > 1) {
            pluszpont = Math.round((map / 2) * 1 * pontszorzo) / 1;
            kiir("pluszpont", "<font color='green'> +" + pluszpont + "</font>");
            pluszpontidozito = setTimeout(function () {
                kiir("pluszpont", "");
            }, 1500);
            pontszam += pluszpont;
        }
        else {
            pontszam += Math.round(map * pontszorzo * 1) / 1;
            kiir("pluszpont", "<font color='green'> +" + map + "</font>");
            pluszpontidozito = setTimeout(function () {
                kiir("pluszpont", "");
            }, 1500);
        }

        kiir("pontszam", pontszam);

        start_time = g_remainingtime + 2;

        if (start_time > 35) {
            start_time = 35;
            kiir("pluszido", "<font color='green'> +0</font>");
        }
        else if (start_time === 34) {
            kiir("pluszido", "<font color='green'> +1</font>");
        }
        else
            kiir("pluszido", "<font color='green'> +2</font>");
        
        
        
        clearTimeout(szamlalo);

        idozito(start_time);

        clearTimeout(pluszidozizo);

        pluszidozizo = setTimeout(function () {
            kiir("pluszido", "");
        }, 1500);

        
       if (localStorage.nehezseg === "easy")
    {
        if (localStorage.highscore_easy < pontszam)
        {
            localStorage.highscore_easy = pontszam;
        }
    }
    else if (localStorage.nehezseg === "normal")
    {
        if (localStorage.highscore_normal < pontszam)
        {
            localStorage.highscore_normal = pontszam;
        }
    }
    else if (localStorage.nehezseg === "hard")
    {
        if (localStorage.highscore_hard < pontszam)
        {
            localStorage.highscore_hard = pontszam;
        }
    }
    else
    {
        if (localStorage.highscore_extreme < pontszam)
        {
            localStorage.highscore_extreme = pontszam;
        }
    }
            
        //kiir("highscoredebug",localStorage.highscore);
        addLevel();
    }
    else {
        clearTimeout(pluszpontidozito);
        if (pontszam > 0) {
            pontszam--;
            kiir("pluszpont", "<font color='red'> -1</font>");
            
            pluszpontidozito = setTimeout(function () {kiir("pluszpont", "");}, 1500);
        }
        kiir("pontszam", pontszam);

        idokorrekcio();


        clearTimeout(szamlalo);

        idozito(g_remainingtime);
        if (g_remainingtime > 0)
            kiir("pluszido", "<font color='red'> -2</font>");

        clearTimeout(pluszidozizo);
        pluszidozizo = setTimeout(function () {kiir("pluszido", "");}, 1500);

    }
}
function kiir(hova, mit) {
    document.getElementById(hova).innerHTML = mit;
}
function idokorrekcio() {
    if (g_remainingtime > 1)
        g_remainingtime -= 2;
    else if (g_remainingtime > 0)
        g_remainingtime -= 1;
    else
        g_remainingtime = 0;
}
function lejartazido() {
    clearTimeout(szamlalo);
    kiir("ido", "0");
    default_settings();
    kiir("pontszam", pontszam);
    kiir("pluszpont","");
    kiir("pluszido","");
    lejart_confirm();
}
function lejart_confirm() {
    
    var r = confirm("You've run out of time.\nWanna play again?");
    if (r === true) {
        default_settings();
        kiir("ido", "15");
    }
    else {
        window.location.href="index.html";
    }
}
function random_szam(max) {
    return Math.floor((Math.random() * max));
}
function HighScore() {
    if (localStorage.nehezseg === "easy")
    {
        if (localStorage.highscore_easy < pontszam)
        {
            localStorage.highscore_easy = pontszam;
        }
    }
    else if (localStorage.nehezseg === "normal")
    {
        if (localStorage.highscore_normal < pontszam)
        {
            localStorage.highscore_normal = pontszam;
        }
    }
    else if (localStorage.nehezseg === "hard")
    {
        if (localStorage.highscore_hard < pontszam)
        {
            localStorage.highscore_hard = pontszam;
        }
    }
    else
    {
        if (localStorage.highscore_extreme < pontszam)
        {
            localStorage.highscore_extreme = pontszam;
        }
    }
        
}
function set_alpha(){
    var nehezseg = localStorage.nehezseg;

    if (nehezseg === "easy")
    {
        A = 0.8;       
        pontszorzo = 0.9;
    }
    else if (nehezseg === "normal" || typeof localStorage.nehezseg === 'undefined' || typeof localStorage.nehezseg === null)
    {
        A = 0.85;
        localStorage.nehezseg = "normal";
        pontszorzo = 1;
    }
    else if (nehezseg === "hard")
    {
        A = 0.9;
        pontszorzo = 1.2;
    }
    else {
        A = 0.95;
        pontszorzo = 2;
    }
}