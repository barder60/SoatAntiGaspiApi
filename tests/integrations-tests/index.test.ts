import request from "supertest"
import { app } from "../../src/app"
import { describe, test } from '@jest/globals'

describe('calculate function', () => {
  test('should return 1', () => {
    return request(app)
      .get("/offers")
      .expect("Content-Type", /json/)
      .expect(201)
  })
})
