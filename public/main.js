var socket = io.connect("http://104.197.249.45:8000", {'forceNew': true});

socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function formatDate(date){
    var fecha = new Date(date);
    return fecha.getDate() + "/" + fecha.getMonth() + 1 + "/"+ fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
}

function render(data){
    var html = data.map(function(elem, index){
        elem.date = formatDate(elem.date);
        return (`
                <div>
                  <label><b>${elem.date} - ${elem.author}: </b></label>
                  <label>${elem.message}</label>
                </div>
            `);
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

function enviarMensaje(data){

    var payload = {
        author: document.getElementById('author').value,
        message: document.getElementById('message').value,
        date: new Date().getTime()
    };

    document.getElementById('message').value = "";

    socket.emit('new-message', payload);
    return false;

}

