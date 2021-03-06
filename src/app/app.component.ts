import {Component, OnInit} from '@angular/core';

import {Hero} from './hero/hero';
import {HeroService} from './hero/hero.service';

@Component({
    selector: 'app-root',
    templateUrl: 'hero/hero.component.html',
    styleUrls: ['hero/hero.component.css'],
    providers: [HeroService]
})

export class AppComponent implements OnInit {

    title = 'Tour of Heroes';
    heroes = [];
    selectedHero: Hero;

    constructor(private heroService: HeroService) {
    }

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

}


