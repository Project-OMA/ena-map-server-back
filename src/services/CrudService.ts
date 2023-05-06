import { CrudRepository } from '../repository/CrudRepository';

export abstract class CrudService<Entity, CreateDTO, UpdateDTO> {
  model: CrudRepository<Entity, CreateDTO, UpdateDTO>;

  constructor(repository: CrudRepository<Entity, CreateDTO, UpdateDTO>) {
    this.model = repository;
  }

  public async getById(id: number): Promise<Entity | null> {
    return this.model.getById(id);
  }

  public async getManyById(id: number): Promise<Entity[]> {
    return this.model.getManyById(id);
  }

  public async create(data: CreateDTO): Promise<Entity | null> {
    return this.model.create(data);
  }

  public async delete(id: number): Promise<Entity | null> {
    return this.model.delete(id);
  }

  public async update(id: number, data: UpdateDTO): Promise<Entity | null> {
    return this.model.update(id, data);
  }

  public async list(): Promise<Entity | null> {
    return this.model.list();
  }

  public async listAll(): Promise<Entity | null> {
    return this.model.listAll();
  }
}
