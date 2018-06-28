// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-template
import { IHelpdesk } from './helpdesk.interface';
import { ISearchArticleResults } from './search-article-results.interface';

// tslint:disable:member-ordering
// tslint:disable:strict-type-predicates
export class HelpdeskService implements IHelpdesk {

  private static readonly baseZendeskUrl = 'https://anymind.zendesk.com/';
  private static readonly zendeskExpertCategoryId = '115000117831';

  public static $inject = ['$http'];

    constructor(private $http: ng.IHttpService) {
  }

  public searchArticles = (query: string): ng.IPromise<ISearchArticleResults> => {
    const searchArticlesUrlPath = HelpdeskService.baseZendeskUrl + 'api/v2/help_center/articles/search.json';

    if (!query) {
      throw new Error('Required parameter query was not defined when calling addAccountRoute.');
    }

    const httpRequestParams: ng.IRequestConfig = {
      method: 'GET',
      url: searchArticlesUrlPath,
      params: {
        query,
        category: HelpdeskService.zendeskExpertCategoryId
      },
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-LANG': undefined,
        'X-Api-Key': undefined
      }
    };

    return this.$http(httpRequestParams).then(response => {
      if (typeof response.data !== 'undefined') {
        return response.data as ISearchArticleResults;
      }
      else {
        throw new Error('Response was not defined');
      }
    });
  }

}
