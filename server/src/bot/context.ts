import { Context } from "telegraf";

export interface CustomContext extends Context {
    session: {
        user?: {
            id: Number
        }
    }
}