import {NextApiHandler} from 'next'
import multiparty from 'multiparty'
import {StorageService} from 'services/storage'

const storage = new StorageService()

export const config = {
	api: {
		bodyParser: false,
	},
}

const fileUploader: NextApiHandler = async (req, res) => {
	try {
		const form = new multiparty.Form()

		form.on('part', async part => {
			await storage.upload(part.filename, part)
		})

		form.on('close', () => {
			res.send({success: true})
		})

		form.parse(req)

		return
	} catch (err) {
		console.error(err)
	}
}

export default fileUploader
