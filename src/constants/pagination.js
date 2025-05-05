export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const CONTACT_SORTABLE_FIELDS = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updatedAt',
];

export const DEFAULT_PAGINATION_VALUES = {
  page: 1,
  perPage: 10,
  sortOrder: SORT_ORDER.ASC,
  sortBy: '_id',
};
