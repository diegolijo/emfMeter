/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-analog-meter',
  templateUrl: './analog-meter.component.html',
  styleUrls: ['./analog-meter.component.scss'],
})
export class AnalogMeterComponent implements OnInit {

  /** uso
   * <app-analog-meter  [WIDTH]="100" [maxValue]="100" [dataIn]="magnitude" [top]="200" [right]="0"   >
   * </app-analog-meter>
   *
   */

  private static maxDeg = 71.5;

  /** tamaño del componente */
  @Input() WIDTH: number;
  /** posiciion absoluta */
  @Input() top: number;
  @Input() left: number;
  @Input() right: number;
  @Input() bottom: number;
  /** valor del punto maximo de la medida */
  @Input() maxValue: number;

  public factor: number;
  public deg: number;
  public HEIGHT: number;
  private scale: number;

  constructor() {
  }

  async ngOnInit() {
    this.scale = (AnalogMeterComponent.maxDeg) / this.maxValue;
    this.factor = innerWidth / this.WIDTH;
    this.HEIGHT = this.WIDTH * 1.85;
    this.deg = (this.scale * 50);
  }

  @Input()
  set dataIn(value: any) {
    try {
      this.scale = (AnalogMeterComponent.maxDeg) / this.maxValue;
      this.deg = (this.scale * value);
      this.deg = this.deg > AnalogMeterComponent.maxDeg + 2 ? AnalogMeterComponent.maxDeg + 2 : this.deg;
    } catch (err) {
      console.log(err);
    }
  }





}
