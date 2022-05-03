import { CoreRepository } from "../src/core/core.repository";
import { Contact } from "../src/application/entities/contact.entity";
import { ContactService } from "../src/application/services/contact.service";
import {
  AgeError,
  InvalidBirthDateError,
  NotFoundError,
} from "../src/application/utils/errors/ApplicationErrors";

describe("ContacService", () => {
  let service: ContactService;
  const expectedContact = {
    id: 1,
    name: "Gabriel de Luca",
    birthdate: "1989/06/28",
    gender: "Masculino",
    age: 33,
  };
  const repository: CoreRepository<Contact> = {
    create: jest.fn((data) => data),
    update: jest.fn(),
    find: jest.fn().mockResolvedValue([expectedContact]),
    findOne: jest.fn().mockResolvedValue(expectedContact),
    delete: jest.fn(),
  };
  beforeEach(() => {
    service = new ContactService(repository);
  });
  describe("create", () => {
    it("should create a contact", async () => {
      const contactToCreate = {
        name: "Gabriel de Luca",
        birthdate: "1989/06/28",
        gender: "Masculino",
      };
      const expectedContact = {
        name: "Gabriel de Luca",
        birthdate: "1989/06/28",
        gender: "Masculino",
        age: 33,
      };
      const contact = await service.create(contactToCreate);
      expect(contact).toEqual(expectedContact);
    });

    it("should to throw if is contact is not a adult", async () => {
      const contactToCreate = {
        name: "Gabriel de Luca",
        birthdate: "2020/06/28",
        gender: "Masculino",
      };

      await expect(service.create(contactToCreate)).rejects.toThrow(
        new AgeError()
      );
    });

    it("should to throw if is birth date is invalid", async () => {
      const contactToCreate = {
        name: "Gabriel de Luca",
        birthdate: "2023/06/28",
        gender: "Masculino",
      };

      await expect(service.create(contactToCreate)).rejects.toThrow(
        new InvalidBirthDateError()
      );
    });
  });

  describe("findAll", () => {
    it("should return a list of contact", async () => {
      const contacts = await service.findAll();
      expect(contacts).toEqual([expectedContact]);
    });
  });

  describe("findOne", () => {
    it("should return a contact", async () => {
      const contact = await service.findOne(1);
      expect(contact).toEqual(expectedContact);
    });

    it("should to throw if contact is not found", async () => {
      jest.spyOn(repository, "findOne").mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(new NotFoundError());
    });
  });
});
