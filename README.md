# SmellyCat

Webpage of the company “SmellyCat”

### EmailJS integration
On contact form submission an email is sent.

#### EmailJS configuration

In order to do so, an active [EmailJS](https://www.emailjs.com/) account is required.

- After setting up an account, the following keys are required:

	- EMAILJS_PUBLIC_KEY: This can be found in the account settings.
	- EMAILJS_SERVICE_ID: This is available after [a service is configured](https://www.emailjs.com/docs/tutorial/adding-email-service/).
	- EMAILJS_TEMPLATE_ID: This is available after [a template is configured](https://www.emailjs.com/docs/tutorial/creating-email-template/).

- For the SmellyCat contact form, the template may look similar to the example below

![template example](https://i.imgur.com/hLpIgUf.jpg)

#### Provide the required keys

In the app root create a file named **keys.ts** with the following content

*keys.ts*
```
const keys = {
  EMAILJS_SERVICE_ID: 'XXXX',
  EMAILJS_TEMPLATE_ID: 'XXXX',
  EMAILJS_PUBLIC_KEY: 'XXXX',
};
```

Replace the **XXXX** placeholders with the corresponding EmalJS configuration values.
