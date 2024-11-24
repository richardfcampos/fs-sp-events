import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Event {
    event_name: string;
    odds: number;
}
async function main(): Promise<void> {
    const events: Event[]    = [
        { event_name: 'Soccer: Team A vs. Team B', odds: 1.75 },
        { event_name: 'Basketball: Team C vs. Team D', odds: 2.10 },
        { event_name: 'Tennis: Player E vs. Player F', odds: 1.50 },
        { event_name: 'Baseball: Team G vs. Team H', odds: 1.95 },
        { event_name: 'Hockey: Team I vs. Team J', odds: 2.25 },
    ];

    for (const event of events) {
        await prisma.events.create({ data: event });
    }
}

main()
    .catch((e: any): never => {
        console.error(e);
        process.exit(1);
    })
    .finally(async (): Promise<void> => {
        await prisma.$disconnect();
    });
