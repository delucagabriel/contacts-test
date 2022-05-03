import { CoreRepository } from "../../core/core.repository";
import { PrismaClient } from "@prisma/client";
import { Contact } from "../entities/contact.entity";

export class ContactRepository implements CoreRepository<Contact> {
  private readonly database = new PrismaClient();

  public async create(contact: Contact) {
    try {
      return await this.database.contact.create({
        data: {
          name: contact.name,
          gender: contact.gender,
          birthdate: contact.birthdate,
          active: contact.active,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(
    contactId: number,
    contactNewData: Partial<Omit<Contact, "id">>
  ) {
    try {
      return await this.database.contact.update({
        data: {
          name: contactNewData?.name,
          gender: contactNewData?.gender,
          birthdate: contactNewData?.birthdate,
          active: contactNewData?.active,
        },
        where: {
          id: contactId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async find() {
    try {
      return await this.database.contact.findMany({
        where: {
          active: true,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async findOne(contactId: number) {
    try {
      return await this.database.contact.findUnique({
        where: { id: contactId },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(contactId: number) {
    try {
      return await this.database.contact.delete({
        where: { id: contactId },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
