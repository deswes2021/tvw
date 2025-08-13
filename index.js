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
        position:'abdolute', border:'1px solid silver', inset:'1px'
    }).appendTo('body');
    return false;
}