describe('ResponseBuilder', () => {

  [
    'create',
    'update',
    'patch',
    'delete',
    'findAll',
    'findOne',
    'findById'
  ].forEach((operation: string) => {
    describe(operation, () => {
      it(`should override default response builder`);
    });
  });

  [
    'create',
    'update',
    'patch',
    'delete',
    'findAll',
    'findOne',
    'findById'
  ].forEach((operation: string) => {
    describe(operation, () => {
      it(`should override default response type`);
    });
  });
});
