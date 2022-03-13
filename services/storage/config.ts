import {join} from 'path'

const config = {
	default: 'local',
	disks: {
		local: {
			driver: 'local',
			config: {
				root: join(process.cwd(), 'uploaded-files'),
			},
		},
		s3: {
			driver: 's3',
			config: {
				key: 'AWS_S3_KEY',
				secret: 'AWS_S3_SECRET',
				region: 'AWS_S3_REGION',
				bucket: 'AWS_S3_BUCKET',
			},
		},

		spaces: {
			driver: 's3',
			config: {
				key: 'SPACES_KEY',
				secret: 'SPACES_SECRET',
				endpoint: 'SPACES_ENDPOINT',
				bucket: 'SPACES_BUCKET',
				region: 'SPACES_REGION',
			},
		},

		gcs: {
			driver: 'gcs',
			config: {
				keyFilename: 'GCS_KEY',
				bucket: 'GCS_BUCKET',
			},
		},
	},
}

export default config
