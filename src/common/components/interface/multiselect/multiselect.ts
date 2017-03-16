(function () {
  /* @ngInject */
  function controller() {
    const checkedItems: Array<any> = []

    const refreshBindings = () => {
      if (!angular.isDefined(this.isDisabled)) {
        this.isDisabled = false
      }

      if (!angular.isDefined(this.selectedItems)) {
        this.selectedItems = []
      }

      if (!angular.isDefined(this.items)) {
        this.items = []
      }

      _.forEach(this.selectedItems, (selectedItem) => {
        const item = _.find(this.items, (item: any) => item.id === selectedItem.id)
        if (item) {
          checkedItems.push(item)
        }
      })
    }

    this.$onInit = () => {
      refreshBindings()
    }

    this.$onChanges = () => {
      refreshBindings()
    }

    this.toggleItem = (item: any) => {
      if (!this.isDisabled) {
        if (checkedItems.indexOf(item) === -1) {
          checkedItems.push(item)
        } else {
          checkedItems.splice(checkedItems.indexOf(item), 1)
        }
        this.onSelectChange(checkedItems)
      }
    }

    this.isChecked = (item: any) => {
      return (checkedItems.indexOf(item) > -1)
    }

    return this
  }

  const component = {
    template: require('./multiselect.pug')(),
    bindings: {
      isDisabled: '<',
      items: '<',
      onSelectChange: '<',
      selectedItems: '<',
      field: '@',
      title: '@'
    },
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.interface.multiselect', [
    'pascalprecht.translate'
  ])
  .component('multiselect', component)

}())
