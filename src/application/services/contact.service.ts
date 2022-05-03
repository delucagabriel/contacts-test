import { CoreRepository } from "../../core/core.repository";
import { CoreService } from "../../core/core.service";
import { Contact } from "../entities/contact.entity";
import { calculateAge } from "../utils/calculate-age.util";
import {
  AgeError,
  InvalidBirthDateError,
  NotFoundError,
} from "../utils/errors/ApplicationErrors";
import { IsAdult } from "../utils/is-adult.util";

export class ContactService implements CoreService<Contact> {
  constructor(private readonly contactRepository: CoreRepository<Contact>) {}

  public async create(contact: Contact): Promise<Contact> {
    const age = calculateAge(new Date(contact.birthdate));
    if (age < 0) throw new InvalidBirthDateError();
    if (!IsAdult(age)) throw new AgeError();
    try {
      const result = await this.contactRepository.create(contact);
      return { ...result, age: age };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async findAll(): Promise<Contact[]> {
    try {
      const contacts = await this.contactRepository.find();
      return contacts.map((contact: Contact) => ({
        ...contact,
        age: calculateAge(new Date(contact.birthdate)),
      }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async findOne(contactId: number): Promise<Contact> {
    try {
      const contact = await this.contactRepository.findOne(contactId);
      if (!contact) throw new NotFoundError();
      const age = calculateAge(new Date(contact.birthdate));
      return { ...contact, age };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(
    contactId: number,
    contactNewData: Omit<Contact, "id">
  ): Promise<Contact> {
    const age = calculateAge(new Date(contactNewData.birthdate));
    if (!IsAdult(age)) throw new AgeError();
    try {
      const contact = await this.findOne(contactId);
      if (!contact) throw new NotFoundError();
      return await this.contactRepository.update(contactId, contactNewData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async disable(contactId: number): Promise<Contact> {
    try {
      const contact = await this.findOne(contactId);
      if (!contact) throw new NotFoundError();
      return await this.contactRepository.update(contactId, { active: false });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(contactId: number): Promise<void> {
    try {
      const contact = await this.findOne(contactId);
      if (!contact) throw new NotFoundError();
      await this.contactRepository.delete(contactId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
