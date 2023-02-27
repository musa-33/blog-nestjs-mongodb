import {BadRequestException} from '@nestjs/common'
import {ValidationError} from 'class-validator'

interface FieldError {
  field: string
  error: string
}

const formatErrors = (
  validationErrors: ValidationError[],
): Record<string, string> => {
  const formattedErrors: Record<string, string> = {}
  for (let i = 0; i < validationErrors.length; i++) {
    const error = validationErrors[i]
    for (const [, value] of Object.entries(error.constraints || [])) {
      formattedErrors[error.property] = value
    }
  }
  return formattedErrors
}

export class ValidationException extends BadRequestException {
  readonly errors: FieldError[]
  constructor(validationErrors: ValidationError[]) {
    super(formatErrors(validationErrors), 'Validation errors')
  }
}
