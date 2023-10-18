import { models } from '../config/dao';

export abstract class CrudRepository<Entity, CreateDTO, UpdateDTO> {
  idKey: string;
  model: any;

  constructor(modelName: string, idKey: string) {
    this.model = models[modelName];
    this.idKey = idKey;
  }

  public async getById(id: number): Promise<Entity | null> {
    return this.model.findUnique({ where: { [this.idKey]: id } });
  }

  public async getManyById(id: number): Promise<Entity[]> {
    return this.model.findMany({ where: { [this.idKey]: id } });
  }

  public async create(data: CreateDTO): Promise<Entity | null> {
    return this.model.create({ data });
  }

  public async createMany(data: CreateDTO[]): Promise<Entity | null> {
    return this.model.createMany({ data });
  }

  public async delete(id: number): Promise<Entity | null> {
    return this.model.delete({ where: { [this.idKey]: id } });
  }

  public async deleteMany(id: number): Promise<Entity | null> {
    return this.model.deleteMany({ where: { [this.idKey]: id } });
  }

  public async update(id: number, data: UpdateDTO): Promise<Entity | null> {
    return this.model.update({ where: { [this.idKey]: id }, data });
  }

  public async list(): Promise<Entity | null> {
    return this.model.findMany({
      where: { inativo: false },
    });
  }

  public async listAll(): Promise<Entity[]> {
    return this.model.findMany();
  }

  public async countAll(): Promise<number> {
    return await this.model.count();
  }
}
