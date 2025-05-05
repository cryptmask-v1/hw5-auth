import { DEFAULT_PAGINATION_VALUES } from '../constants/pagination.js';
import Contacts from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page = DEFAULT_PAGINATION_VALUES.page,
  perPage = DEFAULT_PAGINATION_VALUES.perPage,
  sortBy = DEFAULT_PAGINATION_VALUES.sortBy,
  sortOrder = DEFAULT_PAGINATION_VALUES.sortOrder,
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const contactQuery = Contacts.find();

  if (filter.contactType) {
    contactQuery.where('contactType').in(filter.contactType);
  }
  if (filter.isFavourite) {
    contactQuery.where('isFavourite').eq(filter.isFavourite);
  }

  const totalContacts = await Contacts.find()
    .merge(contactQuery)
    .countDocuments();

  const contacts = await contactQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(totalContacts, page, perPage);

  return {
    data: contacts,
    paginationData,
  };
};

export const getContactsById = async (id) => {
  const contact = await Contacts.findById(id);
  return contact;
};

export const createContact = (contact) => {
  const newContact = Contacts.create(contact);
  return newContact;
};

export const deleteContactById = async (contactId) => {
  const contact = await Contacts.findByIdAndDelete(contactId);
  return contact;
};

export const updateContact = async (contactId, newFields, options = {}) => {
  const result = await Contacts.findByIdAndUpdate(
    {
      _id: contactId,
    },
    newFields,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (result.value) {
    return {
      contact: result.value,
      isNew: Boolean(result.lastErrorObject.upserted),
    };
  }

  return null;
};
