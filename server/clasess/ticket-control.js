// Importamos el FS
const fs = require('fs');

class Ticket {
    constructor(ticket, desktop) {
        this.numTicket = ticket;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.numTicket = 0;
        // Si hay un caso de reinicio del servidor
        // Podemos saber cual fue el último ticket atendido
        this.hoy = new Date().getDate();
        // Definimos un array de los tickets 
        // pendientes de atender
        this.pendingTickets = [];
        // Array para almacenar los ultimos 4 tk atendidos
        this.lastFourTickets = [];

        let data = require('../data/data.json');

        // Verificar si inicializamos TicketControl
        if (data.hoy === this.hoy) {
            this.numTicket = data.numTicket;
            this.pendingTickets = data.pendingTickets;
            this.lastFourTickets = data.lastFourTickets;
        } else {
            // Grabamos en el archivo json 
            // los valores actuales
            this.reiniciarConteo();
        }

    }

    getLastTickets() {
        return this.lastFourTickets;
    }

    atenderTicket(desktop) {

        if (this.pendingTickets.length === 0) {
            return "No existen tickets";
        }

        let assingTicket = this.pendingTickets[0].numTicket;
        this.pendingTickets.shift(); // Elimino el elemento de base cero del array

        let ticket = new Ticket(assingTicket, desktop);
        console.log(ticket);

        // Asignar en un array los tk que estan siendo atendidos (hasta 4)
        this.lastFourTickets.unshift(ticket); // Insertamos un nuevo elemento al inicio del array

        if (this.lastFourTickets.length > 4) {
            this.lastFourTickets.splice(-1, 1); // Borramos el ultimo elemento
        }
        this.guardarArchivoTKActual();

        return assingTicket;

    }

    getUltimoTicket() {
        return `Ticket ${this.numTicket}`;
    }

    siguiente() {
        this.numTicket += 1;
        let tickets = {
            numTicket: this.numTicket
        }
        this.pendingTickets.push(tickets);
        this.guardarArchivoTKActual();
        return `Ticket ${this.numTicket}`;
    }

    reiniciarConteo() {
        this.numTicket = 0;
        this.pendingTickets = [];
        this.lastFourTickets = [];
        this.guardarArchivoTKActual();
    }

    guardarArchivoTKActual() {
        let jsonData = {
            numTicket: this.numTicket,
            hoy: this.hoy,
            pendingTickets: this.pendingTickets,
            lastFourTickets: this.lastFourTickets
        }
        let dataString = JSON.stringify(jsonData);
        //Guardamos los datos en el archivo
        fs.writeFileSync('./server/data/data.json', dataString);
    }
}

module.exports = { TicketControl }