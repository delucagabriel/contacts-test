export interface CoreService<T> {
  create(entity: T): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(entityId: any): Promise<T | null>;
  update(entityId: any, entityNewData: Omit<T, "id">): Promise<T>;
  delete(entityId: any): Promise<void>;
}
