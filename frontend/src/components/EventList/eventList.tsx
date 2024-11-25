import React from 'react';
import {EventInterface} from "@/interfaces/EventInterface";

interface EventListProps {
    events: EventInterface[];
    submit: (event: EventInterface) => void;
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
    eventsPerPage: number;
    handleLimitChange: (limit: number) => void;
    rowsPerPageOption: number[];
}
export default function EventList({events, submit, currentPage, totalPages, handlePageChange,eventsPerPage,handleLimitChange, rowsPerPageOption }: EventListProps) {
    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <select
                    className="ml-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    value={eventsPerPage}
                    onChange={(event) => handleLimitChange(+event.target.value)}
                >
                    {rowsPerPageOption.map((limit) => (
                        <option key={limit} value={limit}>
                            {limit} per page
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((singleEvent: EventInterface) => (
                    <div
                        key={singleEvent.event_id}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            {singleEvent.event_name}
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Odds: <span className="font-medium">{singleEvent.odds}</span>
                        </p>
                        <button
                            onClick={() => submit(singleEvent)} // Pass 'singleEvent' to 'submit'
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                        >
                            Place Bet
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-center items-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 mx-1 rounded-lg ${
                        currentPage === 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    Previous
                </button>
                {Array.from({length: totalPages}, (_, index) => index + 1).map(
                    (page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 mx-1 rounded-lg ${
                                currentPage === page
                                    ? "bg-blue-700 text-white"
                                    : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                        >
                            {page}
                        </button>
                    )
                )}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 mx-1 rounded-lg ${
                        currentPage === totalPages
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>

    );
}
