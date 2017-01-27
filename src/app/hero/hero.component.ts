import {Component, OnInit} from '@angular/core';

import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
    selector: 'my-heroes',
    templateUrl: 'hero.component.html',
    styleUrls: ['hero.component.css'],
    providers: [HeroService]
})

export class HeroComponent implements OnInit {

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