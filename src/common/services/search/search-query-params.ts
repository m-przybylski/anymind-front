import {PriceSearchParam} from 'profitelo-api-ng/model/models'

export type ServiceType =  'ORG' | 'EXP'

export class SearchQueryParams {

  private query: string = ''
  private price: PriceSearchParam[] = []
  private languages: string[] = []
  private serviceType?: ServiceType
  private tags: string[] = []
  private offset: number = 0
  private count: number = 20

  /* @ngInject */
  constructor() {
  }

  public getQuery = (): string => this.query
  public getPrice = (): PriceSearchParam[] => this.price
  public getLanguages = (): string[] => this.languages
  public getServiceType = (): ServiceType | undefined => this.serviceType
  public getTags = (): string[] => this.tags
  public getOffset = (): number => this.offset
  public getCount = (): number => this.count

  public setQuery = (query: string): void => {
    this.query = query
  }
  public setPrice = (price: PriceSearchParam[]): void => {
    this.price = price
  }
  public setLanguages = (languages: string[]): void => {
    this.languages = languages
  }
  public setServiceType = (serviceType: ServiceType): void => {
    this.serviceType = serviceType
  }
  public setTags = (tags: string[]): void => {
    this.tags = tags
  }
  public setOffset = (offset: number): void => {
    this.offset = offset
  }
  public setCount = (count: number): void => {
    this.count = count
  }

}
