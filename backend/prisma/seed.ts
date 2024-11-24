import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Event {
    event_name: string;
    odds: number;
}
async function main(): Promise<void> {
    const events: Event[]    = [
        { event_name: "Basketball: Houston Rockets vs. San Antonio Spurs", odds: 1.75 },
        { event_name: "Basketball: Los Angeles Lakers vs. Boston Celtics", odds: 2.10 },
        { event_name: "Soccer: Flamengo vs. Vasco", odds: 1.50 },
        { event_name: "Soccer Real Madrid vs. Barcelona", odds: 1.95 },
        { event_name: "Football: Chicago Bears vs. Green Bay Packers", odds: 2.25 },
        { event_name: "Basketball: Miami Heat vs. New York Knicks", odds: 1.85 },
        { event_name: "Basketball: Golden State Warriors vs. Toronto Raptors", odds: 1.90 },
        { event_name: "Soccer: Manchester United vs. Liverpool", odds: 2.00 },
        { event_name: "Soccer: Paris Saint-Germain vs. Olympique Lyonnais", odds: 1.70 },
        { event_name: "Football: New England Patriots vs. Dallas Cowboys", odds: 2.10 },
        { event_name: "Football: Seattle Seahawks vs. San Francisco 49ers", odds: 1.95 },
        { event_name: "Tennis: Novak Djokovic vs. Andy Murray", odds: 1.80 },
        { event_name: "Tennis: Simona Halep vs. Petra Kvitová", odds: 1.75 },
        { event_name: "Baseball: New York Yankees vs. Boston Red Sox", odds: 1.65 },
        { event_name: "Baseball: Los Angeles Dodgers vs. Chicago Cubs", odds: 1.80 },
        { event_name: "Hockey: Toronto Maple Leafs vs. Montreal Canadiens", odds: 1.85 },
        { event_name: "Hockey: Vancouver Canucks vs. Calgary Flames", odds: 1.90 },
        { event_name: "Cricket: India vs. Australia (ODI)", odds: 1.70 },
        { event_name: "Cricket: England vs. South Africa (Test Match)", odds: 1.75 },
        { event_name: "Rugby: New Zealand All Blacks vs. South Africa Springboks", odds: 1.65 },
        { event_name: "Rugby: England vs. Wales", odds: 1.80 },
        { event_name: "Golf: Tiger Woods vs. Phil Mickelson (Match Play)", odds: 1.95 },
        { event_name: "Golf: Rory McIlroy vs. Jordan Spieth (Match Play)", odds: 1.85 },
        { event_name: "Boxing: Canelo Alvarez vs. Gennady Golovkin", odds: 1.90 },
        { event_name: "MMA: Conor McGregor vs. Khabib Nurmagomedov", odds: 2.00 }
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
