import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Magnetometer } from '@ionic-native/magnetometer/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/componentsModule';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ProStorage } from './services/storage-provider';
import { SpeechToText } from 'angular-speech-to-text';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule],
  providers: [
    NativeAudio,
    Magnetometer,
    SplashScreen,
    AppMinimize,
    ComponentsModule,
    ProStorage,
    SpeechToText,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
