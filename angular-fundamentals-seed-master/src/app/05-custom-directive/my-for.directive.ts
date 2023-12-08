import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[myFor][myForOf]',
  standalone: true
})
export class MyForDirective {


  @Input()
  set myForOf(collection: any) {
    this.view.clear();
    collection.forEach((item: any, index: number) => {
      this.view.createEmbeddedView(this.template, {
        $implicit: item,
        index
      })
    });
  }

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) {
  }

}
