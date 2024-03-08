import { type Request, type Response } from 'express'

import { adaptRoute } from '@/apis/adapters'

import { type Controller } from '@/application/contracts/controller'

// Função de utilidade para criar um mock do objeto Request do Express
function createMockRequest (): Partial<Request> {
  return {
    body: {},
    params: {},
    accountId: 'any_accountId'
  }
}

// Função de utilidade para criar um mock do objeto Response do Express
function createMockResponse (): Partial<Response> {
  const res: Partial<Response> = {}
  res.status = jest.fn().mockReturnThis()
  res.json = jest.fn().mockReturnThis()
  return res
}

describe('adaptRoute', () => {
  const controllerMock: jest.Mocked<Controller> = {
    handle: jest.fn().mockResolvedValueOnce({ statusCode: 200, body: { message: 'any_message' } })
  }
  const controllerMockError: jest.Mocked<Controller> = {
    handle: jest.fn().mockResolvedValueOnce({ statusCode: 400, body: { message: 'any_error' } })
  }

  test('Should return a success status and message', async () => {
    const request = createMockRequest()
    const response = createMockResponse()

    const expected = { message: 'any_message' }
    controllerMock.handle.mockResolvedValueOnce({ statusCode: 200, body: expected })

    const adapt = adaptRoute(controllerMock)
    await adapt(request as Request, response as Response)

    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith({ message: 'any_message' })
  })

  test('Should return an error status and message for error responses', async () => {
    const request = createMockRequest()
    const response = createMockResponse()

    const expectedError = { message: 'any_error' }
    controllerMockError.handle.mockResolvedValueOnce({ statusCode: 400, body: expectedError })

    const adapt = adaptRoute(controllerMockError)
    await adapt(request as Request, response as Response)

    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.json).toHaveBeenCalledWith({ error: expectedError.message })
  })
})
