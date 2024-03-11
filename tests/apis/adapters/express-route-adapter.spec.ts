import { type Request, type Response } from 'express'
import { faker } from '@faker-js/faker'

import { adaptRoute } from '@/apis/adapters'

import { type Controller } from '@/application/contracts/controller'

const mockRequest = (body = {}, params = {}, accountId = ''): Partial<Request> => ({
  body,
  params,
  accountId
})

const mockResponse = (): Partial<Response> => {
  const res: any = {}
  res.status = jest.fn().mockReturnThis()
  res.json = jest.fn().mockReturnThis()
  return res
}

describe('adaptRoute', () => {
  test('Should default req.body to {} if it is falsy', async () => {
    const value = faker.word.noun()
    const accountId = faker.string.uuid()
    const message = faker.lorem.sentence()

    const req = mockRequest(null, { param: value }, accountId)
    const res = mockResponse()
    const mockController = {
      handle: jest.fn().mockResolvedValueOnce({ statusCode: 200, body: { message } })
    }

    const adapt = adaptRoute(mockController)
    await adapt(req as Request, res as Response)

    // Expect the controller's handle method to have been called with an object that includes
    // properties from params and accountId, proving req.body being falsy was defaulted to {}
    expect(mockController.handle).toHaveBeenCalledWith({
      param: value,
      accountId
    })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message })
  })

  test('Should default req.params to {} if it is falsy', async () => {
    const value = faker.word.noun()
    const accountId = faker.string.uuid()
    const message = faker.lorem.sentence()

    const req = mockRequest({ body: value }, null, accountId)
    const res = mockResponse()
    const mockController = {
      handle: jest.fn().mockResolvedValueOnce({ statusCode: 200, body: { message } })
    }

    const adapt = adaptRoute(mockController)
    await adapt(req as Request, res as Response)

    expect(mockController.handle).toHaveBeenCalledWith({
      body: value,
      accountId
    })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message })
  })

  test('Should default req.body and req.params to {} if it is falsy', async () => {
    const accountId = faker.string.uuid()
    const message = faker.lorem.sentence()
    const req = mockRequest(null, null, accountId)
    const res = mockResponse()
    const mockController = {
      handle: jest.fn().mockResolvedValueOnce({ statusCode: 200, body: { message } })
    }

    const adapt = adaptRoute(mockController)
    await adapt(req as Request, res as Response)

    expect(mockController.handle).toHaveBeenCalledWith({ accountId })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message })
  })

  test('should correctly handle a successful response from the controller', async () => {
    const name = faker.internet.userName()
    const id = faker.string.uuid()
    const accountId = faker.string.uuid()
    const message = faker.lorem.sentence()

    const request = mockRequest({ name }, { id }, accountId)
    const response = mockResponse()

    const mockSuccessController: Controller = {
      handle: jest.fn().mockResolvedValueOnce({ statusCode: 200, body: { message } })
    }

    const adaptedRoute = adaptRoute(mockSuccessController)
    await adaptedRoute(request as Request, response as Response)

    expect(mockSuccessController.handle).toHaveBeenCalledWith({
      ...request.body,
      ...request.params,
      accountId: request.accountId
    })
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith({ message })
  })

  test('should correctly handle an error response from the controller', async () => {
    const errorMessage = faker.lorem.sentence()

    const request = mockRequest()
    const response = mockResponse()
    const mockErrorController: Controller = {
      handle: jest.fn().mockResolvedValueOnce({ statusCode: 400, body: { message: errorMessage } })
    }

    const adaptedRoute = adaptRoute(mockErrorController)
    await adaptedRoute(request as Request, response as Response)

    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.json).toHaveBeenCalledWith({ error: errorMessage })
  })
})
