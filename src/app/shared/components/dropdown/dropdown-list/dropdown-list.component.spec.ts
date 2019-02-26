import { TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownListComponent } from './dropdown-list.component';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';
import { ScrollToElementDirective } from './scroll-to-element.directive';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Component: DropdownListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownListComponent, UserAvatarComponent, ScrollToElementDirective],
      imports: [BrowserModule, ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  it('should call onMouseSelect', () => {
    const fixture = TestBed.createComponent(DropdownListComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.dropdownItems = [
      { name: 'name', avatar: 'aa' },
      { name: 'name', avatar: 'aa' },
      {
        name: 'name',
        avatar: 'aa',
      },
    ];
    component.selectedItemIndex = 0;
    const indexNumber = 1;
    component.onMouseSelect(indexNumber);
    expect(component.selectedItemIndex).toEqual(indexNumber);
  });

  it('should call onItemClicked', () => {
    const fixture = TestBed.createComponent(DropdownListComponent);
    const component = fixture.componentInstance;
    component.dropdownItems = [{ name: 'name', avatar: 'aa' }];

    const indexNumber = 3;
    jest.spyOn(component, 'selectItem');
    component.onItemClicked(indexNumber);
    expect(component.selectItem).toHaveBeenCalled();
  });

  it('should call onSelectEnter', () => {
    const fixture = TestBed.createComponent(DropdownListComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.dropdownItems = [{ name: 'name', avatar: 'aa' }];

    jest.spyOn(component, 'selectItem');

    component.onSelectEnter();
    expect(component.selectItem).toHaveBeenCalled();
  });
});
