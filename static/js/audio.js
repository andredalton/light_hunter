/**
 * Created by avale on 25/06/16.
 */
var audio1 = new Audio('/static/sound/sound1.mp3');
audio1.volume = 0;
audio1.play();

var audio2 = new Audio('/static/sound/sound2.mp3');
audio2.volume = 0;
audio2.play();

var audio3 = new Audio('/static/sound/sound3.mp3');
audio3.volume = 0;
audio3.play();

if (frame_rate === undefined) {
    var frame_rate = 25;
}


function get_status() {
    $.get('mask', function(data){
        if (status === undefined) {
            var status = data;
        }
        console.log(status + ' >> ' + data);
        if (data != status) {
            alert(status + ' >> ' + data);
            status = data
        }
        //var the_page_loaded = $(data);
        //document.title = $('title', the_page_loaded).text();
        //$('#where').html($('#what', the_page_loaded)); //do the load as you wanted
    });
}

setInterval(get_status, 1000/frame_rate);