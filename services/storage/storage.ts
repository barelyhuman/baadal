import {StorageManager, StorageManagerConfig} from '@slynova/flydrive'
import defaultConfig from './config'

export default class StorageService {
	private storage: StorageManager

	private config: StorageManagerConfig

	/**
	 *
	 * @param {StorageManagerConfig} config configuration for flydrive that will be used
	 * to decide what disk to store the data into,
	 * you can change the default config by editing the `./config.ts` file
	 * accompanying this service file
	 *
	 * @example
	 * const storageService = new StorageManagerConfig()
	 * // or
	 * const storageService = new StorageManagerConfig({disks:{
	 * 	//.... override configuration
	 * }})
	 *
	 * // upload the file
	 * await storageService.upload("foo.txt","FooBar")
	 *
	 *
	 * // get a signed url from the uploaded file service
	 * await storageService.getURL("foo.txt")
	 */
	constructor(config?: StorageManagerConfig) {
		this.config = config || defaultConfig
		this.storage = new StorageManager(this.config)
	}

	async upload(
		filePath: string,
		fileData: string | Buffer | NodeJS.ReadableStream,
	) {
		const response = await this.storage.disk().put(filePath, fileData)
		return response
	}

	async getURL(filePath: string): Promise<string> {
		const url = await this.storage.disk().getSignedUrl(filePath)
		return url.signedUrl
	}
}
