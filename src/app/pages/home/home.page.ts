/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppMinimize } from '@ionic-native/app-minimize/ngx/';
import { Magnetometer, MagnetometerReading } from '@ionic-native/magnetometer/ngx';
import { IonSegment, Platform } from '@ionic/angular';
import { ProStorage } from '../../services/storage-provider';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private static maxDeg = 71.5;

  @ViewChild('segment', { static: true }) segment: IonSegment;
  public isAutorange: boolean;

  public readonly MAX = 1000;
  public readonly MID = 400;
  public readonly MIN = 100;

  public WIDTH = 350;
  public HEIGHT = 650;
  public factor: number;
  public deg: number;
  public magnitude = '0';
  public x = '0';
  public y = '0';
  public z = '0';
  public scaleMeter = 'assets/img/100uT.png';

  // public segmentValue = this.MIN;
  private scale = (HomePage.maxDeg) / 100;
  private subscription: any;
  private RANGE_TRHESHOLD = 2000;
  private timeOut: any;
  private timeOut2: any;


  constructor(
    private magnetometer: Magnetometer,
    private platform: Platform,
    private appMinimize: AppMinimize,
    private storage: ProStorage
  ) {
    this.factor = innerWidth / this.WIDTH;
    this.deg = (this.scale * 25);
  }


  async ngOnInit() {
    this.platform.ready().then(async () => {
      this.initMagnetometer();
      this.isAutorange = await this.storage.getItem(ProStorage.AUTORANGE);
      this.segment.value = this.MIN.toString();
    });
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.backBtnHandler();
    });
    // eventos al guardar configuración
    this.storage.storageObservable.subscribe((value) => {
      switch (value.key) {
        case ProStorage.AUTORANGE:
          this.isAutorange = value.value;
          break;

        default:
          break;
      }

    });
  }


  public async onChangeScale(value: any) {
    this.scale = (HomePage.maxDeg) / Number.parseInt(value.detail.value, 10);
    this.segment.value = value.detail.value;
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
    if (this.platform.is('cordova')) {
      this.subscription = this.magnetometer.watchReadings().subscribe((data: MagnetometerReading) => {
        // console.log(data.magnitude);{x: -15.119999885559082, y: 16.85999870300293, z: 4.980000019073486, magnitude: 23.187805996338422}
        this.updateData(data.magnitude, data.x, data.y, data.z);
      });
    }

    if (!this.platform.is('cordova')) {
      setInterval(() => {
        this.updateData(Math.random() * 500, Math.random() * 1000, Math.random() * 1000, Math.random() * 1000);
      }, 1000);
    }
  }

  private updateData(magnitude, x, y, z) {
    try {
      // auntorange
      if (this.isAutorange) {
        this.setRangeUp(magnitude);
        this.restoreRange(magnitude);
      }
      // set view values
      this.magnitude = magnitude.toFixed(1);
      this.x = x.toFixed(1);
      this.y = y.toFixed(1);
      this.z = z.toFixed(1);
      this.deg = (this.scale * magnitude);
      this.deg = this.deg > HomePage.maxDeg + 2 ? HomePage.maxDeg + 2 : this.deg;
    } catch (err) {
      console.log(err);
      this.subscription.unsubscribe();
      this.initMagnetometer();
    }
  }



  private backBtnHandler() {
    this.appMinimize.minimize();
  }


  /************************ autorange *************************/
  private setRangeUp(magnitude: any) {
    if (magnitude > this.MIN && Number.parseInt(this.segment.value, 10) === this.MIN) {
      this.segment.value = this.MID.toString();
    }
    if (magnitude > this.MID && Number.parseInt(this.segment.value, 10) >= this.MID) {
      this.segment.value = this.MAX.toString();
    }
  }

  private restoreRange(magnitude: any) {
    if (magnitude > this.MID) {
      clearTimeout(this.timeOut2);
      this.timeOut2 = setTimeout(() => {
        this.segment.value = this.MID.toString();
      }, this.RANGE_TRHESHOLD);
    }
    if (magnitude > this.MIN) {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.segment.value = this.MIN.toString();
      }, this.RANGE_TRHESHOLD);
    }
  }
  /*************************************************************/

}


