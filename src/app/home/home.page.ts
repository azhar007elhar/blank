import { Component, OnInit } from '@angular/core';
import { Admob, AdmobOptions } from '@ionic-native/admob/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private admob: Admob) {
    // Set admob options
    this.admob.setOptions(this.admobOptions)
      .then(() => console.log('Admob options have been successfully set'))
      .catch(err => console.error('Error setting admob options:', err));
  }

  ngOnInit() {
    this.loadinterstitial();
    this.createBanner();
  }

  admobOptions: AdmobOptions = {
    bannerAdId: 'ca-app-pub-3940256099942544/6300978111',
    interstitialAdId: 'ca-app-pub-3940256099942544/4411468910',
    isTesting: true,
    autoShowBanner: false,
    autoShowInterstitial: false,
    autoShowRewarded: false,
    adSize: this.admob.AD_SIZE.IAB_BANNER
  };

  createBanner() {
    this.admob.createBannerView()
      .then(() => {
        console.log('Banner ad loaded');
        this.showBanner();
      })
      .catch(err => console.error('Error loading banner ad:', err));
  }


  showBanner() {
    // Show banner ad (createBannerView must be called before and onAdLoaded() event raised)
    this.admob.onAdLoaded().subscribe((ad) => {
      if (ad.adType === this.admob.AD_TYPE.BANNER) {
        this.admob.showBannerAd()
          .then(() => console.log('Banner ad shown'))
          .catch(err => console.error('Error showing banner ad:', err));
      } else if (ad.adType === this.admob.AD_TYPE.INTERSTITIAL) {
        this.admob.showInterstitialAd()
          .then(() => console.log('Interstitial ad shown'))
          .catch(err => console.error('Error showing interstitial ad:', err));
      }
    });
  }

  loadinterstitial() {
    // Request an interstitial ad, in order to be shown later on
    // It is possible to autoshow it via options parameter, see docs
    this.admob.requestInterstitialAd()
      .then(() => console.log('Interstitial ad loaded'))
      .catch(err => console.error('Error loading interstitial ad:', err));
  }

}
