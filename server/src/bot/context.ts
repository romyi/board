import { Context } from "telegraf";

export interface CustomContext extends Context {
    session: {
        login: boolean
    }
}