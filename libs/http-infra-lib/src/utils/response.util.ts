import {ErrorResponse} from '../response/error-response.interface'
import {PagerOptions} from '../response/pager-options.interface'
import {SuccessResponse} from '../response/success-response.interface'

export class ResponseUtil {
  static success<T>(data: T, message?: string, pagerOptions?: PagerOptions): SuccessResponse<T> {
    return {
      message,
      data,
      pagerOptions,
    }
  }

  static error(message: string, data: object | undefined): ErrorResponse {
    return {
      message,
      data,
    }
  }
}
