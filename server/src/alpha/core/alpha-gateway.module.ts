import { Module } from "@nestjs/common";
import { AlphaGateway } from "./alpha.gateway";
import { AlphaCore } from "./alpha-core.module";
import { CoreService } from "./alpha-core.service";

@Module({
    imports: [AlphaCore],
    providers: [AlphaGateway],
})
export class AlphaCoreGateway {}
