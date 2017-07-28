/* tslint:disable:  no-magic-numbers */

namespace profitelo.filters.rankSearch {

  function filter(): (array: any[], searchKey: string, props: string[]) => any[] {
    return function(array: any[], searchKey: string, props: string[]): any[] {
      if (!array || !searchKey || !props) {
        return array
      }

      for (let i = 0; i < array.length; i++) {
        const obj = array[i]
        obj.rankSearch = 0
        for (let j = 0; j < props.length; j++) {
          const index = obj[props[j]].indexOf(searchKey)
          obj.rankSearch += (index === -1 ? 15 : index) * ((j + 1) * 8)
        }
      }

      return array
    }
  }

  angular.module('profitelo.filters.rankSearch', [])
    .filter('rankSearch', filter)
}
