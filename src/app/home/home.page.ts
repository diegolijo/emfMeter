import { Component, OnInit } from '@angular/core';
import { AppMinimize } from '@ionic-native/app-minimize/ngx/';
import { Magnetometer, MagnetometerReading } from '@ionic-native/magnetometer/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private static maxDeg = 71;
  public width = 350;
  public height = 650;
  public factor = 0;
  public deg = 0;
  public magnitude = '0';
  public x = '0';
  public y = '0';
  public z = '0';
  public scaleMeter = 'assets/img/100uT.png';
  private scale = 0;
  private subscription: any;

  constructor(
    private magnetometer: Magnetometer,
    private platform: Platform,
    private appMinimize: AppMinimize
  ) {
    this.factor = innerWidth / this.width;
  }


  ngOnInit(): void {
    this.scale = (HomePage.maxDeg) / 100;
    this.deg = (this.scale * 75);
    this.platform.ready().then(() => {
      this.initMagnetometer();
    });
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.appMinimize.minimize();
    });
  }

  public onChangeScale(value: any) {
    this.scale = (HomePage.maxDeg) / Number.parseInt(value.detail.value, 10);
    switch (value.detail.value) {
      case '100':
        this.scaleMeter = 'assets/img/100uT.png';
        break;
      case '400':
        this.scaleMeter = 'assets/img/400uT.png';
        break;
      case '1000':
        this.scaleMeter = 'assets/img/1000uT.png';
        break;
      default:
        break;
    }
  }

  private initMagnetometer() {
    this.subscription = this.magnetometer.watchReadings().subscribe((data: MagnetometerReading) => {
      // console.log(data.magnitude);{x: -15.119999885559082, y: 16.85999870300293, z: 4.980000019073486, magnitude: 23.187805996338422}
      this.updateData(data);
    });
  }

  private updateData(data: MagnetometerReading) {
    try {
      this.magnitude = data.magnitude.toFixed(1);
      this.x = data.x.toFixed(1);
      this.y = data.y.toFixed(1);
      this.z = data.z.toFixed(1);
      this.deg = (this.scale * data.magnitude);
      this.deg = this.deg > HomePage.maxDeg + 2 ? HomePage.maxDeg + 2 : this.deg;
    } catch (err) {
      console.log(err);
      this.subscription.unsubscribe();
      this.initMagnetometer();
    }
  }



}
