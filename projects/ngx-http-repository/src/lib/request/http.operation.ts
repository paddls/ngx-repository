export type HttpOperation = 'read' | 'write' | 'findAll' | 'findOne' | 'findById' | 'create' | 'update' | 'patch' | 'delete';
export const HTTP_OPERATIONS: string[] = ['read', 'write', 'findAll', 'findOne', 'findById', 'create', 'update', 'patch', 'delete'];

export function isHttpOperation(value: string): boolean {
  return HTTP_OPERATIONS.indexOf(value) !== -1;
}
