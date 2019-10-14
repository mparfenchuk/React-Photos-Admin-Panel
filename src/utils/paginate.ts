import { Item, Pagination } from '../ducks/types';

export const paginate = (
    items: Array<Item>, 
    page: number = 1, 
    itemsPerPage: number = 6
): Pagination => {
    const offset = (page - 1) * itemsPerPage;
    const paginatedItems = items.slice(offset).slice(0, itemsPerPage);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    return {
        page,
        totalPages,
        items: paginatedItems
    };
};