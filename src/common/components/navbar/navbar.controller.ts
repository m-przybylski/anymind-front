import * as angular from 'angular'
import {INavbarComponentBindings} from './navbar'
import {UserService} from '../../services/user/user.service'
import IStyleConstant = profitelo.constants.style.IStyleConstant

export class NavbarComponentController implements INavbarComponentBindings {
  isWindowScrollBottom: boolean = false
  isCollapsed: boolean = false
  isSearchVisible: boolean = false
  elementOffsetHeight: number = 0
  isNavigationCollapsed: boolean = false
  isLoggedIn: boolean
  searchModel: string
  navbarStyle: {
    transform: string
  }
  isNotificationsMenuShow: boolean

  /* @ngInject */
  constructor(private $scope: ng.IScope, private $window: ng.IWindowService, private $element: any,
              private userService: UserService, private $document: ng.IDocumentService,
              private styleConstant: IStyleConstant) {

    angular.element(this.$window).bind('scroll', () => {
      if (this.$window.pageYOffset <= this.styleConstant.NAVBAR_HEIGHT) {
        this.isCollapsed = false
        this.navbarStyle = {
          'transform': 'translateY(' + (-this.$window.pageYOffset) + 'px)'
        }
        this.isWindowScrollBottom = (this.$window.pageYOffset > this.elementOffsetHeight)
      } else {
        this.isCollapsed = true
        this.navbarStyle = {
          'transform': ''
        }
      }

      if (!this.isWindowScrollBottom) {
        this.navbarStyle = {
          'transform': 'translateY(0)'
        }
      }

      this.isWindowScrollBottom = (this.$window.pageYOffset > this.elementOffsetHeight)
      this.$scope.$apply()
      this.elementOffsetHeight = this.$window.pageYOffset
    })

    this.setNavbarStatus()

    this.$document.bind('click', (event: any) => {
      const navigation = angular.element(this.$element).find('.mobile-nav')
      const ifTargetClicked = angular.element(navigation).find(event.target).length > 0

      if (!ifTargetClicked) {
        this.isNavigationCollapsed = false
      }

      const notificationsMenuLink = angular.element(this.$element).find('.notifications-tab-link')
      const ifNotificationsMenuClicked = angular.element(notificationsMenuLink).find(event.target).length > 0
      const invitationsMenuLink = angular.element(this.$element).find('.invitations-tab-link')
      const ifInvitationsMenuClicked = angular.element(invitationsMenuLink).find(event.target).length > 0

      if (ifNotificationsMenuClicked || ifInvitationsMenuClicked) {
        this.isNavigationCollapsed = true
      }

      this.$scope.$apply()
    })
  }

  public onMobileMenuCollapsed = () => {
    this.isNavigationCollapsed = !this.isNavigationCollapsed
  }

  public onSearchCollapsed = () => {
    /* this.isSearchVisible is overwrite in CSS when resolution is bigger than 768px */
    this.isSearchVisible = !this.isSearchVisible
    this.isNavigationCollapsed = false
  }

  private setNavbarStatus = (): void => {
    this.userService.getUser().then(() => {
      this.isLoggedIn = true
    }, () => {
      this.isLoggedIn = false
    })
  }

}
