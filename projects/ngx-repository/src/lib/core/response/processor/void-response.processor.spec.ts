import { VoidResponseProcessor } from './void-response.processor';

describe('VoidResponseProcessor', () => {
  const processor: VoidResponseProcessor = new VoidResponseProcessor();

  it('should return void 0', () => {
    expect(processor.transform()).toEqual(void 0);
  });
});
