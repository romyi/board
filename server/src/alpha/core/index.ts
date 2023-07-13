import arrayShuffle from 'array-shuffle';

abstract class Hero {
    id: number
    name: string
    hits: number
    squad: string
    isConnected: boolean
    turn: boolean
}

class Game {
    heroes: HeroSchema
    schema: CardSchema
}

type Blueprint = {group: Group}
type Blueprints = Record<string, Blueprint>

type Deck = 'loots' | 'doors' | 'onboard' | 'inhand' | 'inuse' | 'areplayed' | 'stashed'
type Group = 'bonus' | 'creature' | 'effects' | 'attributes' | 'battlebuffs'
class HeroSchema {
    constructor(protected schema: Array<Hero>){
        this.initiator = schema[0]
    }
    protected total: number
    protected _initiator: Hero
    set initiator(hero: Hero) { this._initiator = hero }
    get initiator() { return this._initiator }
    check_online() { this.initiator.isConnected ? {} : this.pass_init() }
    pass_init() { this.initiator = this.initiator.id > this.total - 1 ? this.schema[this.initiator.id + 1] : this.schema[0] }
    find_name(name: string) { this.schema.find((hero) => hero.name === name) }
}
class CardSchema {
    protected schema: Record<string, {name: string, owner: string | null, deck: Deck}>
    constructor(protected bp: Blueprints){}
    transfer(id: string, owner: string) { if (this.schema.table[id]) {this.schema.table[id][1] = owner} }
    equip(id: string) { this.schema.table[id][2] = 'equiped' }
    stash(id: string) { this.schema.table[id][2] = 'stashed' }
    get loots() {  return arrayShuffle(Object.entries(this.schema).filter((row) => row[1].deck === 'loots')) }
    get doors() {  return arrayShuffle(Object.entries(this.schema).filter((row) => row[1].deck === 'doors')) }
    take_top(num: number, deck: 'loots' | 'doors') 
    { if (this[deck].length >= num) { this[deck].splice(0, num) } else {
        this.restore_deck(deck)
        this.take_top(num, deck)
    } }
    restore_deck(deck: 'loots' | 'doors')
    { Object.values(this.schema)
        .map((row) => row.deck === 'stashed' 
        ? this.bp[row.name].group === 'bonus' 
        ? row.deck = 'loots' 
        : row.deck = 'doors'
        : {}
    )}
}

class Cores {
    constructor(protected bp: Blueprints){}
    card_play(id: string) {  }
    deal_damage(options: {hits: number, damagable: {hits: number}}) 
    { options.damagable.hits -= options.hits }
    increase_rank(options: {rankable: {rank: number}}) 
    { options.rankable.rank ++ }
}