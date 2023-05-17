/*
1. blokk:
- Keszitsunk Termek interface-t (megnevezes, nettoAr, afaSzazalek)
- Keszits urlapot amin keresztul a felhasznalo tud felvinni termekeket, tarold
el tombben, es jelenitsd meg oket egy tablazatban a brutto arral egyutt amit
kalkulalj ki (+ BS!)

2. blokk:
- Egy gombnyomasra ird ki:
    - A legolcsobb es legdragabb termek minden adatat (kulon function)
    - Add meg a termekek atlag brutto arat (kulon function)
*/

interface Termek{
    megnevezes:string,
    nettoAr:number,
    afaSzazalek:number
}

/*
function TermekProp(_megnevezes:string, _nettoAr:number, _afaSzazalek:number){
    this.megnevezes = _megnevezes,
    this.nettoAr = _nettoAr,
    this.afaSzazalek = _afaSzazalek,
    this.BruttoAr = function(){
        return ((this.afaSzazalek / 100) + 1) * this.nettoAr;
    }
}

var prop1 = new TermekProp("monitor", 12000, 27);
console.log(prop1.BruttoAr());
*/

var termekek:Termek[] = [];

document.getElementById("felvitel").addEventListener("click", function(){
    var aktMegnevezes:string = (<HTMLInputElement>document.getElementById("megnevezes")).value;
    var aktNettoAr:number = Number((<HTMLInputElement>document.getElementById("nettoAr")).value);
    var aktAfaSzazalek:number = Number((<HTMLInputElement>document.getElementById("afa")).value);

    var aktTermek:Termek = {megnevezes:aktMegnevezes, nettoAr:aktNettoAr, afaSzazalek:aktAfaSzazalek};
    termekek.push(aktTermek);

    //Talba sor felvetel
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");

    td1.appendChild(document.createTextNode(aktTermek.megnevezes));
    td2.appendChild(document.createTextNode(aktTermek.afaSzazalek + "%"));
    td3.appendChild(document.createTextNode(aktTermek.nettoAr + " Ft"));

    var szorzo = (aktTermek.afaSzazalek / 100) + 1;
    td4.appendChild(document.createTextNode(aktTermek.nettoAr * szorzo + " Ft"));

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    document.getElementById("torzs").appendChild(tr);
}, false);

document.getElementById("kalkulalas").addEventListener("click", function(){
    var legolcsobb:Termek = MinTermek(termekek);
    var legdragabb:Termek = MaxTermek(termekek);

    document.getElementById("minTermek").innerHTML = `Legolcsobb termek: ${legolcsobb.megnevezes} (AFA: ${legolcsobb.afaSzazalek}%): ${legolcsobb.nettoAr} Ft`;
    document.getElementById("maxTermek").innerHTML = `Legdragabb termek: ${legdragabb.megnevezes} (AFA: ${legdragabb.afaSzazalek}%): ${legdragabb.nettoAr} Ft`;
    document.getElementById("atlagBrutto").innerHTML = `Atlag brutto: ${AtlagBrutto(termekek)} Ft`;
}, false);

function MinTermek(termekek:Termek[]):Termek{
    var minTermek:Termek = termekek[0];

    for(var i = 1; i < termekek.length; i++){
        if(termekek[i].nettoAr < minTermek.nettoAr){
            minTermek = termekek[i];
        }
    }

    return minTermek;
}

function MaxTermek(termekek:Termek[]):Termek{
    var maxTermek:Termek = termekek[0];

    for(var i = 1; i < termekek.length; i++){
        if(termekek[i].nettoAr > maxTermek.nettoAr){
            maxTermek = termekek[i];
        }
    }

    return maxTermek;
}

function AtlagBrutto(termekek:Termek[]):number{
    var atlagBrutto:number = 0;

    for(var i = 0; i < termekek.length; i++){
        var szorzo = (termekek[i].afaSzazalek / 100) + 1;
        atlagBrutto += termekek[i].nettoAr * szorzo;
    }

    atlagBrutto /= termekek.length;
    return atlagBrutto;
}