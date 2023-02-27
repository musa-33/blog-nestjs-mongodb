import {ValidationPipe, HttpException, ValidationError} from '@nestjs/common'
import {ValidationException} from './validation.exception'

export const setupValidationPipe = (): ValidationPipe => {
  return new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[]): HttpException => {
      return new ValidationException(validationErrors)
    },
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    forbidUnknownValues: true,
    skipMissingProperties: false,
  })
}
