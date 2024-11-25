"use client";

import { useState, useEffect, MouseEvent } from "react";
import { usePagination } from "@/hooks/usePagination"
import { useModal } from "@/hooks/useModal"
import { useApi } from "@/hooks/useApi"
import { useQuery } from "@tanstack/react-query";
import { ResponseInterface } from "@/interfaces/ResponseInterface";
import Modal from "@/components/modal/modal";
import { EventInterface } from "@/interfaces/EventInterface";
import EventList from "@/components/EventList/eventList";

interface EventResponse extends ResponseInterface {
    data: EventInterface[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
}

export default function Home() {
    const [betAmount, setBetAmount] = useState('');
    const modalBet = useModal<EventInterface>()
    const pagination = usePagination(5)
    const { get } = useApi()

    const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setBetAmount(value);
        }
    };

    const query = useQuery<EventInterface[]>({
        queryKey: ['events', `page:${pagination.page}`, `perPage:${pagination.perPage}`],
        queryFn: () => fetchEvents(),
        retry: 1,
        refetchInterval: 500,
        staleTime: 60 * 1000,
    })

    const fetchEvents = async (): Promise<EventInterface[]> => {
        const { data, totalPages } = await get<EventResponse>(`http://localhost:3001/events?page=${pagination.page}&limit=${pagination.perPage}`)

        pagination.setTotalPages(totalPages)

        return data
    };

    const handleSubmit = (event: MouseEvent, name: null | string) => {
        event.preventDefault(); // Prevents the default form submission behavior
        alert(`The name you entered was: ${name}`);
        modalBet.handleClose()
        // You can add additional logic here, such as sending the data to a server
    };

    if (query.error) {
        throw new Error();
    }

    useEffect(() => {
        if (!modalBet.open) {
            setBetAmount('')
        }
    }, [modalBet.open])

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">w
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    Bets Sports Events
                </h1>

                {query.data && query.data.length > 0 && (
                    <EventList
                        events={query.data ?? []}
                        submit={modalBet.handleOpen}
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        handlePageChange={pagination.setPage}
                        eventsPerPage={pagination.perPage}
                        handleLimitChange={pagination.setPerPage}
                        rowsPerPageOption={pagination.rowsPerPageOptions}
                    />
                )}

                <Modal isOpen={modalBet.open} onClose={modalBet.handleClose}>
                    <h2 className="text-2xl font-semibold mb-4 text-black">
                        Place Your Bet on {modalBet.data?.event_name}
                    </h2>
                    <input
                        type="number"
                        value={betAmount}
                        onChange={handleBetAmountChange}
                        placeholder="Enter bet amount"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-black"
                    />
                    <button
                        onClick={(event: MouseEvent) => handleSubmit(event, modalBet.data?.event_name ?? null)}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        Submit Bet
                    </button>
                </Modal>
            </div>
        </div>
    );
}
