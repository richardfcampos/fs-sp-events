import {ResponseInterface} from "@/interfaces/ResponseInterface";
import {EventInterface} from "@/interfaces/EventInterface";

export interface EventResponseInterface extends ResponseInterface {
    data: EventInterface[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
}
