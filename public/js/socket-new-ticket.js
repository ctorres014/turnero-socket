var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado con el servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

// Escuchamos las emisiones del server
socket.on('currentTicket', function(ticket) {
    console.log(ticket);
    label.text(ticket.currentTK);
})

// Agregamos un evento a los botones
$('button').on('click', function() {
    // Emision de mensaje al servidor
    socket.emit('newTicket', null, function(newTicket) {
        label.text(newTicket);
    });
});