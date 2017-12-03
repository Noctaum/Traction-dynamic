//Много глобальных объектов и массивов, спецификацию к ним искать в папке...если я не поленюсь и сделаю )
function stupid(value,min,max,id) {
    if (+value < +min || +value > +max) {
        alert("Проверьте ввод");
        var z = document.getElementById(id);
        z.value=(((+max)+(+min))/2).toFixed(3);
    }
}
function stupid1 (value,min,max,id){
    var z = document.getElementById(id);
    if (+value ==1) z.value=1;
    else if(+value < +min || +value > +max) {
        alert("Проверьте ввод");
        z.value=(((+max)+(+min))/2).toFixed(3);}
}
function stupid3 (value,min,max,id,min1,max1){
    var z = document.getElementById(id);
    if (+value ==1) z.value=1;
    else if((+value < +min || +value > +max)&&(+value < +min1 || +value > +max1)) {
        alert("Проверьте ввод");
        z.value=1;}
}

function get (id){
    var x =document.getElementById(id);
    return parseFloat(x.value);
}

/*function give(id,value) {
 document.getElementById(id).innerHTML=value.toFixed(3);
 }*/

function considerAllWeight() {
    var considerAllWeight01 = (get("weightCar")+(get("quantityPasanger")*(75+10)))/1000;
    document.getElementById("weightAll").innerHTML = considerAllWeight01.toFixed(3);
    sborochka.mA=considerAllWeight01.toFixed(3);
}

function dimensions() {
    var dimensions01 = 0.5*0.25*1.225;
    var dimensions02 = 0.8*get("sizeHeight")*get("sizeWidth");
    document.getElementById("sizeStreamlining").innerHTML = dimensions01.toFixed(3);
    document.getElementById("sizeAreaForehead").innerHTML = dimensions02.toFixed(3);
    sborochka.Kv=dimensions01.toFixed(3);
    sborochka.S=dimensions02.toFixed(3);
}

function transmission() {

    var transmission01=Math.pow(0.95,get("transmissionTopGear"))*0.965;

    if(document.getElementById("transmissionDivider").checked){
        (document.getElementById("payt1").checked) ? transmission01*=get("transmissionDivider01"):transmission01*=0.97;
    }

    if(document.getElementById("transmissionSplitter").checked) {
        (document.getElementById("payt1").checked) ? transmission01 *= get("transmissionSplitter01") : transmission01 *= 0.97;
    }
    if(document.getElementById("transmissionTransferCase").checked){
        (document.getElementById("payt1").checked) ? transmission01*=get("transmissionTransferCase01"):transmission01*=0.955;
    }

    if (document.getElementById("payt1").checked) transmission01=transmission01/0.965*get("transmissionBox");
    if (document.getElementById("payt1").checked) transmission01=transmission01/Math.pow(0.95,get("transmissionTopGear"))*Math.pow(0.95,get("transmissionTopGear01"));

    if(document.getElementById("transmissionCardanJoint").checked) transmission01*=Math.pow(0.995,get("transmissionQuantityCardanJoint"));
    document.getElementById("transmissionEfficiency").innerHTML = transmission01.toFixed(3);
    sborochka.KPD=transmission01.toFixed(3);
}

var sborochka={
    mA:0,
    KPD:0,
    Kv:0,
    S:0,
    Pev:0,
    Pemax:0,
    Pyd:0,
    Mp:0,
    Memax:0,
    Vemax:0
};

function paramEngine() {
    var engineParavm=0.03;
    if (document.getElementById("payt0").checked) engineParavm=get("engineParam");
    var maxSpeed=get("engineSpeed");
    var enginePower = (maxSpeed/(3.6*sborochka.KPD))*(9.81*sborochka.mA*engineParavm+sborochka.Kv*sborochka.S*Math.pow(maxSpeed,2)/13000);
    document.getElementById("powerForMaxSpeed").innerHTML = enginePower.toFixed(3);
    sborochka.Pev=enginePower.toFixed(3);
    sborochka.Vemax=maxSpeed;
}

function frequencyICE() {

    rotationICE.Kn=get("frequencyAdaptability").toFixed(3);
    var coeffRatio=1.1;
    if (document.getElementById("payt0").checked) coeffRatio=get("coeffRatio");
    var maxPower = get("frequencyMAXpower");
    var frequencyMAXtwist01= maxPower/get("frequencyAdaptability");
    document.getElementById("frequencyMAXtwist").innerHTML = frequencyMAXtwist01.toFixed(3);
    var frequencyMAX01 = maxPower*coeffRatio;
    document.getElementById("frequencyMAX").innerHTML = frequencyMAX01.toFixed(3);

    rotationICE.nemin=get("frequencyMIN").toFixed(3);
    rotationICE.nm=frequencyMAXtwist01.toFixed(3);
    rotationICE.np=maxPower.toFixed(3);
    rotationICE.nemax=frequencyMAX01.toFixed(3);
}

var rotationICE= {
    nemin:0,
    nm:0,
    np:0,
    nemax:0,
    Kn:0,
    Km:0,
    a:0,
    b:0,
    c:0
};

function coefficientABC(){
    var Kn = +rotationICE.Kn;
    var adaptabilityForFrequency01=(Kn*(4-3*Kn)-1)/(2*Kn*(1-Kn));
    document.getElementById("adaptabilityForFrequency").innerHTML = adaptabilityForFrequency01.toFixed(3);
    rotationICE.Km=adaptabilityForFrequency01.toFixed(3);

    var coefficientA01 = (rotationICE.Km*Kn*(4-3*Kn))/(Kn*(4-3*Kn)-1);
    document.getElementById("coefficientA").innerHTML = coefficientA01.toFixed(3);
    rotationICE.a=coefficientA01.toFixed(3);

    var coefficientB01 = (2*Kn*rotationICE.Km)/(1-Kn*(4-3*Kn));
    document.getElementById("coefficientB").innerHTML = coefficientB01.toFixed(3);
    rotationICE.b=coefficientB01.toFixed(3);

    var coefficientC01 = (rotationICE.Km*Kn*Kn)/(Kn*(4-3*Kn)-1);
    document.getElementById("coefficientC").innerHTML = coefficientC01.toFixed(3);
    rotationICE.c=coefficientC01.toFixed(3);

    var simpleCalc =rotationICE.nemax/rotationICE.np;
    var powerMAX01 = sborochka.Pev/(rotationICE.a*(simpleCalc)+rotationICE.b*simpleCalc*simpleCalc+rotationICE.c*Math.pow(simpleCalc,3));
    document.getElementById("powerMAX").innerHTML = powerMAX01.toFixed(3);
    sborochka.Pemax=powerMAX01.toFixed(3);

    var powerSpecific01 = sborochka.Pemax/sborochka.mA;
    document.getElementById("powerSpecific").innerHTML = powerSpecific01.toFixed(3);
    sborochka.Pyd=powerSpecific01.toFixed(3);

    var torqueForMAXpower01 = 9550*sborochka.Pemax/rotationICE.np;
    document.getElementById("torqueForMAXpower").innerHTML = torqueForMAXpower01.toFixed(3);
    sborochka.Mp=torqueForMAXpower01.toFixed(3);

    var torqueMAX01 = sborochka.Mp*rotationICE.Km;
    document.getElementById("torqueMAX").innerHTML = torqueMAX01.toFixed(3);
    sborochka.Memax=torqueMAX01.toFixed(3);
}

function buble() {
    var interval = rotationICE.nemax - rotationICE.nemin;
    var neMAX = +rotationICE.nemax;
    var neMIN = +rotationICE.nemin;
    var bkuy=(((neMAX-neMIN)/1200).toFixed(0))*100;
    var quantity = (interval / bkuy).toFixed();
    var cell = new Array(quantity);
    var cell2 = new Array(quantity);
    var cell3 = new Array(quantity);
    var nM = +rotationICE.nm;
    var nP = +rotationICE.np;
    stairs.quantity=quantity;
    for (var i = 0; i <= quantity - 1; i++, cell[i] = Number(cell[i - 1]) + (+bkuy)) {
        if (i == 0) {
            cell[i] = neMIN;
            considerVSX(i, cell[i]);
        }
        else if (nM - cell[i] < bkuy+2 && nM - cell[i] >= 0) {
            cell[i] = nM;
            considerVSX(i, cell[i]);
        }
        else if (nP - cell[i] < bkuy+2 && nP - cell[i] >= 0) {
            cell[i] = nP;
            considerVSX(i, cell[i]);
        }
        else if (i == quantity - 1) {
            cell[i] = neMAX;
            considerVSX(i, cell[i]);
        }
        else {
            cell[i]=((cell[i]/100).toFixed(0))*100;
            considerVSX(i, cell[i]);
        }
    }

    function considerVSX(number, element) {
        forLastChild("tableOutsideSpeed01",("n" + (number + 1)));
        forLastChild("tableOutsideSpeed02",(+element));
        var crutch = Number(element) / Number(rotationICE.np);
        var Pe = Number(sborochka.Pemax) * crutch * (Number(rotationICE.a) + Number(rotationICE.b) * crutch + Number(rotationICE.c) * crutch * crutch);
        cell2[+number] = +Pe;
        forLastChild("tableOutsideSpeed03",(Pe.toFixed(3)));
        forLastChild("tableOutsideSpeed04",((Pe * 1.36).toFixed(3)));
        var Me = Number(sborochka.Mp) * (Number(rotationICE.a) + Number(rotationICE.b) * crutch + Number(rotationICE.c) * crutch * crutch);
        forLastChild("tableOutsideSpeed05",(Me.toFixed(3)));
        cell3[+number] = +Me;

        function forLastChild(id,z) {
            var x =document.getElementById(id);
            var td = document.createElement("td");
            x.appendChild(td);
            x.lastChild.width = "60px";
            x.lastChild.align = "center";
            x.lastChild.innerHTML=(z)
        }
    }

    var sch = document.getElementById("schedule").getContext("2d");
    var xMax = neMAX + neMIN;
    var Pemax = +sborochka.Pemax;
    var Memax = +sborochka.Memax;
    headCanv("canvasVSX","n,об/мин","Me,Н*м",sch);
    footCanv(0,xMax,100,1,1000,1,sch,Memax+50);
    leftCanv(10,Memax+50,10,1,50,1,sch,xMax);
    rightCanv(5,Pemax+20,5,1,20,1,sch,xMax);
    sch.fillText("Pe,кВт", 770, 10);

    sch.textAlign = "left";
    sch.fillStyle="red";
    sch.strokeStyle="red";
    sch.fillText("Мощность", 100,10);
    sch.beginPath();
    sch.moveTo(useX(cell[0],xMax), useY(cell2[0],Pemax + 20));
    for (i = 0; i <= quantity - 1; i++) {
        sch.lineTo(useX(cell[i],xMax), useY(cell2[i],Pemax + 20))
    }
    sch.stroke();

    sch.fillStyle="green";
    sch.strokeStyle="green";
    sch.fillText("Крутящий момент", 100,25);
    sch.beginPath();
    sch.moveTo(useX(cell[0],xMax), useY(cell3[0],Memax + 50));
    for (i = 0; i <= quantity - 1; i++) {
        sch.lineTo(useX(cell[i],xMax), useY(cell3[i],Memax + 50))
    }
    sch.stroke();

    massN=cell;
    massP=cell2;
    massM=cell3;
    dowland('schedule','dowlandVSX','VSX.png');
}
var massN;
var massP;
var massM;

function tires() {
    var halfWeigth = document.getElementsByName('halfWeigth');
    var m2;
    switch(true){
        case(halfWeigth[0].checked):
            m2 = 0.535*sborochka.mA;
            tiresMass.mLeading=m2;
            tiresMass.driveUnit=2;
            break;
        case(halfWeigth[1].checked):
            m2 = 0.445*sborochka.mA;
            tiresMass.mLeading=+sborochka.mA-m2;
            tiresMass.driveUnit=1;
            break;
        case(halfWeigth[2].checked):
            m2 = 0.58*sborochka.mA;
            tiresMass.mLeading=m2;
            tiresMass.driveUnit=2;
            break;
        case(halfWeigth[3].checked):
            m2 = 0.575*sborochka.mA;
            tiresMass.mLeading=+sborochka.mA;
            tiresMass.driveUnit=0;
            break;
    }
    var m1 = +sborochka.mA-m2;

    var d = 25.4*(get("diameterTire"));
    var h = (get("heightTire"))/100*(get("widthTire"));
    var rN=(d+h*2)/2;
    var rK=(rN*1.95)/2;

    tiresMass.m1=m1;
    tiresMass.m2=m2;
    tiresMass.rK=rK;
    tiresMass.L=get("widthCar");

    var halfA=(get("widthCar"))*m1/sborochka.mA;
    var halfB=(get("widthCar"))*m2/sborochka.mA;
    tiresMass.halfA= halfA;
    tiresMass.halfB= halfB;

    document.getElementById("tireRadius").innerHTML = rK.toFixed(3);
    document.getElementById("centerTohead").innerHTML = halfA.toFixed(3);
    document.getElementById("centerToBackside").innerHTML = halfB.toFixed(3);
}

var tiresMass={
    m1:0,
    m2:0,
    rK:0,
    halfA:0,
    halfB:0,
    mLeading:0,
    driveUnit:0,
    U1:0,
    Uo:0,
    Uv:0,
    U1ff:0,
    U1f:0,
    L:0
};

function relay(id,i) {
    if (document.getElementById(id).checked) document.getElementsByClassName("thin")[i].style.display="block";
    if (!document.getElementById(id).checked) document.getElementsByClassName("thin")[i].style.display="none";
}

function topGear(a,b,c,vSp,puf1,puf2) {
    var Krf;
    if(c==99){switch (true){
        case (tiresMass.driveUnit==0):{Krf=1; break;}
        case (tiresMass.driveUnit==1):{Krf=0.85; break;}
        case (tiresMass.driveUnit==2):{Krf=1.14; break;}
    }}
    else{switch (true){
        case (tiresMass.driveUnit==0):{Krf=1; break;}
        case (tiresMass.driveUnit==1):{Krf=0.8; break;}
        case (tiresMass.driveUnit==2):{Krf=1.1; break;}
    }}

    var Uv = 0.76;
    if((document.getElementById("payt2").checked)){
        Uv=get("upperStair"); a=get("resistanceMAX");
        b=get("clutchTires"); Krf=get("loadRedistribution");
        vSp=get("minStaySpeed");}
    document.getElementById("loadRedistribution").value = Krf;
    document.getElementById("resistanceMAX").value =a;
    document.getElementById("clutchTires").value =b;
    document.getElementById("minStaySpeed").value = vSp;
    tiresMass.Uv=Uv;
    var Uo=0.377*rotationICE.nemax*tiresMass.rK/(Uv*sborochka.Vemax);
    var U1f=+a*sborochka.mA*9.81*1000*tiresMass.rK/(Uo*sborochka.Memax*sborochka.KPD);
    var U1ff=+b*Krf*9.81*1000*tiresMass.mLeading*tiresMass.rK/(Uo*sborochka.Memax*sborochka.KPD);
    var U1v=0.377*rotationICE.nemin*tiresMass.rK/(Uo*vSp);

    if(!document.getElementById("payt2").checked){
        if (U1v>U1ff && puf1==0){topGear(0.4,0.80,88,7,1,0); return;}
        if (U1v>U1ff && puf1==1){alert("U1v > U1ф используйте ручные настройки.\nРекомендуется повысить минимальную устойчивую скорость движения."); return;}
        if (U1f>U1ff && puf2==0){topGear(0.27,0.85,99,7,1,1);return;}
        if (U1f>U1ff && puf2==1){alert("Автомобиль не сможет преодолеть максимальные подъём.\nПожалуйста самостоятельно отрекулируйте значения с помощью " +
            "\"Ручная корректировка\" \nРекомендуется снизить максимальное сопротивление дороги,\nа также повысить коэффициент распределения нагрузки и" +
            "\nкоэффициент сцепления шин с дорогой.\nТакже рекомендуется повысить минимальную устойчивую скорость движения.");return;}
    }
    if (U1v<=U1ff && U1v>=U1f ) tiresMass.U1=U1v.toFixed(3);
    else {
        for (var i=U1ff-0.02; i>=U1f-0.1; i-=0.01){
            var predU =0.377*rotationICE.nemin*tiresMass.rK/(Uo*i);
            if(predU>=3 && predU<=7 ) {tiresMass.U1=i.toFixed(3); break;}
            if (i<=U1f || predU>7 ) {alert("Невозможно произвести вычисления, пожалуйста измените значения.\n" +
                "При повторном появлении ошибки рекомендуеться проверить предыдущие параметры.\n(Понизить Vmax, уменьшить габариты H,B.)");break;}
        }}
    document.getElementById("maxUp").innerHTML = U1f.toFixed(3);
    document.getElementById("firstGear").innerHTML = (+tiresMass.U1).toFixed(3);
    document.getElementById("roadFriction").innerHTML = U1ff.toFixed(3);
    document.getElementById("firstGear2").innerHTML = (+tiresMass.U1).toFixed(3);
    document.getElementById("minSmooth").innerHTML = U1v.toFixed(3);
    tiresMass.Uo=Uo.toFixed(3);
    tiresMass.U1ff=U1ff.toFixed(3);
    tiresMass.U1f=U1f.toFixed(3);
    document.getElementById("topGearEnd").value =tiresMass.U1;
}

function changeU1(value,id) {
    if (+value<+ document.getElementById("maxUp").innerHTML || +value>+document.getElementById("roadFriction").innerHTML){
        alert("Введенное значение не удовлетворяет условию!");
        var z = document.getElementById(id);
        z.value=+tiresMass.U1;
    }
    else {
        tiresMass.U1=value;
        document.getElementById("firstGear").innerHTML =value;
        document.getElementById("firstGear2").innerHTML =value;
    }
}
function q32() {
    var key=document.getElementById("qq").value;
    var castle= new Date;
    var fox = String(castle.getFullYear()-castle.getHours())+String(castle.getDay()-1+castle.getMinutes());
    if(key==fox) document.getElementById("Content-wrape").style.display="table";
    document.getElementById("qq").value="";
}
function tireNext(puf0, puf3, puf4) {
    var rr;
    if((document.getElementById("payt3").checked)) rr=get("roadResistance");
    var UU = tiresMass.Uo*tiresMass.U1;
    var Ia =sborochka.mA*tiresMass.rK*tiresMass.rK/(Math.pow(UU,2));
    var w0=3.14*rotationICE.nm/90+50*3.14;
    var Mf=rr*9.81*sborochka.mA*tiresMass.rK/UU;
    var Ab=0.5*sborochka.Memax*Ia*w0*w0/(sborochka.Memax-Mf);
    if(Ab>30 && +puf0==0){ tiresMass.U1=tiresMass.U1ff;
        document.getElementById("topGearEnd").value =tiresMass.U1;
        tireNext(1,0,0);return;}
    if(Ab>30 && +puf0==1){alert("Происходит пробуксовка колёс.\nПожалуйста увеличьте U1."); return;}
    var D=tiresMass.U1/tiresMass.Uv;
    var kolStairs = get("stairsKP");
    stairs.kolstairs=kolStairs.toFixed(0);
    var min,max;
    switch (true){
        case (kolStairs==3): min=2.2;max=2.7;break;
        case (kolStairs==4): min=3.0;max=4.9;break;
        case (kolStairs>=5): min=3.5;max=25;break;
    }

    if(D<min){switch (true){
        case (+puf3 == 0):tiresMass.U1=+tiresMass.U1+(((+tiresMass.U1ff)-(+tiresMass.U1))/2); tireNext(1,1,0);return;
        case (+puf3 == 1):tiresMass.U1=(+tiresMass.U1ff);tireNext(1,2,0);return;
        case (+puf3 == 2):alert("Диапазон передаточных чисел ниже приемлимых значений. Увеличьте U1.");return;
    }}
    if(D>max){switch (true){
        case (+puf4 == 0):tiresMass.U1=(+tiresMass.U1)-(((+tiresMass.U1)-(+tiresMass.U1ff))/2); tireNext(1,2,1);return;
        case (+puf4 == 1):tiresMass.U1=(+tiresMass.U1f);tireNext(1,2,2);return;
        case (+puf4 == 2):alert("Диапазон передаточных чисел выше приемлимых значений. Уменьшите U1.");return;
    }}
    var predU =0.377*rotationICE.nemin*tiresMass.rK/(tiresMass.Uo*tiresMass.U1);
    if(predU<3 || predU>7) alert("Warning! Vamin выходит за пределы 3..7 км/ч.");
    document.getElementById("firstGear2").innerHTML = (+tiresMass.U1).toFixed(3);
    document.getElementById("firstGear").innerHTML = (+tiresMass.U1).toFixed(3);
    document.getElementById("topGearEnd").value =tiresMass.U1;
    document.getElementById("rangeKP").innerHTML = D.toFixed(0);
}

var stairs= {
    kolstairs:0,
    quantity:0,
    Ftmax:0,
    forDV:0,
    Dmax:0,
    Ddry:0,
    Amax:0,
    proverka:0
};

function stair() {
    var kolstairs = (+stairs.kolstairs).toFixed(0);
    var Uv = +tiresMass.Uv;
    var U1=+tiresMass.U1;
    var pass1 = new Array(kolstairs-1);
    var pass2 = new Array(kolstairs-1);
    var pass0 = new Array(kolstairs-1);
    forLastChild(1,U1);
    for(var i =0;i<kolstairs-1;i++){
        if(Uv==1)pass1[i] = Math.pow(U1,(kolstairs-(i+2))/(kolstairs-1));
        else{
            pass1[i] = Math.pow(U1,(kolstairs-(i+2))/(kolstairs-1))*Math.pow(Uv,(i+1)/(kolstairs-1));
            pass2[i]=Uv*U1/(Uv+(i+1)/(kolstairs-1)*(U1-Uv));
            pass0[i]=((pass1[i]+pass2[i])/2).toFixed(3);
            forLastChild(i+2,pass0[i]);
        }}
    forLastChild(0,(tiresMass.Uo/1000).toFixed(3));
    function forLastChild(z,z2) {
        var x =document.getElementById("tableGear").getElementsByTagName("tbody")[0];
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var td1 = document.createElement("td");
        x.appendChild(tr);
        tr.appendChild(td);
        var q = "U"+String(z);
        td.align = "center";
        td.innerHTML=q;
        tr.appendChild(td1);
        td1.align = "center";
        td1.innerHTML=z2;
    }

    massU[0]=U1;
    for(i=0;i<kolstairs;i++){
        massU[i+1]=pass0[i];
    }
}

var massU=[];
var massFt=[];
var massVa=[];
var massFv=[];
var massD=[];
var massA=[];
var massfv=[];
var massFf=[];
var massq=[];
var massFfFv=[];
var massAforA=[];
var massAforA2=[];
var massVforA=[];

function tractionCharacteristic() {
    var n =+stairs.kolstairs;
    var arrF = [];
    var arrV= [];
    var U0=+tiresMass.Uo;
    var rK=+tiresMass.rK;
    var KPD=+sborochka.KPD;

    var sch = document.getElementById("schedule1").getContext("2d");
    var Vmax = sborochka.Vemax;
    var Ftmax = sborochka.Memax*tiresMass.U1*tiresMass.Uo*sborochka.KPD/tiresMass.rK;

    headCanv("canvasThrust","V,км/ч","Fт,кН",sch);
    footCanv(0,Vmax+20,5,1,20,1,sch,Ftmax + Ftmax/10);
    leftCanv(0,Ftmax + Ftmax/10,250,1,1000,1000,sch,Vmax+20);

    sch.fillStyle="red";
    sch.strokeStyle="red";
    for(var i=0; i<n; i++){
        arrF[i] = [];
        arrV[i] = [];
        sch.beginPath();
        for(var j=0; j<+stairs.quantity; j++){
            arrF[i][j] = massM[j]*massU[i]*U0*KPD/rK;
            arrV[i][j] = 0.377*massN[j]*rK/(massU[i]*U0);
            j!=0 ? sch.lineTo(useX(arrV[i][j],Vmax+20), useY(arrF[i][j],Ftmax + Ftmax/10)):sch.moveTo(useX(arrV[i][j],Vmax+20), useY(arrF[i][j],Ftmax + Ftmax/10));
            if (j==stairs.quantity-1)  sch.stroke();
            if (j==stairs.quantity-2)  sch.fillText("Fт"+String(i+1),useX(arrV[i][j]+10,Vmax+20), useY(arrF[i][j]+10,Ftmax + Ftmax/10));
            if(+stairs.Ftmax<arrF[i][j]){stairs.Ftmax=arrF[i][j];stairs.forDV=arrV[i][j];}
        }
    }
    sch.fillStyle = "blue";
    sch.strokeStyle="blue";
    sch.textAlign = "center";
    sch.fillText("VFт", useX(stairs.forDV+3,Vmax+20), 770);
    sch.beginPath();
    sch.moveTo(useX(stairs.forDV,Vmax+20), useY(stairs.Ftmax,Ftmax + Ftmax/10));
    sch.lineTo(useX(stairs.forDV,Vmax+20), 789);
    sch.stroke();

    massFt=arrF;
    massVa=arrV;
    var dryRoad=0.85;
    if((document.getElementById("payt4").checked)) dryRoad=get("dryRoad");
    var Ftfwet=0.55*tiresMass.mLeading*9.81*1000;
    var Ftfdry=dryRoad*tiresMass.mLeading*9.81*1000;
    document.getElementById("tractionWet").innerHTML = Ftfwet.toFixed(3);
    document.getElementById("tractionDry").innerHTML = Ftfdry.toFixed(3);
    dowland('schedule1','dowlandThrust','Thrust.png');
}

function dynamicCharacteristic() {
    var Kv=+sborochka.Kv;
    var S=+sborochka.S;
    var mA=+sborochka.mA;
    var n =+stairs.kolstairs;
    var arrFv = [];
    var arrD=[];

    var sch = document.getElementById("schedule2").getContext("2d");
    var Vmax = sborochka.Vemax;
    var Dmax = (+stairs.Ftmax-(Kv*S*stairs.forDV/13))/(mA*9.81);

   headCanv("canvasDynamics","V,км/ч","D",sch);
   footCanv(0,Vmax+20,5,1,20,1,sch,Dmax + Dmax/10);
   leftCanv(10,Dmax + Dmax/10,10,1,100,1000,sch,Vmax+20);

    sch.fillStyle="red";
    sch.strokeStyle="red";
    for(var i=0; i<n; i++){
        arrFv[i] = [];
        arrD[i]=[];
        sch.beginPath();
        for(var j=0; j<+stairs.quantity; j++){
            arrFv[i][j]=Kv*S*massVa[i][j]*massVa[i][j]/13;
            arrD[i][j]=(massFt[i][j]- arrFv[i][j])/(mA*9.81);
            j!=0 ? sch.lineTo(useX(massVa[i][j],Vmax+20), useY(arrD[i][j],Dmax + Dmax/10)):sch.moveTo(useX(massVa[i][j],Vmax+20), useY(arrD[i][j],Dmax + Dmax/10));
            if (j==stairs.quantity-1)  sch.stroke();
            if (j==stairs.quantity-2)  sch.fillText("D"+String(i+1),useX(massVa[i][j]+10,Vmax+20), useY(arrD[i][j]+10,Dmax + Dmax/10));
            if(+stairs.Dmax<arrD[i][j])stairs.Dmax=arrD[i][j];
        }
    }
    sch.fillStyle = "blue";
    sch.strokeStyle="blue";
    sch.textAlign = "center";
    sch.fillText("VD", useX(stairs.forDV+3,Vmax+20), 770);
    sch.beginPath();
    sch.moveTo(useX(stairs.forDV,Vmax+20), useY(stairs.Dmax,Dmax + Dmax/10));
    sch.lineTo(useX(stairs.forDV,Vmax+20), 789);
    sch.stroke();
    var dryRoad=0.85;
    if((document.getElementById("payt4").checked)) dryRoad=get("dryRoad");
    var Dwet=0.55*tiresMass.mLeading/sborochka.mA;
    var Ddry=dryRoad*tiresMass.mLeading/sborochka.mA;
    document.getElementById("dynamicsMAX").innerHTML = (stairs.Dmax/1000).toFixed(3);
    document.getElementById("dynamicsWet").innerHTML = Dwet.toFixed(3);
    document.getElementById("dynamicsDry").innerHTML = Ddry.toFixed(3);
    stairs.Ddry=Ddry.toFixed(3);
    massFv=arrFv;
    massD=arrD;
    dowland('schedule2','dowlandDynamics','Dynamics.png');
}

function acceleration() {
    var n =+stairs.kolstairs;
    var mA=+sborochka.mA;
    var arrA=[];
    var arrfv=[];
    var arrFf=[];
    var arrq=[];
    var qqq1=0.04,qqq2=0.07;
    if(document.getElementById("payt5").checked){
        qqq1=get("coefficientq1"); qqq2=get("coefficientq2");}
    var sch = document.getElementById("schedule3").getContext("2d");
    var Vmax = sborochka.Vemax;
    for(var i=0; i<n; i++){
        arrA[i]=[];
        arrfv[i]=[];
        arrFf[i]=[];
        for(var j=0; j<+stairs.quantity; j++){
            arrfv[i][j]=0.01*(1+(0.006*massVa[i][j])*(0.006*massVa[i][j]));
            arrq[i]=(1+qqq1+qqq2*massU[i]*massU[i]);
            arrA[i][j]=9.81/arrq[i]*(massD[i][j]/1000-arrfv[i][j]);
            arrFf[i][j]=arrfv[i][j]*mA*9.81;
            if(stairs.Amax<arrA[i][j]){stairs.Amax=arrA[i][j];stairs.proverka=i;}
        }}
    var Amax=+stairs.Amax;

    headCanv("canvasAcceleration","V,км/ч","a,м/c2",sch);
    footCanv(0,Vmax+20,5,1,20,1,sch,Amax + Amax/10);
    leftCanv(1,Amax*10+Amax,1,1,5,10,sch,Vmax+20);

    sch.fillStyle="red";
    sch.strokeStyle="red";
    for(i=0; i<n; i++){
        sch.beginPath();
        for(j=0; j<+stairs.quantity; j++){
            j!=0 ? sch.lineTo(useX(massVa[i][j],Vmax+20), useY(arrA[i][j],Amax + Amax/10)):sch.moveTo(useX(massVa[i][j],Vmax+20), useY(arrA[i][j],Amax + Amax/10));
            if (j==stairs.quantity-1)  sch.stroke();
            if (j==stairs.quantity-2)  sch.fillText("a"+String(i+1),useX(massVa[i][j]+5,Vmax+20), useY(arrA[i][j]+0.1,Amax + Amax/10));
        }}

    var dot=[],dot2=[];
    var speed=[];
    for (j=0;j<+stairs.kolstairs-1;j++) {
        var xx = (rotationICE.nemax - rotationICE.nemin) / 2;
        for (i = (+rotationICE.nemin + xx); i < rotationICE.nemax; i+=1) {
            var yy =i * massU[j + 1] / massU[j];
            var z = i - yy;
            var A1=bilbi(i,j);
            var A2=bilbi(i-z,j+1);
            if(A2[0]==A1[0]){dot[j]=A1[0];dot2[j]=A2[0];speed[j]=A1[1]; break;}
            if (i==rotationICE.nemax-1){dot[j]=A1[0];dot2[j]=A2[0];speed[j]=A1[1];}
            function bilbi(i,j){
                var crutch = i/rotationICE.np;
                var Me = sborochka.Mp* (Number(rotationICE.a) +Number(rotationICE.b)*crutch+Number(rotationICE.c)*crutch*crutch);
                var F= Me*massU[j]*tiresMass.Uo*sborochka.KPD/tiresMass.rK;
                var V= 0.377*i*tiresMass.rK/(massU[j]*tiresMass.Uo);
                var Fv=sborochka.Kv*sborochka.S*V*V/13;
                var D=(F- Fv)/(sborochka.mA*9.81);
                var fv=0.01*(1+(0.006*V)*(0.006*V));
                var q=(1+qqq1+qqq2*massU[j]*massU[j]);
                var A=9.81/q*(D/1000-fv);
                return [A.toFixed(3),V.toFixed(3)];
            }
        }}
    sch.fillStyle = "blue";
    sch.strokeStyle="blue";
    sch.textAlign = "center";
    for (i=+stairs.proverka;i<+stairs.kolstairs-1;i++){
        sch.beginPath();
        sch.moveTo(useX(speed[i],Vmax+20), useY(dot[i],Amax + Amax/10));
        sch.lineTo(useX(speed[i],Vmax+20), useY(0,Amax + Amax/10));
        sch.stroke();
        sch.fillText("Vp"+String(i+1)+String(i+2), useX(speed[i])+20, 780);
    }
    massAforA=dot;
    massAforA2=dot2;
    massVforA=speed;
    massA=arrA;
    massfv=arrfv;
    massFf=arrFf;
    massq=arrq;
    dowland('schedule3','dowlandAcceleration','Acceleration.png');

    for(var qwer=0; qwer<+stairs.kolstairs; qwer++){
        massFfFv[qwer]=[];
        for(var qwer2=0; qwer2<+stairs.quantity; qwer2++) {
            massD[qwer][qwer2] = massD[qwer][qwer2] / 1000;
            massFf[qwer][qwer2] = massFf[qwer][qwer2] * 1000;
            massFfFv[qwer][qwer2] = massFf[qwer][qwer2] + massFv[qwer][qwer2];
        }}

    sch =  document.getElementById("schedule1").getContext("2d");
    sch.font="bold 12px sans-serif";
    var Ftmax = sborochka.Memax*tiresMass.U1*tiresMass.Uo*sborochka.KPD/tiresMass.rK;

    sch.strokeStyle = "green";
    sch.fillStyle = "green";
    for(var w=0; w<+stairs.kolstairs; w++){
        sch.beginPath();
        for( j=0; j<+stairs.quantity; j++){
            j!=0 ? sch.lineTo(useX(massVa[w][j],Vmax+20), useY(massFf[w][j],Ftmax + Ftmax/10)):sch.moveTo(useX(massVa[w][j],Vmax+20), useY(massFf[w][j],Ftmax + Ftmax/10));
            if (j==stairs.quantity-1)  sch.stroke();
            if (j==stairs.quantity-2 && w==+stairs.kolstairs-1) sch.fillText("Ff",useX(massVa[w][j]+20,Vmax+20), useY(massFf[w][j]+15,Ftmax + Ftmax/10));
        }}
    for( w=0; w<+stairs.kolstairs; w++){
        sch.beginPath();
        for( j=0; j<+stairs.quantity; j++) {
            j != 0 ? sch.lineTo(useX(massVa[w][j],Vmax+20), useY(massFfFv[w][j],Ftmax + Ftmax/10)) : sch.moveTo(useX(massVa[w][j],Vmax+20), useY(massFfFv[w][j]));
            if (j==stairs.quantity-1)  sch.stroke();
            if (j == stairs.quantity-2 && w == +stairs.kolstairs-1) sch.fillText("Ff+Fв", useX(massVa[w][j] + 20,Vmax+20), useY(massFfFv[w][j]+15,Ftmax + Ftmax/10));
        }}
    dowland('schedule1','dowlandThrust','Thrust.png');

    sch = document.getElementById("schedule2").getContext("2d");
    sch.font="bold 12px sans-serif";
    var Dmax = (+stairs.Ftmax-(sborochka.Kv*sborochka.S*stairs.forDV/13))/(sborochka.mA*9.81);

    sch.strokeStyle = "green";
    sch.fillStyle = "green";
    for( w=0; w<+stairs.kolstairs; w++){
        sch.beginPath();
        for( j=0; j<+stairs.quantity; j++){
            j!=0 ? sch.lineTo(useX(massVa[w][j],Vmax+20), useY(massfv[w][j]*1000,Dmax + Dmax/10)):sch.moveTo(useX(massVa[w][j],Vmax+20), useY(massfv[w][j]*1000,Dmax + Dmax/10));
            if (j==stairs.quantity-1)  sch.stroke();
            if (j==stairs.quantity-2 && w==+stairs.kolstairs-1) sch.fillText("fv",useX(massVa[w][j]+20,Vmax+20), useY(massfv[w][j]*1000+15,Dmax + Dmax/10));
        }}
    sch.beginPath();
    sch.moveTo (useX(2,Vmax+20), useY(massfv[0][0]*1000+50,Dmax + Dmax/10));
    sch.lineTo(useX(Vmax,Vmax+20), useY(massfv[0][0]*1000+50,Dmax + Dmax/10));
    sch.stroke();
    sch.fillText("i 0.05", useX(Vmax-5,Vmax+20), useY(massfv[0][0]*1000+60,Dmax + Dmax/10));
    dowland('schedule2','dowlandDynamics','Dynamics.png');
    var iDVS;
    if(+stairs.Dmax/1000<+stairs.Ddry)document.getElementById("inclineEngine").innerHTML = (iDVS=+stairs.Dmax/1000-massfv[0][0]).toFixed(3);
    else document.getElementById("inclineEngine").innerHTML = (iDVS=+stairs.Ddry-massfv[0][0]).toFixed(3);
    var ifTire;
    var dryRoad=0.85;
    if((document.getElementById("payt4").checked)) dryRoad=get("dryRoad");
    switch (true){
        case(+tiresMass.driveUnit==0):ifTire=dryRoad;break;
        case(+tiresMass.driveUnit==1):ifTire=dryRoad*(+tiresMass.halfB+0.01*tiresMass.rK/1000)/(1/tiresMass.L+0.85*1.4*tiresMass.rK/1000);break;
        case(+tiresMass.driveUnit==2):ifTire=dryRoad*(+tiresMass.halfA+0.01*tiresMass.rK/1000)/(1/tiresMass.L+0.85*1.4*tiresMass.rK/1000);break;
    }
    document.getElementById("inclineClutch").innerHTML = ifTire.toFixed(3);
    document.getElementById("inclineClutchMAX").innerHTML = (Math.atan(ifTire)*180/3.14).toFixed(3);
    if(iDVS>ifTire)document.getElementById("inclineMAX").innerHTML = (ifTire*100).toFixed(3);
    else document.getElementById("inclineMAX").innerHTML = (iDVS*100).toFixed(3);
}

function builderMega() {
    for (var r =0;r<stairs.quantity;r++){
        forLastChild("megaTR1",+massN[r]);
        forLastChild("megaTR2",((+massP[r]).toFixed(3)));
        forLastChild("megaTR3",((+massM[r]).toFixed(3)));
    }
    function forLastChild(id,z) {
        var x =document.getElementById(id);
        var td = document.createElement("td");
        x.appendChild(td);
        td.align = "center";
        td.innerHTML=(z)
    }
    for (var i=0;i<+stairs.kolstairs;i++){
        forLastChild1(i);
    }
    function forLastChild1(i) {
        var x =document.getElementById("mega").getElementsByTagName("tbody")[0];
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        x.appendChild(tr);
        tr.rowspan=8;
        tr.appendChild(td);
        td.innerHTML="U"+String(i+1)+"="+String(massU[i])+",q"+String(i+1)+"="+String(massq[i].toFixed(3));
        builder("Va,км/ч",massVa);
        builder("Fт,Н(кН)",massFt);
        builder("Fв,Н(кН)",massFv);
        builder("D",massD);
        builder("fv",massfv);
        builder("F&psi;,Н(кН)",massFf);
        builder("a,м/с&sup2;",massA);
        builder("F&psi;+Fв,Н(кН)",massFfFv);
        function builder(name,value) {
            var tr1 = document.createElement("tr");
            var td1 = document.createElement("td");
            x.appendChild(tr1);
            tr1.appendChild(td1);
            td1.innerHTML=String(name);
            for (var q=0;q<stairs.quantity;q++){
                var td2 = document.createElement("td");
                tr1.appendChild(td2);
                td2.innerHTML=String(value[i][q].toFixed(3));

            }}
    }
    builderForBigTable();
}

function dowland(canv,dowl,name) {
    document.getElementById(dowl).style.display="block";
    var schedule = document.getElementById(canv);
    var a=  document.getElementById(dowl);
    a.download = name;
    a.href = schedule.toDataURL("png");

}

function TimeWay() {
    var rav=+stairs.proverka;
    var xx =document.getElementById("speedANDtime");
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    xx.appendChild(table);
    table.border="1px";
    table.appendChild(tr);
    tr.appendChild(td);
    td.colspan="5";
    td.innerHTML=1+rav+" передача";
    td.width="80px";
    var kolStairsToOff=0;
    for (var i=0;i<+stairs.quantity;i++){
        kolStairsToOff++;
        if((+massVa[rav][i])>(+massVforA[rav])) break;
    }
    var arrMegaTT=[+stairs.kolstairs-rav];
    var arrMegaLL=[+stairs.kolstairs-rav];
    var arrMegaVV=[+stairs.kolstairs-rav];
    function dreq(a,b,c,d){
        var tr1 = document.createElement("tr");
        table.appendChild(tr1);
        for (var i=0;i<kolStairsToOff+2;i++){
            var td1 = document.createElement("td");
            tr1.appendChild(td1);
            td1.align="center";
            td1.width="60px";
            if(i==0) {td1.innerHTML=a;continue;}
            if(i==1) {td1.innerHTML=b;continue;}
            if(i==2) {td1.innerHTML=c;continue;}
            td1.innerHTML=String(+d[i-2]);
        }}
    var empty=[], arrDeltaV=[],arrAsr=[],arrDeltaT=[],arrT=[],arrDeltaVmi=[],
        arrDeltaL=[],arrL=[],arrForV=[],arrmassVa=[],arrmassA=[];
    arrMegaVV[0]=[];
    arrMegaTT[0]=[];
    arrMegaLL[0]=[];
    arrMegaTT[0][0]=0;
    arrMegaLL[0][0]=0;
    for(i=0;i<kolStairsToOff;i++){
        empty[i]=i+1;
        i!=kolStairsToOff-1 ?  arrmassVa[i]=(+massVa[rav][i]).toFixed(3): arrmassVa[i]=(+massVforA[rav]).toFixed(3);
        arrForV[i]=(arrmassVa[i]/3.6).toFixed(3);
        i!=kolStairsToOff-1 ? arrmassA[i]=(+massA[rav][i]).toFixed(3) : arrmassA[i]=(+massAforA[rav]).toFixed(3);
        arrMegaVV[0][i]=arrmassVa[i];
        if (i>0){
            arrDeltaV[i]=((+arrForV[i])-(+arrForV[i-1])).toFixed(3);
            arrAsr[i]=(((+arrmassA[i])+(+arrmassA[i-1]))/2).toFixed(3);
            arrDeltaT[i]=(arrDeltaV[i]/arrAsr[i]).toFixed(3);
            i!=1 ? arrT[i]=((+arrT[i-1])+(+arrDeltaT[i])).toFixed(3) :arrT[i]=arrDeltaT[i];
            arrMegaTT[0][i]=arrT[i];
            arrDeltaVmi[i]=(((+arrForV[i])+(+arrForV[i-1]))/2).toFixed(3);
            arrDeltaL[i]=(+arrDeltaVmi[i]*arrDeltaT[i]).toFixed(3);
            i!=1 ?  arrL[i]=((+arrL[i-1])+(+arrDeltaL[i])).toFixed(3) : arrL[i]=arrDeltaL[i];
            arrMegaLL[0][i]=arrL[i];
        }}
    dreq("Параметр","Размерность",1,empty);
    dreq("Va","км/ч",arrmassVa[0],arrmassVa);
    dreq("Va","м/c",arrForV[0],arrForV);
    dreq("&Delta;Vi","м/с","-",arrDeltaV);
    dreq("ax","м/с&sup2;", arrmassA[0], arrmassA);
    dreq("aср","м/с&sup2;","-",arrAsr);
    dreq("&Delta;ti","c","-",arrDeltaT);
    dreq("t","c","-",arrT);
    dreq("Vcp","м/с","-",arrDeltaVmi);
    dreq("&Delta;Li","м","-",arrDeltaL);
    dreq("L","м","-",arrL);

    var qqq1=0.04,qqq2=0.07;
    if(document.getElementById("payt5").checked){
        qqq1=get("coefficientq1"); qqq2=get("coefficientq2");}

    for (i=1;i<+stairs.kolstairs-rav;i++){
        var table1 = document.createElement("table");
        var tr0 = document.createElement("tr");
        var td0 = document.createElement("td");
        xx.appendChild(table1);
        table1.border="1px";
        table1.appendChild(tr0);
        tr0.appendChild(td0);
        td0.colspan="5";
        td0.innerHTML=String(rav+i+1+" передача");
        td0.width="80px";
        var deadV=[];
        var DeltaVni=9.81*0.01*(1+(0.006*massVforA[i-1+rav]/3.6)*(0.006*massVforA[i-1+rav]/3.6))/massq[i+rav];
        var DeltaLni=massVforA[i-1+rav]/3.6-0.5*DeltaVni;
        deadV[0]=(massVforA[i-1+rav]/3.6-DeltaVni).toFixed(3);
        deadV[1]=(massVforA[i-1+rav]/3.6).toFixed(3);
        var arrmassA1=[];
        for(var q=0;q<+stairs.quantity;q++){
            if (massVa[i+rav][q]/3.6<=deadV[1]) continue;
            for(var qq=2;q<+stairs.quantity;qq++,q++)
            {deadV[qq]=(+massVa[i+rav][q]/3.6).toFixed(3);
                arrmassA1[qq]=(+massA[i+rav][q]).toFixed(3);}
            break;}
        var z =deadV.length;
        var deadV0=[];
        for (q=0;q<z;q++)deadV0[q]=(deadV[q]*3.6).toFixed(3);
        var arrDeltaV1=[];
        arrDeltaV1[0]=DeltaVni.toFixed(3);
        for(q=1;q<z;q++)arrDeltaV1[q]=(deadV[q]-deadV[q-1]).toFixed(3);
        var V=deadV0[0];
        var frequency=V*(massU[i+rav]*tiresMass.Uo)/(0.377*tiresMass.rK);
        var crutch = frequency/rotationICE.np;
        var Me = sborochka.Mp* (Number(rotationICE.a) +Number(rotationICE.b)*crutch+Number(rotationICE.c)*crutch*crutch);
        var F= Me*massU[i+rav]*tiresMass.Uo*sborochka.KPD/tiresMass.rK;
        var Fv=sborochka.Kv*sborochka.S*V*V/13;
        var D=(F- Fv)/(sborochka.mA*9.81);
        var fv=0.01*(1+(0.006*V)*(0.006*V));
        var A=9.81/(1+qqq1+qqq2*massU[i+rav]*massU[i+rav])*(D/1000-fv);
        arrmassA1[0]=A.toFixed(3);
        arrmassA1[1]=(+massAforA2[i-1+rav]).toFixed(3);
        arrMegaVV[i]=[];
        arrMegaTT[i]=[];
        arrMegaLL[i]=[];
        var arrT1=[],arrL1=[];
        arrT1[0]=((+arrMegaTT[i-1][arrMegaTT[i-1].length-1])+1).toFixed(3);
        arrL1[0]=((+arrMegaLL[i-1][arrMegaLL[i-1].length-1])+DeltaLni).toFixed(3);
        var arrDeltaL1=[];
        arrDeltaL1[0]=DeltaLni.toFixed(3);
        var arrAsr1=[];
        var arrDeltaT1=[];
        var arrDeltaVmi1=[];
        arrDeltaT1[0]=1;
        for(qq=1;qq<z;qq++){
            arrAsr1[qq]=(((+arrmassA1[qq])+(+arrmassA1[qq-1]))/2).toFixed(3);
            arrDeltaT1[qq]=(arrDeltaV1[qq]/arrAsr1[qq]).toFixed(3);
            arrT1[qq]=((+arrT1[qq-1])+(+arrDeltaT1[qq])).toFixed(3);
            arrDeltaVmi1[qq]=(((+deadV[qq])+(+deadV[qq-1]))/2).toFixed(3);
            arrDeltaL1[qq]=(arrDeltaVmi1[qq]*arrDeltaT1[qq]).toFixed(3);
            arrL1[qq]=((+arrL1[qq-1])+(+arrDeltaL1[qq])).toFixed(3);
        }

        for (q=0;q<z;q++){
            arrMegaTT[i][q]=(+arrT1[q]);
            arrMegaLL[i][q]=(+arrL1[q]);
            arrMegaVV[i][q]=(+deadV0[q]);
        }

        dreq1("Параметр","Размерность",1,empty,z);
        dreq1("Va","км/ч",deadV0[0],deadV0,z);
        dreq1("Va","м/c",deadV[0],deadV,z);
        dreq1("&Delta;Vi","м/с",arrDeltaV1[0],arrDeltaV1,z);
        dreq1("ax","м/с&sup2;",arrmassA1[0], arrmassA1,z);
        dreq1("aср","м/с&sup2;","-",arrAsr1,z);
        dreq1("&Delta;ti","c",arrDeltaT1[0],arrDeltaT1,z);
        dreq1("t","c",arrT1[0],arrT1,z);
        dreq1("Vcp","м/с","-",arrDeltaVmi1,z);
        dreq1("&Delta;Li","м",arrDeltaL1[0],arrDeltaL1,z);
        dreq1("L","м",arrL1[0],arrL1,z);
    }

    function dreq1(a,b,c,d,n){
        n+=2;
        var tr1 = document.createElement("tr");
        table1.appendChild(tr1);
        for (var j=0;j<n;j++){
            var td1 = document.createElement("td");
            tr1.appendChild(td1);
            td1.align="center";
            td1.width="60px";
            if(j==0) {td1.innerHTML=a;continue;}
            if(j==1) {td1.innerHTML=b;continue;}
            if(j==2) {td1.innerHTML=c;continue;}
            td1.innerHTML=String(+d[j-2]);
        }}

    var sch = document.getElementById("schedule4").getContext("2d");
    var Xmax = arrMegaTT[+stairs.kolstairs-1-rav][arrMegaTT[+stairs.kolstairs-1-rav].length-1];
    var Ymax = arrMegaVV[+stairs.kolstairs-1-rav][arrMegaVV[+stairs.kolstairs-1-rav].length-1];

    headCanv("canvasTime","t,c","V,км/ч",sch);
    footCanv(0,Xmax+5,2,1,10,1,sch,Ymax+20);
    leftCanv(5,Ymax+20,5,1,30,1,sch,Xmax+5);

    sch.fillStyle="red";
    sch.strokeStyle="red";
    sch.beginPath();
    for(i=0; i<+stairs.kolstairs-rav; i++){
        for(var j=0; j<(+arrMegaTT[i].length); j++){
            if(j==0 && i==0) sch.moveTo(useX(arrMegaTT[i][j],Xmax+5), useY(arrMegaVV[i][j],Ymax + 20));
            sch.lineTo(useX(arrMegaTT[i][j],Xmax+5), useY(arrMegaVV[i][j],Ymax + 20));
        }}
    sch.stroke();
    sch.fillText("V=f(t)",useX(arrMegaTT[+stairs.kolstairs-1-rav][arrMegaTT[+stairs.kolstairs-1-rav].length-1],Xmax+5), useY(arrMegaVV[+stairs.kolstairs-1-rav][arrMegaVV[+stairs.kolstairs-1-rav].length-1]+5,Ymax + 20));
    dowland('schedule4','dowlandTime','Time.png');

    sch = document.getElementById("schedule5").getContext("2d");
    Xmax = arrMegaLL[+stairs.kolstairs-1-rav][arrMegaLL[+stairs.kolstairs-1-rav].length-1];
    Ymax = arrMegaVV[+stairs.kolstairs-1-rav][arrMegaVV[+stairs.kolstairs-1-rav].length-1];

    headCanv("canvasWay","L,м","V,км/ч",sch);
    footCanv(0,Xmax+150,100,1,500,1,sch,Ymax+20);
    leftCanv(5,Ymax+20,5,1,30,1,sch,Xmax+150);

    sch.fillStyle="red";
    sch.strokeStyle="red";
    sch.beginPath();
    for(i=0; i<+stairs.kolstairs-rav; i++){
        for( j=0; j<(+arrMegaLL[i].length); j++){
            if(j==0 && i==0) sch.moveTo(useX(arrMegaLL[i][j],Xmax+150), useY(arrMegaVV[i][j],Ymax + 20));
            sch.lineTo(useX(arrMegaLL[i][j],Xmax+150), useY(arrMegaVV[i][j],Ymax + 20));
        }}
    sch.stroke();
    sch.fillText("V=f(L)",useX(arrMegaLL[+stairs.kolstairs-1-rav][arrMegaLL[+stairs.kolstairs-1-rav].length-1],Xmax+150), useY(arrMegaVV[+stairs.kolstairs-1-rav][arrMegaVV[+stairs.kolstairs-1-rav].length-1]+5,Ymax + 20));
    dowland('schedule5','dowlandWay','Way.png');

    var hr = document.createElement("hr");
    xx.appendChild(hr);
}

var massPfv=[];
var massPk=[];

function powerCharacter() {
    var xx =document.getElementById("power").getElementsByTagName("tbody")[0];
    var Pk=[],Pv=[],Pf=[],Pfv=[];
for(var i=0;i<+stairs.quantity;i++){
    Pk[i]=(massP[i]*sborochka.KPD).toFixed(3);
    Pv[i]=((massFv[+stairs.kolstairs-1][i]*massVa[+stairs.kolstairs-1][i]/3.6)/1000).toFixed(3);
    Pf[i]=((massFf[+stairs.kolstairs-1][i]*massVa[+stairs.kolstairs-1][i]/3.6)/1000).toFixed(3);
    Pfv[i]=((+Pf[i])+(+Pv[i])).toFixed(3);
}
    massPfv=Pfv;
    massPk=Pk;
    for (i=0;i<+stairs.quantity;i++){
        var tr = document.createElement("tr");
        xx.appendChild(tr);
        build(massN[i],tr);
        build((+massVa[+stairs.kolstairs-1][i]).toFixed(3),tr);
        build((+massVa[+stairs.kolstairs-1][i]/3.6).toFixed(3),tr);
        build((+massP[i]).toFixed(3),tr);
        build(Pk[i],tr);build(Pf[i],tr);build(Pv[i],tr);build(Pfv[i],tr);
        }
    function build(z,tr) {
        var td = document.createElement("td"); td.width = "80px";td.align = "center";
        tr.appendChild(td); td.innerHTML=z;
    }

    var sch = document.getElementById("schedule6").getContext("2d");
    var Xmax =(+sborochka.Vemax).toFixed(3);
    var Ymax =(sborochka.Pemax*sborochka.KPD).toFixed(3);

    headCanv("canvasPower","V,км/ч","P,кВт",sch);
    footCanv(0,(+Xmax)+Xmax/10,5,1,20,1,sch,(+Ymax)+Ymax/10);
    leftCanv(2,(+Ymax)+Ymax/10,2,1,10,1,sch,(+Xmax)+Xmax/10);

    sch.fillStyle="red";
    sch.strokeStyle="red";
    draw(massP,"Pe");draw(Pk,"Pk");draw(Pf,"Pf");draw(Pfv,"Pf+Pv");
    function draw(z,q) {
        sch.beginPath();
        for(i=0; i<+stairs.quantity; i++) {
            i != 0 ? sch.lineTo(useX(+massVa[+stairs.kolstairs - 1][i],(+Xmax)+Xmax/10), useY(+z[i],(+Ymax) + Ymax/10)) : sch.moveTo(useX(+massVa[+stairs.kolstairs - 1][i],(+Xmax)+Xmax/10), useY(+z[i],(+Ymax) + Ymax/10));
            if (i==+stairs.quantity-1) sch.fillText(q,useX(+massVa[+stairs.kolstairs - 1][i]+2,(+Xmax)+Xmax/10), useY(+z[i],(+Ymax) + Ymax/10));
        }
        sch.stroke();
    }
    dowland('schedule6','dowlandPower','Power.png');
}

 function useX(x,Xmax) {
 return x * 800 / Xmax;
 }
 function useY(y,Ymax) {
 return 800 - y * 800 / Ymax;
 }

function headCanv (nameCanv,nameX,nameY,sch){
 document.getElementById(nameCanv).style.display="block";
 sch.font="bold 12px sans-serif";
 sch.textAlign = "center";
 sch.fillText(nameX , 770, 780);
 sch.textAlign = "left";
 sch.fillText(nameY, 35, 10);
 }

function footCanv (a1,MAXforX,a2,a3,a4,a5,sch,yMax){
 sch.textAlign = "center";
 var y = useY(0,yMax);
 for (var mark = a1; mark <= MAXforX; mark += a2) {
 var x = useX(mark/a3,MAXforX);
 if (mark % a4 == 0) {
 sch.fillText(String(mark/a5), x, y - 5);
 sch.fillRect(x - 0.5, y - 4, 1, 3);
 }
 else sch.fillRect(x - 0.5, y - 2, 1, 3);
 }
 }

 function leftCanv (b1,MAXforY,b2,b3,b4,b5,sch,xMax){
 sch.textAlign = "left";
 sch.textBaseline = "middle";
 var x = useX(0,xMax);
 for (var mark = b1; mark <=MAXforY; mark += b2) {
 var y = useY(mark/b3,MAXforY);
 if (mark % b4 == 0) {
 sch.fillText(String(mark/b5), x + 10, y);
 sch.fillRect(x + 4, y - 0.5, 3, 1);
 }
 else sch.fillRect(x + 2, y - 0.5, 3, 1);
 }
}

 function rightCanv (b1,MAXforY,b2,b3,b4,b5,sch,xMax){
 sch.textAlign = "right";
 var x = useX(xMax,xMax);
 for (var mark = b1; mark <=MAXforY; mark += b2) {
 var y = useY(mark/b3,MAXforY);
 if (mark % b4 == 0) {
 sch.fillText(String(mark/b5), x - 6, y);
 sch.fillRect(x - 4, y - 0.5, 3, 1);
 }
 else sch.fillRect(x - 2, y - 0.5, 3, 1);
 }
 }
//использовать порядок head->foot->left если есть right то он последний
//Добавить регулировку минимального удельного расхода топлива gemin (1124) сейчас это 250, а также gep, q (плотность топлива)
function economy() {
    document.getElementById("spechialSpeed").innerHTML=(sborochka.Vemax*2/3).toFixed(3);
     var V,P=0;
     for (var i=0; i<+stairs.quantity; i++){
         if (P<massP[i]){
             P=massP[i];
             V=massVa[+stairs.kolstairs - 1][i];
     }}
    var GEP=1.05, GEM=250, fuelDensity=750;
    if(document.getElementById("payt6").checked){
        GEP=get("coefficientForGEP"); GEM=get("specificConsumption"); fuelDensity=get("fuelDensity");}
    var Qs=[];
    var Ki=[],U=[],Ke=[],E=[];
    for(i=0; i<+stairs.quantity; i++){
        U[i]=(massPfv[i]/massPk[i]).toFixed(3);
        E[i]=(massVa[+stairs.kolstairs - 1][i]/V).toFixed(3);
        Ki[i]=(3.27-8.22*U[i]+9.13*U[i]*U[i]-3.18*U[i]*U[i]*U[i]).toFixed(3);
        Ke[i]=(1.25-0.99*E[i]+0.98*E[i]*E[i]-0.24*E[i]*E[i]*E[i]).toFixed(3);
        Qs[i]=(GEP*GEM*Ke[i]*Ki[i]*massPfv[i]*100/(fuelDensity*massVa[+stairs.kolstairs - 1][i]*sborochka.KPD)).toFixed(3);
    }
    var xx =document.getElementById("economy").getElementsByTagName("tbody")[0];
    for (i=0;i<+stairs.quantity;i++){
        var tr = document.createElement("tr");
        xx.appendChild(tr);
        build(+massVa[+stairs.kolstairs - 1][i].toFixed(3),tr);
        build(massPk[i],tr);
        build(massPfv[i],tr);
        build(U[i],tr);
        build(E[i],tr);build(Ki[i],tr);build(Ke[i],tr);build(Qs[i],tr);
    }
    function build(z,tr) {
        var td = document.createElement("td"); td.width = "80px";td.align = "center";
        tr.appendChild(td); td.innerHTML=z;
    }
    var sch = document.getElementById("schedule7").getContext("2d");
    var Xmax =(+sborochka.Vemax).toFixed(3);
    var Ymax =Qs[+stairs.quantity-1];

    headCanv("canvasFuel","V,км/ч","Qs, л/100км",sch);
    footCanv(0,(+Xmax)+Xmax/10,5,1,20,1,sch,(+Ymax)+Ymax/10);
    leftCanv(0.5,(+Ymax)+Ymax/10,0.5,1,2,1,sch,(+Xmax)+Xmax/10);

    sch.fillStyle="red";
    sch.strokeStyle="red";
        sch.beginPath();
        for(i=0; i<+stairs.quantity; i++) {
            i != 0 ? sch.lineTo(useX(+massVa[+stairs.kolstairs - 1][i],(+Xmax)+Xmax/10), useY(Qs[i],(+Ymax) + Ymax/10)) : sch.moveTo(useX(+massVa[+stairs.kolstairs - 1][i],(+Xmax)+Xmax/10), useY(Qs[i],(+Ymax) + Ymax/10));
        }
        sch.stroke();
    dowland('schedule7','dowlandFuel','Economy.png');
}

function allme() {
    considerAllWeight();
    dimensions();
    transmission();
    paramEngine();
    frequencyICE();
    coefficientABC();
    buble();
    tires();
    topGear(0.4,0.77,88,5,0,0);
    tireNext(0,0,0);
    stair();
    tractionCharacteristic();
    dynamicCharacteristic();
    acceleration();
    builderMega();
    TimeWay();
    powerCharacter();
    economy();
}
function builderForBigTable() {
    var schedule = document.getElementById('schedule8');
    schedule.width=(+stairs.quantity+1)*70;
    schedule.height=(stairs.kolstairs*9+4)*25;
    var n = 0;
    var sch = document.getElementById("schedule8").getContext("2d");
    sch.font="bold 12px sans-serif";
    sch.textAlign="left";
    sch.fillStyle="black";
    sch.strokeStyle="black";
    sch.fillText("ne", n, 10);
    sch.fillText("Pe", n, 35);
    sch.fillText("Me", n, 60);
    sch.textAlign="center";
    for (var i = 0; i < +stairs.quantity; i++) {
        n += 70;
        sch.fillText(massN[i], n, 10);
        sch.fillText((+massP[i]).toFixed(3), n, 35);
        sch.fillText((+massM[i]).toFixed(3), n, 60);
    }
    var nn=60;
    for (i = 0; i < +stairs.kolstairs; i++) {
        sch.textAlign="left";
        n=0;
        nn+=25;
        sch.fillText("U"+String(i+1)+"="+String(massU[i])+",q"+String(i+1)+"="+String(massq[i].toFixed(3)), n, nn); nn+=25;
        sch.fillText("Va,км/ч", n, nn); nn+=25;
        sch.fillText("Fт,Н", n, nn); nn+=25;
        sch.fillText("Fв,Н", n, nn); nn+=25;
        sch.fillText("D", n, nn); nn+=25;
        sch.fillText("fv", n, nn); nn+=25;
        sch.fillText("Fф,Н", n, nn); nn+=25;
        sch.fillText("a,м/с2;", n, nn); nn+=25;
        sch.fillText("Fф+Fв", n, nn);
        sch.textAlign="center";
        for (var j = 0; j < +stairs.quantity; j++) {
            n+=70;
            sch.fillText((+massVa[i][j]).toFixed(3), n, nn-175);
            sch.fillText((+massFt[i][j]).toFixed(3), n, nn-150);
            sch.fillText((+massFv[i][j]).toFixed(3), n, nn-125);
            sch.fillText((+massD[i][j]).toFixed(3), n, nn-100);
            sch.fillText((+massfv[i][j]).toFixed(3), n, nn-75);
            sch.fillText((+massFf[i][j]).toFixed(3), n, nn-50);
            sch.fillText((+massA[i][j]).toFixed(3), n, nn-25);
            sch.fillText((+massFfFv[i][j]).toFixed(3), n, nn);
        }
    }

        var a=  document.getElementById('dowlandBigTable');
        a.download = 'Big table.jpeg';
        a.href = schedule.toDataURL("jpeg");
        document.getElementById("dowlandBigTable").style.display="block";
}
//Возможно в будущем добавить характерные точки на последние 3 графика.