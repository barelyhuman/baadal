# Sending E-Mails

Sending email / asynchronous notifications and alerts to consumers / customers is a common part of the app and so this codebase comes with our opinionated way of sending emails.

**Note:While you can configure the mailer service to run with external services like sendgrid, the default setup assumes you write the templates yourself**

### Templates

You can add your html templates in any folder and use any template compiler that you wish to use. I prefer `lodash`'s `_.template` method as that's what I've used most of my life and `lodash` is already a dependency in the codebase so you aren't really adding much up in terms of bundlesize

The templates are then to be compiled with the needed values and then sent using the `MailerService` class instance.

An example would look like this

```ts
import MailerService from 'services/mail'
import {Resolver} from 'type-graphql'

@Resolver()
class MuchImportant {
	mailer: MailerService

	constructor() {
		this.mailer = new MailerService()
	}

	@Mutation()
	veryQuick() {
		this.mailer.sendEmail(
			'example@example.com',
			'Memelord reporting',
			'Your site got hacked....',
		)
	}
}
```

The `MailerService` itself is just a simple class that implements my preferred way of using nodemailer which is a simple serverless handler and can be used by sending post requests to `https://mailer.reaper.im`

This allows us to trigger emails without putting the load on a worker in the same server and so.
The caveat is that the confirmation of the email being sent is basically 0.

But, as mentioned, you can switch the internals of the `services/mail` to match that of `sendgrid` or `mailjet` or whatever other service you may wish to use.
