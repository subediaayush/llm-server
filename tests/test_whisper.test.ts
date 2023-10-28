import { describe } from 'node:test';
import execute from '../src/integrations/whisper/execute';

describe('Whisper', () => {
  it('trascription', () => {
    const obtained = execute(__dirname + '\\assets\\jfk.wav')?.replace(/\s/g, '')
    const expected = `And so, my fellow Americans ask not what your country can do for you ask what you can do for your country.`.replace(/\s/g, '')
    expect(obtained).toBe(expected)
  });
});