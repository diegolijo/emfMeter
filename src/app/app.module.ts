import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Magnetometer } from '@ionic-native/magnetometer/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/componentsModule';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ProStorage } from './services/storage-provider';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    Magnetometer,
    AppMinimize,
    ComponentsModule,
    ProStorage,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
