import { Component, ViewContainerRef, ViewChild, ElementRef, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { AdItem } from './ad-item';
import { AdComponent } from './ad.component';

@Component({
    selector: 'ad-container',
    template: `
                <div>
                  <ng-container #container></ng-container>
                </div>

                <div>
                    <button (click)="onClick()">OK</button>
                <div>
              `
})
export class AdContainerComponent implements OnInit {

    //https://www.cnblogs.com/hxling/articles/7794799.html
    @ViewChild('container', { read: ViewContainerRef }) mContainer: ViewContainerRef;

    @Input() set Data(value: AdItem) {
        if (value != undefined) {
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(value.component);

            let componentRef = this.mContainer.createComponent(componentFactory);
            (<AdComponent>componentRef.instance).data = value.data;
        }
    }

    constructor(
        public componentFactoryResolver: ComponentFactoryResolver,
        public viewContainerRef: ViewContainerRef) {

    }

    ngOnInit(): void {
    }

    onClick() {
        alert('OK');
    }
}