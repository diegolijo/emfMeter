import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  checkAutorange: boolean;

  constructor(private platform: Platform,
    private splashScreen: SplashScreen) {

  }
  ngOnInit(): void {
    document.body.setAttribute('color-theme', 'dark');
    this.checkAutorange = true; // set get userData
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);
    });
  }

  public onOpenMenu(event) {

  }
  public onCloseMenu(event) {

  }

  public onChangeCkeks(event) {
  }
}
