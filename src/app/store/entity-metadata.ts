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
  PaymentMethod: {
    entityDispatcherOptions: { optimisticDelete: false },
  },
  Product: {
    entityDispatcherOptions: { optimisticDelete: false },
  },
  Customer: {
    entityDispatcherOptions: { optimisticDelete: false },
  },
  EntryProduct: {
    entityDispatcherOptions: { optimisticDelete: false },
  },
  Room: {
    entityDispatcherOptions: { optimisticDelete: false },
  },
};

const pluralNames = {
  Reason: 'reason',
  Category: 'category',
  Brand: 'brand',
  Invoice: 'invoice',
  RoomPrice: 'roomprice',
  PaymentMethod: 'paymentmethod',
  Product: 'product',
  Customer: 'customer',
  EntryProduct: 'entryproduct',
  Room: 'room',
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
