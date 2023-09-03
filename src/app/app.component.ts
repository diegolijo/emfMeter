/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonMenu, Platform } from '@ionic/angular';
import { ProStorage } from './services/storage-provider';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChild('menu', { static: true }) menu: IonMenu;

  public version = '0.0.5';
  public checkAutorange: boolean;
  public rangeHoldTime: number;
  private menuSubscrive: any;
  private RANGE_HOLD_TIME = 2000;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public storage: ProStorage
  ) {

  }

  ngOnInit() {
    document.body.setAttribute('color-theme', 'dark');

    this.platform.ready().then(async () => {
      await this.storage.init();
      // recuperamos datos guardados
      await this.getData();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);
    });
  }

  public onOpenMenu() {
    this.menuSubscrive = this.platform.backButton.subscribeWithPriority(100000, () => {
      this.menu.close();
    });

  }
  public onCloseMenu() {
    this.menuSubscrive.unsubscribe();
  }

  public onChangeCkeks(event, key) {
    switch (key) {
      case this.storage.AUTORANGE:
        this.checkAutorange = event.detail.checked;
        this.storage.setItem(key, event.detail.checked);
        break;
      case this.storage.RANGE_HOLD_TIME:
        this.rangeHoldTime = event.detail.value;
        this.storage.setItem(key, event.detail.value);
        break;

      default:
        break;
    }


  }

  private async getData() {
    this.checkAutorange = await this.storage.getItem(this.storage.AUTORANGE);
    this.rangeHoldTime = await this.storage.getItem(this.storage.RANGE_HOLD_TIME);
    if (!this.rangeHoldTime) {
      this.rangeHoldTime = this.RANGE_HOLD_TIME;
      this.storage.setItem(this.storage.RANGE_HOLD_TIME, this.RANGE_HOLD_TIME);
    }
  }


}
