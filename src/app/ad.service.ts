import { Injectable } from '@angular/core';

import { HeroJobAdComponent } from './hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile.component';
import { AdItem } from './ad-item';

@Injectable()
export class AdService {
  getAds() {
    return [
      new AdItem(HeroProfileComponent, { name: 'Bombasto', bio: 'Brave as they come' }, 'Bombasto'),

      new AdItem(HeroProfileComponent, { name: 'Dr IQ', bio: 'Smart as they come' }, 'Dr IQ'),

      new AdItem(HeroJobAdComponent, {
        headline: 'Hiring for several positions',
        body: 'Submit your resume today!'
      }, 'Job1'),

      new AdItem(HeroJobAdComponent, {
        headline: 'Openings in all departments',
        body: 'Apply today'
      }, 'Job2'),
    ];
  }
}
