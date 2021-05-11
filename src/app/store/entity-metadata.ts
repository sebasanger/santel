import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Reason: {
    entityName: 'Reason',
    entityDispatcherOptions: { optimisticDelete: false },
  },
  Category: {
    entityDispatcherOptions: { optimisticDelete: false },
  },
  Brand: {
    entityDispatcherOptions: { optimisticDelete: false },
  },
  Invoice: {
    entityDispatcherOptions: { optimisticDelete: false },
  },
  RoomPrice: {
    entityDispatcherOptions: { optimisticDelete: false },
  },
};

const pluralNames = {
  Reason: 'reason',
  Category: 'category',
  Brand: 'brand',
  Invoice: 'invoice',
  RoomPrice: 'roomprice',
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
