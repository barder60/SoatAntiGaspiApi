import { describe, expect, test } from '@jest/globals';
import { calculate } from '../../src/index';

describe('calculate module', () => {
  test('should return 1', () => {
    expect(calculate()).toBe(1);
  });
});