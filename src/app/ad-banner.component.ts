import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { AdDirective } from './ad.directive';
import { AdItem } from './ad-item';
import { AdComponent } from './ad.component';

@Component({
  selector: 'app-ad-banner',
  template: `
              <div class="ad-banner">
                <h3>Advertisements</h3>
                <div>
                  <div *ngFor="let item of ads; let index=index" (click)="onSelected(index)">{{item.name}}</div>
                </div>

                <div>
                  <ad-container [Data]="SelectedItem"></ad-container>
                </div>
              </div>
            `
})
export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[];
  currentAdIndex = -1;
  @ViewChild(AdDirective) adHost: AdDirective;
  interval: any;

  private mSelectedItem: AdItem;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  get SelectedItem(): AdItem {
    return this.mSelectedItem;
  }

  set SelectedItem(value: AdItem) {
    this.mSelectedItem = value;
  }

  ngOnInit() {
    //this.loadComponent();
    //this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  onSelected(index: number){
    this.SelectedItem = this.ads[index];
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    let adItem = this.ads[this.currentAdIndex];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}
