(function() {
  function proExpertSingleConsultation() {

    function linkFunction() {
    }

    return {
      templateUrl: 'directives/expert-profile/pro-expert-single-consultation/pro-expert-single-consultation.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {

      }

    }

  }

  angular.module('profitelo.directives.expert-profile.pro-expert-single-consultation', [])
  .directive('proExpertSingleConsultation', proExpertSingleConsultation)

}())
