"use client";

import { useState, useEffect, MouseEvent } from "react";
import { usePagination } from "@/hooks/usePagination"
import { useModal } from "@/hooks/useModal"
import { useApi } from "@/hooks/useApi"
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/modal/modal";
import { EventInterface } from "@/interfaces/EventInterface";
import {EventResponseInterface as EventResponse} from "@/interfaces/page/EventResponseInterface";
import EventList from "@/components/eventList/eventList";
import LoginModal from "@/components/loginModal/loginModal";
import {useAuth} from "@/context/authContext";



export default function Home() {
    const [betAmount, setBetAmount] = useState('');
    const modalBet = useModal<EventInterface>()
    const modalLogin = useModal()
    const pagination = usePagination(5)
    const { get } = useApi()
    const { isAuthenticated, userData } = useAuth();


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
        refetchInterval: 5 * 60 * 1000,
        staleTime: 60 * 10000,
    })

    const fetchEvents = async (): Promise<EventInterface[]> => {
        const { data, totalPages } = await get<EventResponse>(`${process.env.NEXT_PUBLIC_API_HOST}api/events?page=${pagination.page}&limit=${pagination.perPage}`)

        pagination.setTotalPages(totalPages)

        return data
    };

    const handleSubmit = (event: MouseEvent, name: null | string) => {
        event.preventDefault(); // Prevents the default form submission behavior
        alert(`The name you entered was: ${name}`);
        modalBet.handleClose()
    };

    if (query.error) {
        throw new Error();
    }

    useEffect(() => {
        if (!modalBet.isOpen) {
            setBetAmount('')
        }
    }, [modalBet.isOpen, userData])

    return (
        <div className="min-h-screen bg-gray-100 py-8">

            <div className="container mx-auto px-4">
                {
                    isAuthenticated && <div className="text-black">
                    User: {userData?.user.name}
                </div>
                }

                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    Bets Sports Events
                </h1>

                {query.data && query.data.length > 0 && (
                    <EventList
                        events={query.data ?? []}
                        submit={(event) => {
                            if (isAuthenticated) {
                                modalBet.handleOpen(event)
                            } else {
                                modalLogin.handleOpen()
                            }
                        }}
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        handlePageChange={pagination.setPage}
                        eventsPerPage={pagination.perPage}
                        handleLimitChange={pagination.setPerPage}
                        rowsPerPageOption={pagination.rowsPerPageOptions}
                    />
                )}

                <Modal isOpen={modalBet.isOpen} onClose={modalBet.handleClose}>
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
                <LoginModal isOpen={modalLogin.isOpen} onClose={modalLogin.handleClose}/>
            </div>
        </div>
    );
}
