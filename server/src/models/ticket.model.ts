import mongoose from 'mongoose'

export interface ITicket {
    _id?: mongoose.Types.ObjectId;
    name: string;
}

type TicketModel = mongoose.Model<ITicket>;

const ticketSchema = new mongoose.Schema<ITicket, TicketModel>({
    name: { type: String, required: true }
}, {
    timestamps: true
});

export const Ticket = mongoose.model<ITicket, TicketModel>('Ticket', ticketSchema);