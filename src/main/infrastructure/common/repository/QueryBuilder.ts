import { isEmpty } from 'lodash';
import { EntityManager, SelectQueryBuilder, ObjectType } from 'typeorm';
import { Identifiable } from '../types';
import { FindOption } from '@domain/common';

export abstract class QueryBuilder<OrmModel extends Identifiable, FO extends FindOption<OrmModel['id']>> {
    protected manager: EntityManager;
    protected qb: SelectQueryBuilder<OrmModel>;
    protected isReturnEmpty = true;
    protected alias: string;
    protected ids?: OrmModel['id'][];

    constructor(manager: EntityManager, { ids }: FO, modelClass: ObjectType<OrmModel>, alias: string) {
        this.manager = manager;
        this.alias = alias;
        this.qb = this.createBuilder(modelClass, this.alias);
        this.ids = ids;
    }

    public execute(): Promise<OrmModel[]> {
        return this
            .addRelations()
            .changeSelection()
            .filterBy('id', this.ids)
            .addFilters()
            .getResult();
    }

    protected addRelations(): QueryBuilder<OrmModel, FO>  {
        return this;
    }

    protected changeSelection(): QueryBuilder<OrmModel, FO>  {
        return this;
    }

    protected addFilters(): QueryBuilder<OrmModel, FO>  {
        return this;
    }

    protected filterBy<P extends keyof OrmModel>(
        column: P,
        values: OrmModel[P][] | undefined,
        table = this.alias
    ): QueryBuilder<OrmModel, FO> {
        this.checkListOnSetAndEmpty(values);

        if (!isEmpty(values)) {
            this.qb.andWhere(`${table}.${column} IN (:...${column})`, { [column]: values });
        }

        return this;
    }

    protected filterByRelation<OtherModel extends Identifiable, P extends keyof OtherModel>(
        column: P,
        values: OtherModel[P][] | undefined,
        alias: string
    ): QueryBuilder<OrmModel, FO> {
        this.checkListOnSetAndEmpty(values);

        if (!isEmpty(values)) {
            this.qb.andWhere(`${alias} IN (:...${column})`, { [column]: values });
        }

        return this;
    }

    protected checkListOnSetAndEmpty(list?: any[]) {
        if (
            list
            && isEmpty(list)
        ) {
            this.isReturnEmpty = true;
        }
    }

    private createBuilder(modelClass: ObjectType<OrmModel>, alias: string): SelectQueryBuilder<OrmModel> {
        return this.manager.createQueryBuilder(modelClass, alias);
    }

    private async getResult(): Promise<OrmModel[]> {
        return this.qb.getMany();
    }
}
