// Escribimos el comando para trabajar con socketio
var socket = io();

var lblTicket1 = $("#lblTicket1")
var lblTicket2 = $("#lblTicket2")
var lblTicket3 = $("#lblTicket3")
var lblTicket4 = $("#lblTicket4")

var lblEscritorio1 = $("#lblEscritorio1")
var lblEscritorio2 = $("#lblEscritorio2")
var lblEscritorio3 = $("#lblEscritorio3")
var lblEscritorio4 = $("#lblEscritorio4")


var ticketsArray = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var desktopArray = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('connect', function() {
    console.log("Conectado con el server en vista de turnos");
});

socket.on('lastTickets', function(tickets) {
    console.log('tickets', tickets);
    printTickets(tickets.lastTickets);
});

socket.on('lastTicketsAttend', function(tickets) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    printTickets(tickets.lastTickts);
});

function printTickets(tickets) {
    for (var i = 0; i <= tickets.length - 1; i++) {
        ticketsArray[i].text('Ticket ' + tickets[i].numTicket);
        desktopArray[i].text('Escritorio ' + tickets[i].desktop);
    }
}