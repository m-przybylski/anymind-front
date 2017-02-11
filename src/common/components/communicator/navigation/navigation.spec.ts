namespace profitelo.components.communicator.navigation {

  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import ICallService = profitelo.services.call.ICallService

  describe('Unit testing: profitelo.components.communicator.navigation', () => {
    return describe('for communicatorNav component >', () => {

      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let component: NavigationComponentController

      const validHTML: string = '<communicator-nav is-video="isVideo" is-messenger="isMessenger"></communicator-nav>'

      const bindings: INavigationComponentBindings = {
        isVideo: false,
        isMessenger: false
      }

      beforeEach(() => {
        angular.mock.module('profitelo.services.sounds')
      })

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeUrl/')
        $provide.value('soundsService', {})
      }))

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.components.communicator.navigation')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
                $componentController: ng.IComponentControllerService, _callService_: ICallService) => {

          rootScope = $rootScope.$new()
          compile = $compile

          const injectors = {
            callService: _callService_
          }

          component = $componentController<NavigationComponentController, INavigationComponentBindings>(
            'communicatorNav', injectors, bindings
          )
        })
      })

      function create(html: string, bindings: INavigationComponentBindings): JQuery {
        const parentScope: ng.IScope = rootScope.$new()
        const parentBoundScope = angular.extend(parentScope, bindings)
        const elem: JQuery = angular.element(html)
        const compiledElement: JQuery = compile(elem)(parentBoundScope)
        parentBoundScope.$digest()
        return compiledElement
      }

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the component', () => {
        const el: JQuery = create(validHTML, bindings)
        expect(el.html()).toBeDefined(true)
      })

      it('should animateButtons true', () => {
        const event = {
          currentTarget: {
            classList: {
              contains: () => true,
              add: () => {},
              remove: () => {}
            }
          }
        }
        spyOn(event.currentTarget.classList, 'contains').and.returnValue(true)
        spyOn(event.currentTarget.classList, 'add')
        spyOn(event.currentTarget.classList, 'remove')
        component.animateButtons(event)
        expect(event.currentTarget.classList.contains).toHaveBeenCalled()
        expect(event.currentTarget.classList.add).toHaveBeenCalled()
        expect(event.currentTarget.classList.remove).toHaveBeenCalled()
      })

      it('should animateButtons false', () => {
        const event = {
          currentTarget: {
            classList: {
              contains: () => false,
              add: () => {},
              remove: () => {}
            }
          }
        }
        spyOn(event.currentTarget.classList, 'contains').and.returnValue(false)
        spyOn(event.currentTarget.classList, 'add')
        spyOn(event.currentTarget.classList, 'remove')
        component.animateButtons(event)
        expect(event.currentTarget.classList.contains).toHaveBeenCalled()
        expect(event.currentTarget.classList.add).toHaveBeenCalled()
        expect(event.currentTarget.classList.remove).toHaveBeenCalled()
      })

      it('should startAudio', inject((callService: ICallService) => {
        spyOn(callService, 'startAudio')
        component.startAudio()
        expect(callService.startAudio).toHaveBeenCalled()
      }))

      it('should stopAudio', inject((callService: ICallService) => {
        spyOn(callService, 'stopAudio')
        component.stopAudio()
        expect(callService.stopAudio).toHaveBeenCalled()
      }))

      it('should startVideo', () => {
        spyOn(component, 'animateButtons')
        component.startVideo(<any>{})
        expect(component.animateButtons).toHaveBeenCalled()
      })

      it('should stopVideo', inject((callService: ICallService) => {
        spyOn(callService, 'stopVideo')
        component.stopVideo()
        expect(callService.stopVideo).toHaveBeenCalled()
      }))

      it('should toggleOptions', () => {
        spyOn(component, 'animateButtons')
        component.toggleOptions(<any>{})
        expect(component.animateButtons).toHaveBeenCalled()
      })

      it('should toggleMessenger', () => {
        spyOn(component, 'animateButtons')
        component.toggleMessenger(<any>{})
        expect(component.animateButtons).toHaveBeenCalled()
      })
    })
  })
}
