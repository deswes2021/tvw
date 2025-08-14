let jsLST, its, itc, ito, player, vopc;

/*--BLOQ-CONTEXTMENU------------------*/
$(document).on('contextmenu', function (ex) {
    if (ex.preventDefault) { ex.preventDefault(); }
    else { ex.returnValue = false; }
});

/*--BLOQ-KEYDOWN---------------------*/
$(document).on('keydown', function (ex) {
    if (ex.preventDefault) { ex.preventDefault(); }
    else { ex.returnValue = false; }
});

/*--BLOQ-CLICK----------------------*/
$(document).on('click', function (ex) {
    if (ex.preventDefault) { ex.preventDefault(); }
    else { ex.returnValue = false; }
});

/*--SET-HORAS----------------------*/
function getHH() {
    var now = new Date();
    var hh = String(now.getHours()).padStart(2, '0');
    var mm = String(now.getMinutes()).padStart(2, '0');
    var ss = String(now.getSeconds()).padStart(2, '0');
    var ho = hh + mm + ss;
    return ho;
}

/*--CONTROL READY DOCUMENT--*/
function setCSS() {
    $('body').css({ backgroundColor: 'rgba(0,0,0,1)', margin: 0, padding: 0, userSelect: 'none', pointerEvents: 'none' });
    ito = location.href.split('#')[1] || 'menu';
    setLST();
    return false;
}

/*--SET LIST KNLS TO XPLAYER--76287676*/
function setKNL(data) {
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
    itc = 0;
    data.forEach(el => {
        if (el.url) {
            itc++;
            $('<div class="knl0" id="' + itc + '" tipo="' + el.tipo + '" url="' + el.url + '" tabindex="0">' +
                '<input class="knl1" type="image" src="' + el.logo + '" onerror="this.onerror=null;">' +
                '<input class="knl2" type="button" value="' + el.nombre + '">' +
                '</div>').appendTo('#xplayer').on('click', function () { its = parseInt($(this).attr('id')); selKNL(1); });
        }
    });
    /*--SET-KEYDOWN--------------------------------------------------------------------*/
    $(document).off('keydown').on('keydown', function (ex) {
        var kc = ex.keyCode;
        /*-------------------------------------*/
        var dpl = $('#xplayer');
        var dpi = dpl.children();
        var dti = dpi.filter(function () { return $(this).position().top === dpi.first().position().top; });
        var dil = dti.length;
        /*-------------------------------------*/
        if (kc === 37) { its--; selKNL(0); }
        else if (kc === 38) { its -= dil; selKNL(0); }
        else if (kc === 39) { its++; selKNL(0); }
        else if (kc === 40) { its += dil; selKNL(0); }
        else if (kc === 13) { selKNL(1); }
        else if (kc === 8) {
            var hr = location.href;
            var hr1 = hr.split('#') || null;
            var nr = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
            if (hr1) { location.replace('./index.html?' + nr) }
        }
        else if (ex.preventDefault) { ex.preventDefault(); }
        else { ex.returnValue = false; }
    });
    /*--SET-CSS-------------------------------------------------------------------------*/
    if (itc > 0) {
        its = parseInt(localStorage.getItem(ito), 10) || 1;
        $('.knl0').css({ backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid silver', borderRadius: '5px', margin: '5px', padding: '10px', paddingBottom: '0px', display: 'grid', userSelect: 'none', pointerEvents: 'all' });
        $('.knl1').css({ backgroundColor: 'silver', width: '280px', height: '140px', border: '1px solid silver', borderRadius: '5px', userSelect: 'none', pointerEvents: 'none' });
        $('.knl2').css({ backgroundColor: 'transparent', color: 'white', width: '280px', height: '30px', border: 'none', lineHeight: '0.85', userSelect: 'none', pointerEvents: 'none', textTransform: 'upercase' });
        selKNL(0);
    } else { setERR('LISTA VACIA'); }
    return false;
}

/*--CONTROL-ERROR-----------------*/
function setERR(msj) {
    $('body').empty();
    $('<div id="xbody">' + msj + '</div>').css({
        position: 'absolute', left: '1px', top: '1px', right: '1px', bottom: '1px', userSelect: 'none', pointerEvents: 'none',
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', fontSize: '2em', color: 'white',
        textShadow: '0 0 1px black, 0 0 2px black, 0 0 3px black, 0 0 5px aqua, 0 0 10px aqua, 0 0 15px aqua, 0 0 20px aqua'
    }).appendTo('body');
    /*--KEYDOWN---------------------*/
    $(document).off('keydown').on('keydown', function (ex) {
        var kc = ex.keyCode;
        if (kc === 8) {
            var hr = location.href;
            var hr1 = hr.split('#') || null;
            var nr = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
            if (hr1) { location.replace('./index.html?' + nr) }
        }
        else if (ex.preventDefault) { ex.preventDefault(); }
        else { ex.returnValue = false; }
    });
    return false;
}

/*--SELECTION-CHANNEL--*/
function selKNL(opc) {
    if (its > itc) { its = itc; }
    if (its < 1) { its = 1; }
    var d0 = $('#xplayer');
    var d1 = $('.knl0');
    var d2 = $('#' + 1);
    d1.css({ backgroundColor: 'rgba(0,0,0,0.5)' });
    d2.css({ backgroundColor: 'rgba(255,0,0,0.5)' });
    /*------------------------------------------------*/
    var sOff = d2.offset().top - d0.offset().top;
    var sPos = d0.scrollTop() + sOff - d0.height() / 2 + d2.outerHeight() / 2;
    d0.animate({ scrollTop: sPos }, 100);
    localStorage.setItem(ito, its);
    /*------------------------------------------------*/
    if (opc === 1) { }
    return false;
}




















/*--------------------------------------------------------------------------*/
function setLST() {
    jsLST = [
        {
            nombre: "tcs +",
            tipo: "nacionales",
            logo: "https://raw.githubusercontent.com/deswes2021/tvw/main/img/naccanal1.jpg",
            url: "https://telecorporacion.cdn.vustreams.com/live/19b307cf-3f2d-44cb-bce6-0fd65365c56a/live.isml/live.m3u8",
        },
        {
            nombre: "Canal2",
            tipo: "nacionales",
            logo: "https://raw.githubusercontent.com/deswes2021/tvw/main/img/naccanal2.jpg",
            url: "https://telecorporacion-es.cdn.vustreams.com/live/d3e259fa-736d-46b0-b1c9-71caf946ace9/live.isml/d3e259fa-736d-46b0-b1c9-71caf946ace9.m3u8",
        },
        {
            nombre: "Canal3",
            tipo: "nacionales",
            logo: "https://raw.githubusercontent.com/deswes2021/tvw/main/img/naccanal3.jpg",
            url: "https://cloud2.streaminglivehd.com:1936/8048/8048/playlist.m3u8",
        },
        {
            nombre: "Canal4",
            tipo: "nacionales",
            logo: "https://raw.githubusercontent.com/deswes2021/tvw/main/img/naccanal4.jpg",
            url: "https://telecorporacion-es.cdn.vustreams.com/live/c5ce1839-52b2-45df-b86b-0b3a00ed4f8f/live.isml/live.m3u8",
        },
        {
            nombre: "Canal5",
            tipo: "nacionales",
            logo: "https://raw.githubusercontent.com/deswes2021/tvw/main/img/naccanal5.jpg",
            url: "https://cdn.elsalvadordigital.com:1936/wotvw/smil:wotvw.smil/playlist.m3u8",
        },
        {
            nombre: "Canal6",
            tipo: "nacionales",
            logo: "https://raw.githubusercontent.com/deswes2021/tvw/main/img/naccanal6.jpg",
            url: "https://telecorporacion.cdn.vustreams.com/live/b164ebe7-decf-4a5a-8aea-5bb56fb92dfc/live.isml/live.m3u8",
        },
        {
            nombre: "Canal7",
            tipo: "nacionales",
            logo: "https://raw.githubusercontent.com/deswes2021/tvw/main/img/naccanal7.jpg",
            url: "https://cdn.elsalvadordigital.com:1936/wotvw/smil:wotvw.smil/playlist.m3u8",
        },
        {
            nombre: "Canal8",
            tipo: "nacionales",
            logo: "https://raw.githubusercontent.com/deswes2021/tvw/main/img/naccanal8.jpg",
            url: "http://201.247.102.189/tmp_hls/stream/index.m3u8",
        },
        {
            nombre: "Canal9",
            tipo: "nacionales",
            logo: "https://raw.githubusercontent.com/deswes2021/tvw/main/img/naccanal9.jpg",
            url: "https://streaming.asamblea.gob.sv/hls/plenariahd.m3u8",
        },
        {
            nombre: "Canal10",
            tipo: "nacionales",
            logo: "https://raw.githubusercontent.com/deswes2021/tvw/main/img/naccanal10.jpg",
            url: "https://5ca3e84a76d30.streamlock.net:443/tves/videotves/playlist.m3u8",
        },
        {
            nombre: "Canal11",
            tipo: "nacionales",
            logo: "https://raw.githubusercontent.com/deswes2021/tvw/main/img/naccanal11.jpg",
            url: "https://stream.giostreaming.net:19360/canal11/canal11.m3u8",
        },
        {
            nombre: "Canal12",
            tipo: "nacionales",
            logo: "https://raw.githubusercontent.com/deswes2021/tvw/main/img/naccanal12.jpg",
            url: "https://live.airstream.run/alba-sv-c12-c12/original.m3u8",
        },
        {
            nombre: "Canal19",
            tipo: "nacionales",
            logo: "https://raw.githubusercontent.com/deswes2021/tvw/main/img/naccanal19.jpg",
            url: "https://mgv-channel19.akamaized.net/hls/live/2093190/MGV_CHANNEL19/master.m3u8",
        },
        {
            nombre: "Canal21",
            tipo: "nacionales",
            logo: "https://raw.githubusercontent.com/deswes2021/tvw/main/img/naccanal21.jpg",
            url: "https://mgv-channel21.akamaized.net/hls/live/2093191/MGV_CHANNEL21/master.m3u8",
        }
    ];
    setKNL(jsLST);
    return false;
}

function myHTML() {
    var dataHTML = `<!DOCTYPE html>
<html lang="en"><head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>wtv</title>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js"></script>
</head><body>
<script>
    function setSRC(prox) {
        fetch((prox||'') + 'https://raw.githubusercontent.com/deswes2021/tvw/main/index.js')
            .then(rs0 => rs0.text())
            .then(dt0 => {
                var scr1 = document.createElement('script');
                scr1.text = dt0;
                document.head.appendChild(scr1);
                if (typeof setCSS === 'function') { setCSS(); }
            }).catch(er0 => {
                if (!prox) { setSRC('https://corsproxy.io/?url='); } else { console.log('Error: ' + er0); }
            });
        return false;
    }
    $(window).on('load',function(){ setSRC(); });
</script>    
</body></html>`;
    return false;
}