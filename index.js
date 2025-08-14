var its, itc, ito;

$(document).off('contextmenu').on('contextmenu', function (ex) { ex.preventDefault(); });
$(document).off('keydown').on('keydown', function (ex) { ex.preventDefault(); });
$(document).off('click').on('click', function (ex) { ex.preventDefault(); });

/*--CONTROL READY DOCUMENT--*/
function setCSS(){
    $('body').css({ backgroundColor: 'rgba(0,0,0,1)', margin: 0, padding: 0, userSelect: 'none', pointerEvents: 'none' });
    ito = location.href.split('#')[1] || 'menu';
    getKNL();
    return false;
}

function getKNL(){
    $('body').empty();
    $('<div id="xbody"></div>').css({
        position:'absolute', backgroundColor:'rgba(64,64,64,0.5)', border:'1px solid silver', inset:'1px', display:'flex',
        flexWrap:'wrap', justifyContent:'center', alignContent:'center'
    }).appendTo('body');
    $('<div id="xplayer"></div>').css({
        maxWidth:'99%', maxHeight:'99%', display:'flex', flexWrap:'wrap', justifyContent:'center', overflowX:'hidden',
        overflowY:'scroll', scrollbarWidth:'none' 
    }).appendTo('#xbody');
    /*--GET-LIST-------------------------------------------------------------------------*/
    fetch('https://raw.githubusercontent.com/deswes2021/tvw/main/lista.js')
    .then(r0 => r0.text())
    .then(d0 => {
        d0.forEach(el => {
            $('<input type="image" src="'+el.logo+'">').css({ width:'300px', height:'160px' });
        });
    });
    return false;
}