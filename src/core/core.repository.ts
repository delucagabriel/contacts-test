export interface CoreRepository<EntityType> {
  create(data: EntityType): any;
  update(id: any, newData: Partial<EntityType>): any;
  find(): any;
  findOne(id: any): any;
  delete(id: any): void;
}
