import { Module } from "@nestjs/common";
import { AlphaGateway } from "./alpha.gateway";
import { AlphaCore } from "./alpha-core.module";
import { CoreService } from "./alpha-core.hero-schema";

@Module({
    imports: [AlphaCore],
    providers: [AlphaGateway],
    exports: [AlphaGateway]
})
export class AlphaCoreGateway {}
