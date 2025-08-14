var its, itc, ito;

$(document).off('contextmenu').on('contextmenu', function (ex) { ex.preventDefault(); });
$(document).off('keydown').on('keydown', function (ex) { ex.preventDefault(); });
$(document).off('click').on('click', function (ex) { ex.preventDefault(); });

/*--CONTROL READY DOCUMENT--*/
function setCSS() {
    $('body').css({ backgroundColor: 'rgba(0,0,0,1)', margin: 0, padding: 0, userSelect: 'none', pointerEvents: 'none' });
    ito = location.href.split('#')[1] || 'menu';
    getKNL('');
    return false;
}

/*--GET LIST KNLS FROM GIHUB--*/
function getKNL(prox) {
    fetch(prox + 'https://raw.githubusercontent.com/deswes2021/tvw/main/lista.js')
        .then(rs0 => { rs0.text(); })
        .then(dt0 => { setKNL(dt0); })
        .fail(er0 => { if (!prox) { getKNL('https://corsproxy.io/?url='); } else { console.log('Error: ' + er0); } });
    return false;
}

/*--SET LIST KNLS TO XPLAYER--*/
function setKNL(dats) {
    $('body').empty();
    $('<div id="xbody"></div>').css({
        position: 'absolute', backgroundColor: 'rgba(64,64,64,0.5)', border: '1px solid silver', inset: '1px', display: 'flex',
        flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center'
    }).appendTo('body');
    $('<div id="xplayer"></div>').css({
        maxWidth: '99%', maxHeight: '99%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', overflowX: 'hidden',
        overflowY: 'scroll', scrollbarWidth: 'none'
    }).appendTo('#xbody');
    /*--SET-LIST-------------------------------------------------------------------------*/
    var data = $.trim(dats);
    if (!/^(\[)/i.test(data)) { return; } console.log(data);return;
    for (let index = 0; index < data.length; index++) {
        const knl = data[index];
        if (knl.url) {
            $('<input type="image" src="' + knl.logo + '">')
                .css({ width: '300px', height: '160px' }).appendTo('#xplayer');
        }
    }
    return false;
}