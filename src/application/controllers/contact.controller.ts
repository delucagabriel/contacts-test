import { Request, Response } from "express";
import { ContactService } from "../services/contact.service";

export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  async create(req: Request, res: Response) {
    try {
      res.status(201).json(await this.contactService.create(req.body));
    } catch (error: any) {
      res.status(error.status || 500).json(error.message);
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      res.status(200).json(await this.contactService.findAll());
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      res
        .status(200)
        .json(await this.contactService.findOne(Number(req.params.id)));
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      res
        .status(200)
        .json(
          await this.contactService.update(Number(req.params.id), req.body)
        );
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      res
        .status(204)
        .json(await this.contactService.delete(Number(req.params.id)));
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async disable(req: Request, res: Response) {
    try {
      res
        .status(200)
        .json(await this.contactService.disable(Number(req.params.id)));
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}
