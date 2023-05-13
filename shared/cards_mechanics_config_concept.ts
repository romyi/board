import { randomUUID } from "crypto"

type MobConfig = {
    group: 'mob'
    rank: number
}

type ItemConfig = {
    group: 'item'
    cost: number
    equip: 'foot' | 'head' | 'free'
}

type ToolConfig = {
    group: 'tool'
    cost: number
}

class Game {
    state: number = 1
}

type Commons = {title: string, desc: string, mechanic: (game: Game) => void}

const mobs: Record<string, {settings: MobConfig & Commons, quantity: number}> = {
    'dude': {
        settings: {title: 'dude',
        desc: 'just dude',
        group: 'mob',
        rank: 1,
        mechanic(game: Game) {
            game.state += 1
        }},
        quantity: 1
    },
    'miss': {
        settings: {title: 'miss',
        desc: 'beau miss',
        group: 'mob',
        rank: 2,
        mechanic(game: Game) {
            game.state -= 10
        }},
        quantity: 1
    }
}

const tools: Record<string, {settings: ToolConfig & Commons, quantity: number}> = {
    'jenkins': {
        settings: {title: 'ci cd tool',
        desc: 'muzukashii',
        group: 'tool',
        cost: 100,
        mechanic(game: Game) {
            game.state += 4
        }},
        quantity: 1
    }
}

abstract class Card {
    id: string
    constructor(public title: string, public desc: string){
        this.id = randomUUID()
    }
    abstract mechanic(game: Game): void
    abstract get info(): Omit<Commons, 'mechanic'> 
}

class MobCard extends Card implements MobConfig {
    group: 'mob' = 'mob'
    rank: number
    mechanic
    private constructor(properties: MobConfig & Commons) {
        super(properties.title, properties.desc)
        this.mechanic = properties.mechanic,
        this.rank = properties.rank
    }
    get info() { return {
        id: this.id,
        title: this.title,
        desc: this.desc,
        rank: this.rank,
        group: this.group
    }}
    static createMob(properties: MobConfig & Commons): MobCard { return new MobCard(properties) }
}

class ToolCard extends Card implements ToolConfig {
    group: 'tool' = 'tool'
    cost
    mechanic
    private constructor(properties: ToolConfig & Commons) {
        super(properties.title, properties.desc)
        this.mechanic = properties.mechanic
        this.cost = properties.cost
    }
    get info() { return {
        id: this.id,
        title: this.title,
        desc: this.desc,
        cost: this.cost,
        group: this.group
    }}
    static createTool(properties: ToolConfig & Commons): ToolCard { return new ToolCard(properties)}
}

const adventures: Array<Card> = []
const treasures: Array<Card> = []

Object.values(mobs).forEach((config) => {
    for (let i = 0; i < config.quantity; i++) {
        adventures.push(MobCard.createMob(config.settings))
    }
})

Object.values(tools).forEach((config) => {
    for (let i = 0; i < config.quantity; i++) {
        treasures.push(ToolCard.createTool(config.settings))
    }
})