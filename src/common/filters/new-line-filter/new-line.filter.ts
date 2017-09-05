import * as angular from 'angular'

function filter($sce: ng.ISCEService): (content: string) => string {
  return (content: string): string => {
    content = content || ''
    const text = content.replace(/(?:\r\n|\r|\n)/g, '<br>')

    return $sce.trustAsHtml(text)
  }
}

angular.module('profitelo.filters.new-line', [
  'ngSanitize'
])
  .filter('newLineFilter', filter)