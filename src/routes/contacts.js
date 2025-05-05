import { Router } from 'express';

import {
  createContactsController,
  deleteContactController,
  getContactsByIdController,
  getContactsController,
  updatePutContactController,
  updatePatchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/crtlWrapper.js';
import { validateBody } from '../middlewares/validatorBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validators/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authorize } from '../middlewares/authorize.js';

const contactsRouter = Router();
contactsRouter.use(authorize);

// Get all contacts
contactsRouter.get('/', ctrlWrapper(getContactsController));

// Get contact by ID

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactsByIdController),
);
// Create a new contact
contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactsController),
);

// Delete a contact by ID
contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

// Update a contact by ID
contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updatePatchContactController),
);
contactsRouter.put(
  '/:contactId',
  isValidId,
  ctrlWrapper(updatePutContactController),
);

//404 error handler
contactsRouter.use((req, res) => {
  res.status(404).send({
    message: '404 Not Found',
    status: 404,
  });
});

export default contactsRouter;
