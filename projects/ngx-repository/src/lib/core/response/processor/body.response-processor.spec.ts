import { BodyResponseProcessor } from './body.response-processor';

describe('BodyResponseProcessor', () => {
  const processor: BodyResponseProcessor = new BodyResponseProcessor();

  it('should return origin body', () => {
    expect(processor.transform(null, {getBody: () => 'body'} as any)).toEqual('body');
  });
});
