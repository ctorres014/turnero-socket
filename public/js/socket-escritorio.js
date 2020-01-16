// Definir el comando de socket para trabajar 
var socket = io();

// Configuracion para obtener los parametros por url
var urlParams = new URLSearchParams(window.location.search);
if (!urlParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error("Error al recibir el parámetro");
}

var desktop = urlParams.get('escritorio');

// Definimos la coneccion
socket.on('connect', function() {
    console.log('Conectado al server en escritorio');
});

$('h1').text('Escritorio ' + desktop);

$('#atenderTicket').on('click', function() {
    // Emision de mensaje al servidor
    socket.emit('attendnewticket', desktop, function(attendTicket) {
        $('small').text(attendTicket);
    });
});