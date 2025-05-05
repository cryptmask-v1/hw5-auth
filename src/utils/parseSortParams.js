import {
  CONTACT_SORTABLE_FIELDS,
  DEFAULT_PAGINATION_VALUES,
  SORT_ORDER,
} from '../constants/pagination.js';

const parseSortOrder = (sortOrder) => {
  const knownSortOrders = [SORT_ORDER.ASC, SORT_ORDER.DESC];

  if (knownSortOrders.includes(sortOrder)) {
    return sortOrder;
  }
  return DEFAULT_PAGINATION_VALUES.sortOrder;
};

const parseSortBy = (sortBy) => {
  if (CONTACT_SORTABLE_FIELDS.includes(sortBy)) {
    return sortBy;
  }
  return DEFAULT_PAGINATION_VALUES.sortBy;
};

export const parseSortParams = (query) => {
  const sortOrder = parseSortOrder(query.sortOrder);
  const sortBy = parseSortBy(query.sortBy);

  return {
    sortOrder,
    sortBy,
  };
};
