import { Router } from "express";
import { ContactController } from "../controllers/contact.controller";
import { ContactRepository } from "../repositories/contact.repository";
import { ContactService } from "../services/contact.service";

const contactRepository = new ContactRepository();
const contactService = new ContactService(contactRepository);
const contactController = new ContactController(contactService);
const ContactRoutes = Router();
ContactRoutes.get(
  "/contacts",
  contactController.findAll.bind(contactController)
);
ContactRoutes.get(
  "/contacts/:id",
  contactController.findOne.bind(contactController)
);
ContactRoutes.post(
  "/contacts",
  contactController.create.bind(contactController)
);
ContactRoutes.patch(
  "/contacts/:id",
  contactController.update.bind(contactController)
);
ContactRoutes.delete(
  "/contacts/:id",
  contactController.delete.bind(contactController)
);
ContactRoutes.get(
  "/contacts/:id/disable",
  contactController.disable.bind(contactController)
);
export { ContactRoutes };
