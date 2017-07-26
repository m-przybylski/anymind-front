import * as angular from 'angular'
import {MessengerInputComponentController} from './messenger-input.controller'
import {IMessengerInputBindings} from './messenger-input'
import messengerInputModule from './messenger-input'

describe('Unit testing: profitelo.components.communicator.messenger.maximized.messenger-input', () => {
  return describe('for messengerInput component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: MessengerInputComponentController

    const validHTML = '<messenger-input on-send-message="onSendMessage" on-upload-files="onUploadFiles" ' +
      'on-typing="onTyping" is-file-uploading="isFileUploading"></messenger-input>'

    const bindings: IMessengerInputBindings = {
      onSendMessage: (): void => {
      },
      onUploadFiles: (): void => {
      },
      onTyping: (): void => {
      },
      isFileUploading: false
    }

    function create(html: string, bindings: IMessengerInputBindings): JQuery {
      const parentScope: ng.IScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(messengerInputModule)
    })

    beforeEach(() => {

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {}

        component = $componentController<MessengerInputComponentController, IMessengerInputBindings>(
          'messengerInput', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

    it('should sendMessage', () => {
      const text = 'sample'
      spyOn(component, 'onSendMessage')
      component.sendMessage(text)
      expect(component.onSendMessage).toHaveBeenCalled()
      expect(component.inputModel).toBe('')
    })

    it('should uploadFiles', () => {
      const files: any = ['']
      spyOn(component, 'onUploadFiles')
      component.uploadFiles(files)

      expect(component.onUploadFiles).toHaveBeenCalledWith(files)
    })

    it('should uploadFiles', () => {
      const event = 'event'
      spyOn(component, 'onTyping')
      component.onKeyup(event)
      expect(component.onTyping).toHaveBeenCalled()
    })

  })
})
