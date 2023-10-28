import { describe } from 'node:test';
import execute from '../src/integrations/open_clip/execute';

describe('Open Clip', () => {
  test('image captioning', () => {
    const obtained = execute(__dirname + '\\assets\\CLIP.png')
    const expected = `there are many different animals in this collage `
    console.log(obtained, '\n', expected)
    expect(obtained).toBe(expected)
  });
});