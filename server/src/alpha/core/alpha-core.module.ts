import { Module } from "@nestjs/common";
import { CoreService } from "./alpha-core.hero-schema";

@Module({
    imports: [],
    providers: [CoreService],
    exports: [CoreService]
})
export class AlphaCore {}
