import { getVendorTickets } from '@/lib/api/ticket';
import { getUserSession } from '@/lib/core/sesson';
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Edit2 } from "lucide-react";
import { redirect } from 'next/navigation';
import DeleteTicketButton from '@/components/DeleteTicketButton';
import EditTicketButton from '@/components/EditTicketButton';

const VendorTickets = async () => {
    const user = await getUserSession();
    if (!user || user.role !== 'vendor') {
        redirect('/unauthorized');
    }

    let tickets = [];
    try {
        const data = await getVendorTickets(user.id);
        tickets = Array.isArray(data) ? data : (data?.tickets || []);
    } catch (error) {
        console.error('Error fetching vendor tickets:', error);
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved': return 'success';
            case 'rejected': return 'danger';
            default: return 'warning';
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">My Tickets</h2>
                <p className="text-sm text-default-500">Manage your submitted tickets ({tickets.length})</p>
            </div>

            <Table aria-label="Vendor tickets management table">
                <Table.ResizableContainer>
                    <Table.Content className="min-w-[800]">
                        <Table.Header>
                            <Table.Column isRowHeader defaultWidth="2fr" id="ticketTitle" minWidth={200}>
                                Ticket Title
                            </Table.Column>
                            <Table.Column defaultWidth="1.5fr" id="route" minWidth={150}>
                                Route
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="type" minWidth={100}>
                                Type
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="price" minWidth={100}>
                                Price
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="qty" minWidth={80}>
                                Qty
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                                Status
                            </Table.Column>
                            <Table.Column defaultWidth="1.5fr" id="actions" minWidth={150}>
                                Actions
                            </Table.Column>
                        </Table.Header>

                        <Table.Body emptyContent={"No tickets found."}>
                            {tickets.map((ticket) => (
                                <Table.Row key={ticket._id}>
                                    <Table.Cell>
                                        <div className="font-medium text-default-800">
                                            {ticket.ticketTitle}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-default-600">
                                            {ticket.fromLocation} → {ticket.toLocation}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm capitalize">{ticket.transportType}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm font-medium">৳{ticket.price}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm">{ticket.ticketQuantity}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Chip
                                            color={getStatusColor(ticket.status)}
                                            size="sm"
                                            variant="soft"
                                            className="capitalize"
                                        >
                                            {ticket.status || "Pending"}
                                        </Chip>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="relative flex items-center gap-2">
                                            <EditTicketButton
                                                ticket={ticket}
                                                isRejected={ticket.status === 'rejected'}
                                            />
                                            <DeleteTicketButton
                                                ticketId={ticket._id}
                                                vendorId={user.id}
                                                isRejected={ticket.status === 'rejected'}
                                            />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ResizableContainer>
            </Table>
        </div>
    );
};

export default VendorTickets;