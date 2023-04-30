import { Hero } from "./hero";
import { Round } from "./round";

export class Turner {
    protected _alternative: number | null = null
    set alternative(a: number | null) {
        this._alternative = a
    }
    *passer(): Generator<number, number, unknown>
    {
        let start = 0;
        while(true) {
            if (this._alternative !== null) { 
                start = this._alternative
                this.alternative = null
            }
            if (start === this.gamers.length) { start = 0 }
            if (this.gamers[start].isOnline === false) {
                start ++
                continue;
            };
            yield start++
        }
    }
    gen: Generator<number, number, unknown>

    constructor(
        private readonly gamers: Array<Hero>
    ) { this.gen = this.passer() }

    public pass() {
        return new Round(this.gamers[this.gen.next().value])
    }
}