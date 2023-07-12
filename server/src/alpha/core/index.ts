abstract class Hero {
    id: string
    hits: number
}

abstract class Game {
    heroes: Hero[]
}

type CardSchema = Record<string, {name: string, owner: string | null, deck: string}>
const proxy = new Proxy<CardSchema>({}, {
    set(target, p, newValue, receiver) {
        console.log(target)
        return newValue
    },
})
// card schema
// id       name        owner       deck
// euu3y    dice_twins  climoy      hand
// 0003e    sword       climoy      equip
// 00e32    brothers    null        loots
// 32eed    magic_hat   null        draws
// 003aq    curse       climoy      skirmish

class CoresKit {
    find_hero_by_id(options: {heroes: Hero[], id: string}): Hero 
    { return options.heroes.find((hero) => hero.id === options.id) }
    deal_damage(options: {hits: number, damagable: {hits: number}}) 
    { options.damagable.hits -= options.hits }
    increase_rank(options: {rankable: {rank: number}}) 
    { options.rankable.rank ++ }
    transfer_card(options: {id: string, schema: CardSchema, owner: string | null, deck: string})
    { options.schema[options.id] = {...options.schema[options.id], owner: options.owner, deck: options.deck} }
}