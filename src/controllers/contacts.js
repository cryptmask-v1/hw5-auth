import createHttpError from 'http-errors';
import {
  createContact,
  deleteContactById,
  getContacts,
  getContactsById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const query = req.query;

  const { page, perPage } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query);
  const filter = parseFilterParams(query);

  const contacts = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).send({
    message: 'Contacts fetched successfully',
    status: 200,
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactsById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).send({
    message: 'Contact fetched successfully',
    status: 200,
    data: contact,
  });
};

export const createContactsController = async (req, res) => {
  const newContact = req.body;

  const createdContact = await createContact(newContact);

  res.status(201).send({
    message: 'Contact created successfully',
    status: 201,
    data: createdContact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await deleteContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).send({
    message: 'Contact deleted successfully',
    status: 200,
    data: contact,
  });
};

export const updatePutContactController = async (req, res) => {
  const { contactId } = req.params;
  const newFields = req.body;

  const updatedContact = await updateContact(contactId, newFields, {
    upsert: true,
  });

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  const status = updatedContact.isNew ? 201 : 200;
  const message = updatedContact.isNew
    ? 'Contact created successfully'
    : 'Contact updated successfully';

  res.status(200).send({
    message: message,
    status: status,
    data: updatedContact.contact,
  });
};

export const updatePatchContactController = async (req, res) => {
  const { contactId } = req.params;
  const newFields = req.body;

  const updatedContact = await updateContact(contactId, newFields, {
    upsert: false,
  });

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).send({
    message: 'Contact updated successfully',
    status: 200,
    data: updatedContact.contact,
  });
};
