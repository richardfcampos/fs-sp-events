"use client";

import { useEffect, useState, MouseEvent } from "react";
import { ResponseInterface } from "@/interfaces/ResponseInterface";
import Modal from "@/components/modal/modal";
import {EventInterface} from "@/interfaces/EventInterface";
import EventList from "@/components/EventList/eventList";


interface EventResponse extends ResponseInterface {
    data: EventInterface[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
}

export default function Home() {
    const [events, setEvents] = useState<EventInterface[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage, setEventsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventInterface | null>(null);
    const [betAmount, setBetAmount] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchEvents(currentPage, eventsPerPage).then(response => response);
    }, [currentPage, eventsPerPage]);

    const fetchEvents = async (page: number, limit: number): Promise<void> => {
        try {
            const response = await fetch(
                `http://localhost:3001/events?page=${page}&limit=${limit}`
            );

            const data: EventResponse = await response.json();
            setEvents(data.data);
            setTotalPages(data.totalPages);
        } catch (error) {
            setError(true);
            throw new Error('Network response was not ok');
        }

    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleLimitChange = (limit:number) => {
        setEventsPerPage(Number(limit));
        setCurrentPage(1); // Reset to first page on limit change
    };

    const openBetModal = (event: EventInterface): void => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeBetModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
        setBetAmount('');
    };

    const handleSubmit = (event:MouseEvent, name:null|string) => {
        event.preventDefault(); // Prevents the default form submission behavior
        alert(`The name you entered was: ${name}`);
        setIsModalOpen(false)
        // You can add additional logic here, such as sending the data to a server
    };

    if(error) {
        throw new Error();
    }


    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    Bets Sports Events
                </h1>

                {events && events.length > 0 && (
                    <EventList
                        events={events}
                        submit={openBetModal}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                        eventsPerPage={eventsPerPage}
                        handleLimitChange={handleLimitChange}
                    />
                )}

                {isModalOpen && (
                    <Modal isOpen={isModalOpen} onClose={closeBetModal}>

                        <h2 className="text-2xl font-semibold mb-4 text-black">
                        Place Your Bet on {selectedEvent?.event_name}
                        </h2>
                        <input
                            type="number"
                            value={betAmount}
                            onChange={(e) => setBetAmount(e.target.value)}
                            placeholder="Enter bet amount"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <button
                            onClick={(event: MouseEvent) => handleSubmit(event, selectedEvent?.event_name ?? null)}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                        >
                            Submit Bet
                        </button>
                    </Modal>
                )}
            </div>
        </div>
    );
}
