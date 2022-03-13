import {useEffect, useState} from 'react'

export default function UploaderPage() {
	const [fileBuffer, setFileBuffer] = useState()

	const onUpload = async () => {
		const data = new FormData()

		for (const file of fileBuffer) {
			data.append('files', file, file.name)
		}

		const response = await fetch('/api/upload-file', {
			method: 'POST',
			body: data,
		})

		if (response.ok) {
			console.log('Uploaded')
		} else {
			console.error('failed to upload')
		}
	}

	return (
		<>
			<input
				multiple
				id="uploader"
				type="file"
				onChange={e => {
					setFileBuffer(e.target.files)
				}}
			/>
			<button onClick={onUpload}>Upload</button>

			<style jsx>{`
				#uploader {
					border: 1px solid black;
					height: 200px;
					width: 200px;
				}
			`}</style>
		</>
	)
}
