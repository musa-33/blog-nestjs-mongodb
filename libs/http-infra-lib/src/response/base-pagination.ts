import { PagerDto } from '@lib/http-infra-lib/dtos/pager.dto'
import { PagerOptions } from '@lib/http-infra-lib/response/pager-options.interface'
import { PagerResult } from '@lib/http-infra-lib/response/pager-result.interface'

export class BasePagination<T>{
  DEFAULT_PER_PAGE = 10
  DEFAULT_PAGE_NUMBER = 1

  private getPageNumber(pagerDto: PagerDto): number {
    return pagerDto.pageNumber ? pagerDto.pageNumber : this.DEFAULT_PAGE_NUMBER
  }

  getSkip(pagerDto: PagerDto): number {
    return (this.getPageNumber(pagerDto) - 1) * this.getTake(pagerDto)
  }

  getTake(pagerDto: PagerDto): number {
    return pagerDto.perPage ? pagerDto.perPage : this.DEFAULT_PER_PAGE
  }

  getPagerResult(
    data: T[],
    totalCount: number,
    pagerDto: PagerDto,
  ): PagerResult<T> {
    pagerDto = {
      pageNumber: this.getPageNumber(pagerDto),
      perPage: this.getTake(pagerDto),
    }
    const pagerOptions: PagerOptions = { pagerDto, totalCount }
    return { data, pagerOptions }
  }
}
