var socket = io.connect("http://104.197.249.45:8000", {'forceNew': true});

socket.on('messages', function(data){
    console.log(data);
    render(data);
});

socket.on('escribiendo', function(data){
    console.log("devuelve la petición")
    render_writing(data);
});

socket.on('paro', function(data){
    document.getElementById('escribiendo').innerHTML = "";
});

function formatDate(date){
    var fecha = new Date(date);
    return fecha.getDate() + "/" + fecha.getMonth() + 1 + "/"+ fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
};

function render_writing(data){
    var html = `
                <label>${data.author} está escribiendo</label>
            `;

    document.getElementById('escribiendo').innerHTML = html;
};

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

function verificarTexto() {
    if (document.getElementById('message').value == ''){

        console.log("Paro de escribir");
        socket.emit('stop', null);
    }else{
        console.log("escribiendo...");
        var payload = {
            author: document.getElementById('author').value
        };

        console.log(payload);

        socket.emit('writting', payload);
    }
}

function escribiendo(){
    if (document.getElementById('message').value != '') {
        console.log("escribiendo...");
        var payload = {
            author: document.getElementById('author').value
        };

        console.log(payload);

        socket.emit('writting', payload);
    }

}

