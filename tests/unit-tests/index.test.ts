import { describe, expect, test } from '@jest/globals';
import { calculate } from '../../src/app.old';

describe('calculate function', () => {
  test('should return 1', () => {
    expect(calculate()).toBe(1);
  });
});