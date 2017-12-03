
function prev() {
    var a=[];
    for (var i=0;i<8;i++){
        a[i]=document.getElementById("slider2_"+String(i+1));
    }
    for(i=0;i<8;i++){
        if (a[i].checked){
           if(i==0) {
               a[7].checked="checked";
               break;
           }
        a[i-1].checked="checked";
           break;
        }
    }
}

function next() {
    var a=[];
    for (var i=0;i<8;i++){
        a[i]=document.getElementById("slider2_"+String(i+1));
    }
    for(i=0;i<8;i++){
        if (a[i].checked){
            if(i==7) {
                a[0].checked="checked";
                break;
            }
            a[i+1].checked="checked";
            break;
        }
    }
}