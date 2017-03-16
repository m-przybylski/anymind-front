import * as angular from "angular"
import sessionModule from "../../common/services/session/session"
import smoothScrollingModule from "../../common/services/smooth-scrolling/smooth-scrolling"
import "common/directives/expert-profile/pro-expert-card/pro-expert-card"
import "common/directives/expert-profile/pro-expert-see-more/pro-expert-see-more"
import "common/directives/pro-advice-tile/pro-advice-tile"
import "common/directives/pro-news-tile/pro-news-tile"
import "common/components/expert-profile/similar-experts-slider/similar-experts-slider"
import "common/components/pro-search-dropdown/pro-search-dropdown"
import "common/components/interface/slider/slider"
import navbarModule from "../../common/components/navbar/navbar"

function HomeController() {

  this.interfaceController = {}

  this.interfaceController.hideSearchMask = true
  this.nextSlide = () => {
    this.controlls.nextSlide()
  }

  this.prevSlide = () => {
    this.controlls.prevSlide()
  }

  this.expertCard = [
    {
      id: '0',
      value: {
        name: '1 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '1',
      value: {
        name: '2 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '2',
      value: {
        name: '3 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '3',
      value: {
        name: '4 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '4',
      value: {
        name: '5 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '5',
      value: {
        name: '6 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '6',
      value: {
        name: '7 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '7',
      value: {
        name: '8 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '8',
      value: {
        name: '9 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    }
  ]
  this.newsTile = [
    {
      title: 'Stu Unger Rise And Fall Of A Poker Genius',
      teaser: 'Many of us are so used to working on a computer desktop that when it comes time to purchase...',
      numberOfComments: '99',
      numberOfLikes: '99',
      publishDate: '2016-02-24'
    }
  ]
  this.adviceTile = [
    {
      title: 'Stu Unger Rise And Fall Of A Poker Genius',
      teaser: 'Many of us are so used to working on a computer desktop that when it comes time to purchase...',
      numberOfComments: '99',
      numberOfLikes: '99',
      publishDate: '2016-02-24'
    }
  ]

  this.similarExperts = [
    {
      name: 'Stu Unger Rise And Fall Of A Poker Genius',
      numberOfCalls: 2,
      satisfaction: 2,
      price: 10000,
      owner: {
        name: 'Janek Dzbanek',
        img: null,
        type: 'EXP'
      }
    },
    {
      name: 'Stu Unger Rise And Fall Of A Poker Genius',
      numberOfCalls: 2,
      satisfaction: 2,
      price: 10000,
      owner: {
        name: 'Janek Dzbanek',
        img: null,
        type: 'EXP'
      }
    },
    {
      name: 'Stu Unger Rise And Fall Of A Poker Genius',
      numberOfCalls: 2,
      satisfaction: 2,
      price: 10000,
      owner: {
        name: 'Janek Dzbanek',
        img: null,
        type: 'EXP'
      }
    },
    {
      name: 'Stu Unger Rise And Fall Of A Poker Genius',
      numberOfCalls: 2,
      satisfaction: 2,
      price: 10000,
      owner: {
        name: 'Janek Dzbanek',
        img: null,
        type: 'EXP'
      }
    }
  ]

  return this
}

const homePageModule = angular.module('profitelo.controller.home', [
  'ui.router',
  sessionModule,
  smoothScrollingModule,
  navbarModule,
  'profitelo.directives.pro-expert-card',
  'profitelo.directives.pro-expert-see-more',
  'profitelo.directives.pro-advice-tile',
  'profitelo.directives.pro-news-tile',
  'profitelo.components.expert-profile.similar-experts-slider',
  'profitelo.components.pro-search-dropdown',
  'profitelo.components.interface.slider'
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.home', {
      url: '/home',
      controllerAs: 'vm',
      controller: 'HomeController',
      template: require("./home.pug")(),
      data: {
        pageTitle: 'PAGE_TITLE.HOME'
      }
    })
  })
  .controller('HomeController', HomeController)
  .name

export default homePageModule;
