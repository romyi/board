import { Module } from "@nestjs/common";
import { CoreService } from "./alpha-core.service";

@Module({
    providers: [CoreService],
    exports: [CoreService]
})
export class AlphaCore {}
