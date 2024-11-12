import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Farmer, GeographicEntity, GeographicEntityRelations} from '../models';
import {FarmerRepository} from './farmer.repository';

export class GeographicEntityRepository extends DefaultCrudRepository<
  GeographicEntity,
  typeof GeographicEntity.prototype.id,
  GeographicEntityRelations
> {
  public readonly farmers: HasManyRepositoryFactory<
    Farmer,
    typeof GeographicEntity.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('FarmerRepository')
    protected farmerRepositoryGetter: Getter<FarmerRepository>,
  ) {
    super(GeographicEntity, dataSource);
    this.farmers = this.createHasManyRepositoryFactoryFor(
      'farmers',
      farmerRepositoryGetter,
    );
    this.registerInclusionResolver('farmers', this.farmers.inclusionResolver);
  }

  async findChildren(parentId: string): Promise<GeographicEntity[]> {
    return this.find({where: {parentId}});
  }

  async findParent(entityId: string): Promise<GeographicEntity | null> {
    const entity = await this.findById(entityId);
    return entity.parentId ? await this.findById(entity.parentId) : null;
  }

  async fetchHierarchy(id: string): Promise<GeographicEntity | null> {
    const entity = await this.findById(id);

    if (!entity) return null;
    const populateChildren = async (node: GeographicEntity) => {
      if (!node.id) return;
      const children = await this.findChildren(node.id);
      node.children = children;

      for (const child of children) {
        await populateChildren(child);
      }
    };

    await populateChildren(entity);

    // const populateParents = async (
    //   node: GeographicEntity,
    // ): Promise<GeographicEntity[]> => {
    //   const parents: GeographicEntity[] = [];
    //   let currentEntity = node;

    //   while (currentEntity.parentId) {
    //     const parent = await this.findParent(currentEntity.id!);
    //     if (parent) {
    //       parents.unshift(parent);
    //       currentEntity = parent;
    //     } else {
    //       break;
    //     }
    //   }
    //   return parents;
    // };
    // const parents = await populateParents(entity);

    // entity.parents = parents;
    return entity;
  }
}
