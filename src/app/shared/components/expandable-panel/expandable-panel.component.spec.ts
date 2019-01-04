// tslint:disable:no-empty
import { ExpandablePanelComponent } from './expandable-panel.component';
import { fakeAsync, tick } from '@angular/core/testing';

describe('ExpandablePanelComponent', () => {
  let component: ExpandablePanelComponent;
  const document = { createElement: jest.fn() };
  beforeEach(() => {
    component = new ExpandablePanelComponent(document as any);
  });

  it('should change state when toggled', fakeAsync(() => {
    document.createElement.mockReturnValue({ style: {} });
    (component as any).content = {
      nativeElement: {
        appendChild: (): void => {},
        removeChild: (): void => {},
      },
    };
    component.ngAfterViewInit();
    tick();
    const originState = component.state;
    component.expandable = true;
    component.toggleState();
    expect(component.state).not.toEqual(originState);
  }));
});
