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

  public version = '0.0.2';
  public checkAutorange: boolean;
  private menuSubscrive: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private storage: ProStorage
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

  public onChangeCkeks(event) {
    this.storage.setItem(ProStorage.AUTORANGE, event.detail.checked);
  }

  private async getData() {
    this.checkAutorange = await this.storage.getItem(ProStorage.AUTORANGE);
  }


}
