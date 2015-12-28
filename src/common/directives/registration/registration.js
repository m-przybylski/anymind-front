angular.module('profitelo.directive.registration', [

])

.directive('proRegistration', () =>{
  return {
    templateUrl:  'directives/registration/registration.tpl.html',
    restrict:     'A',
    controller:   'RegistrationDirectiveController',
    controllerAs: 'vm',
    replace:      true
  }
})

.controller('RegistrationDirectiveController', RegistrationDirectiveController);

function RegistrationDirectiveController(AuthorizationService) {
  var vm = this;
  vm.registrationMetaData = {
    step1: true
  };
  vm.userData = {
    email: "",
    password: "",
    pin: ""
  };
  vm.step2 = () =>{
    AuthorizationService.register({email:"test@gmail.com", password:"dupa"})

  };


  console.log('here i am directive');


  return vm;

}
