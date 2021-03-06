import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HeroDetailComponent} from './hero/hero-detail.component';
import {HeroComponent} from "./hero/hero.component";

@NgModule({
    declarations: [
        HeroComponent,
        HeroDetailComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [HeroComponent]
})
export class AppModule {
}
