import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeroesComponent} from './heroes/heroes.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {MessagesComponent} from './messages/messages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {CreationComponent} from './creation/creation.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WeaponsComponent} from './weapons/weapons.component';
import {CreateWeaponComponent} from './create-weapon/create-weapon.component';
import { WeaponDetailComponent } from './weapon-detail/weapon-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    CreationComponent,
    WeaponsComponent,
    CreateWeaponComponent,
    WeaponDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAnalyticsModule, // dynamically imports firebase/analytics
    AngularFirestoreModule,
    BrowserAnimationsModule,
    // imports firebase/firestore, only needed for database features
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    // AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
