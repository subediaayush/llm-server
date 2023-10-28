import { describe } from 'node:test';
import execute from '../src/integrations/open_clip/execute';

describe('Open Clip', () => {
  test('image captioning', () => {
    expect(execute('hello1')).toBe('hello1')
  });
});