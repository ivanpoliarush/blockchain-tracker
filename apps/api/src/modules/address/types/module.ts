import { DynamicModule } from '@nestjs/common';

export interface AddressModuleConfig {
	blockchainConnectionUrl: string;
}

export interface AddressModuleOptions extends Pick<DynamicModule, 'imports'> {
	global?: boolean;
	inject: any[];
	useFactory: (
		...args: any[]
	) => AddressModuleConfig | Promise<AddressModuleConfig>;
}
