import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Reason: {},
  Category: {},
  Brand: {},
};

const pluralNames = {
  Reason: 'reason',
  Category: 'category',
  Brand: 'brand',
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
