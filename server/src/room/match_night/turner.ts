import { Match } from "./match";

export class Turner
{
    protected _alternative: number | null = null
    set alternative(a: number | null) {
        this._alternative = a
    }
    constructor(protected match: Match){
        this.gen = this.passer()
    }
    *passer(): Generator<number, number, unknown>
    {
        let start = 0;
        while(true) {
            if (this._alternative !== null) { 
                start = this._alternative
                this.alternative = null
            }
            if (start === this.match.heroes.length) { start = 0 }
            if (this.match.heroes[start].isOnline === false) {
                start ++
                continue;
            };
            yield start++
        }
    }
    gen: Generator<number, number, unknown>

    public pass_turn() {
        return this.match.heroes[this.gen.next().value]
    }
}