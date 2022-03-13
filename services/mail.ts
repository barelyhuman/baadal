import got from 'got'

export default class MailerService {
	/**
	 * DOC
	 *
	 * Use https://mailer.reaper.im to generate a mailer based service url to send through HTML
	 * emails
	 */
	private MAILER_URL: string = ''

	/**
	 *
	 * @param mailerURL https://mailer.reaper.im url if you wish to use a
	 * different service provider for a specific email
	 * @example
	 * const mailer = new MailerService()
	 * mailer.sendEmail("example@example.com","Test Email","<p>Click to hack the world</p>")
	 */
	constructor(mailerURL: string = '') {
		this.MAILER_URL = process.env.MAILER_URL || mailerURL
	}

	// the basic send email method for the above mailer service
	// you can extend this or add in more methods to this class
	// for more specific email requirements.
	async sendEmail(toEmail: string, subject: string, html: string) {
		return got
			.post(this.MAILER_URL, {
				body: JSON.stringify({
					to: toEmail,
					subject: subject,
					html: html,
				}),
			})
			.json()
	}
}
