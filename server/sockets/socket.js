const { io } = require('../server');
const { TicketControl } = require('../clasess/ticket-control');

let tkControl = new TicketControl();


io.on('connection', (client) => {

    // Escuchar solicitud
    client.on('newTicket', (data, callback) => {
        let newTicket = tkControl.siguiente();
        callback(newTicket);
    });
    client.on('attendnewticket', (data, callback) => {
        let attendTicket = tkControl.atenderTicket(data);
        callback(attendTicket);
        // Notificamos cambios
        client.broadcast.emit('lastTicketsAttend', {
            lastTickts: tkControl.getLastTickets()
        })
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });


    // Emitimos al cliente
    client.emit('currentTicket', {
        currentTK: tkControl.getUltimoTicket()
    });
    client.emit('lastTickets', {
        lastTickets: tkControl.getLastTickets()
    });

});