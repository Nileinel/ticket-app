import express, { Router } from 'express';
import { ITicket, Ticket } from '../models/ticket.model';
import { isValidObjectId } from 'mongoose';

export const ticketRouter: Router = express.Router();

// Get all tickets 
ticketRouter.get('/', async (_req, res) => {
    try {
        const tickets = await Ticket.find({});
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets' });
    }
});

// Get a ticket by ID
ticketRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: `Invalid ticket ID format: ${id}.` });
    }

    try {
        const ticket = await Ticket.findById(id);
        if (ticket) {
            res.status(200).json(ticket);
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        res.status(500).json({ message: `Failed to fetch ticket with ID ${id}.` });
    }
});

// Create new ticket 
ticketRouter.post('/', async (req, res) => {
    try {
        const ticketData: Partial<ITicket> = req.body;
        const newTicket = new Ticket(ticketData);
        const savedTicket = await newTicket.save();

        if (!savedTicket) {
            return res.status(400).json({ message: 'Failed to create ticket' });
        } else {
            res.status(201).json({ message: `Created a new ticket: ID ${savedTicket._id}.` });
        }
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'Error creating ticket' });
    }
});

// Update a ticket by ID
ticketRouter.put('/:id', async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: `Invalid ticket ID format: ${id}.` });
    }

    try {
        const updatedData: Partial<ITicket> = req.body;
        const updatedTicket = await Ticket.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        
        if (updatedTicket) {
            res.status(200).json({ message: `Updated ticket: ID ${updatedTicket._id}.` });
        } else {
            res.status(404).json({ message: `Ticket ID ${id} not found` });
        }
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ message: 'Error updating ticket' });
    }
});

// Delete a ticket by ID
ticketRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: `Invalid ticket ID format: ${id}.` });
    }

    try {
        const deletedTicket = await Ticket.findByIdAndDelete(id);
        if (deletedTicket) {
            res.status(200).json({ message: `Deleted ticket: ID ${deletedTicket._id}.` });
        } else {
            res.status(404).json({ message: `Ticket ID ${id} not found` });
        }
    } catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).json({ message: 'Error deleting ticket' });
    }
});
