import { Logo } from '@/components'

export default function PrivacyPolicy() {
	return (
		<div className="mt-20 sm:mt-28 md:mt-36">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="mb-10">
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
							<h1 className="text-3xl sm:text-4xl md:text-5xl font-black">
								Privacy Policy
							</h1>
							<div className="flex items-center gap-3">
								<div className="w-10 sm:w-12">
									<Logo size={45} />
								</div>
								<h2 className="font-black text-xl sm:text-2xl">
									Holden Knight Group
								</h2>
							</div>
						</div>
					</div>

					<div className="space-y-6">
						<p>
							Holden Knight Group (&quot;us&quot;, &quot;we&quot;, or
							&quot;our&quot;) operates the holdenknight.com website and the
							Holden Knight Group mobile application (hereinafter referred to as
							the &quot;Service&quot;).
						</p>
						<p>
							This page informs you of our policies regarding the collection,
							use and disclosure of personal data when you use our Service and
							the choices you have associated with that data.
						</p>
						<p>
							We use your data to provide and improve the Service. By using the
							Service, you agree to the collection and use of information in
							accordance with this policy. Unless otherwise defined in this
							Privacy Policy, the terms used in this Privacy Policy have the
							same meanings as in our Terms and Conditions.
						</p>
					</div>

					<section className="mt-12">
						<h2 className="text-2xl font-semibold mb-6">Definitions</h2>
						<ul className="space-y-4 list-disc pl-5">
							{definitions.map((def, index) => (
								<li key={index}>
									<div className="font-bold mb-2">{def.title}</div>
									<div className="text-sm sm:text-base">{def.description}</div>
									{def.additional && (
										<div className="mt-2 text-sm sm:text-base">
											{def.additional}
										</div>
									)}
								</li>
							))}
						</ul>
					</section>

					<section className="mt-12">
						<h2 className="text-2xl font-semibold mb-6">
							Information Collection and Use
						</h2>
						<p className="mb-6">
							We collect several different types of information for various
							purposes to provide and improve our Service to you.
						</p>

						<h3 className="text-xl font-semibold mb-4">
							Types of Data Collected
						</h3>
						<h4 className="text-lg font-semibold mb-4">Personal Data</h4>
						<p className="mb-4">
							While using our Service, we may ask you to provide us with certain
							personally identifiable information that can be used to contact or
							identify you (&quot;Personal Data&quot;). Personally identifiable
							information may include, but is not limited to:
						</p>
						<ul className="list-disc pl-5 space-y-3">
							{personalDataTypes.map((item, index) => (
								<li key={index}>
									{typeof item === 'string' ? (
										item
									) : (
										<div>
											<p className="font-semibold">{item.title}</p>
											<p className="text-sm sm:text-base">{item.description}</p>
										</div>
									)}
								</li>
							))}
						</ul>

						{dataTypes.map((type, index) => (
							<div key={index} className="mt-8">
								<h3 className="text-xl font-semibold mb-4">{type.title}</h3>
								<div className="space-y-4">
									{type.paragraphs.map((paragraph, pIndex) => (
										<p key={pIndex}>{paragraph}</p>
									))}
									{type.list && (
										<div className="mt-4">
											<h4 className="font-semibold mb-3">{type.listTitle}</h4>
											<ul className="list-disc pl-5 space-y-2">
												{type.list.map((item, lIndex) => (
													<li key={lIndex}>
														<span className="font-semibold">{item.title}</span>{' '}
														{item.description}
													</li>
												))}
											</ul>
										</div>
									)}
								</div>
							</div>
						))}
					</section>

					<section className="mt-12">
						<h2 className="text-2xl font-semibold mb-6">Use of Data</h2>
						<p className="mb-4">
							Holden Knight Group uses the collected data for various purposes:
						</p>
						<ul className="list-disc pl-5 space-y-2">
							{usageList.map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>
					</section>

					<section className="mt-12">
						<h2 className="text-2xl font-semibold mb-6">
							Legal Basis for Processing Personal Data under GDPR
						</h2>
						<p className="mb-4">
							If you are from the European Economic Area (EEA), Holden Knight
							Group legal basis for collecting and using the personal
							information described in this Privacy Policy depends on the
							Personal Data we collect and the specific context in which we
							collect it.
						</p>
						<p className="mb-4">
							Holden Knight Group may process your Personal Data because:
						</p>
						<ul className="list-disc pl-5 space-y-2">
							{legalBasis.map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>
					</section>

					<section className="mt-12">
						<h2 className="text-2xl font-semibold mb-6">
							Your Data Protection Rights Under GDPR
						</h2>
						<ul className="list-disc pl-5 space-y-6">
							{gdprRights.map((right, index) => (
								<li key={index}>
									<div className="font-semibold mb-2">{right.title}</div>
									<div className="text-sm sm:text-base">
										{right.description}
									</div>
								</li>
							))}
						</ul>
					</section>

					<section className="mt-12">
						<h2 className="text-2xl font-semibold mb-6">Disclosure of Data</h2>
						<p className="mb-4">
							Holden Knight Group may disclose your Personal Data in the good
							faith belief that such action is necessary to:
						</p>
						<ul className="list-disc pl-5 space-y-2">
							{disclosureReasons.map((reason, index) => (
								<li key={index}>{reason}</li>
							))}
						</ul>
					</section>

					{sections.map((section, index) => (
						<section key={index} className="mt-12">
							<h2 className="text-2xl font-semibold mb-6">{section.title}</h2>
							{Array.isArray(section.content) ? (
								<div className="space-y-4">
									{section.content.map((paragraph, pIndex) => (
										<p key={pIndex}>{paragraph}</p>
									))}
								</div>
							) : typeof section.content === 'string' ? (
								<p>{section.content}</p>
							) : (
								<div className="space-y-4">
									<p>{section.content.description}</p>
									{section.content.link && (
										<p>
											{section.content.link.text}{' '}
											<a
												href={section.content.link.url}
												className="text-blue-600 hover:underline"
												target="_blank"
												rel="noopener noreferrer"
											>
												{section.content.link.url}
											</a>
										</p>
									)}
								</div>
							)}
						</section>
					))}
				</div>
			</div>
		</div>
	)
}
const definitions = [
	{
		title: 'Service',
		description:
			'Service means the holdenknight.com website and the Holden Knight Group mobile application operated by Holden Knight Group.',
	},
	{
		title: 'Personal Data',
		description:
			'Personal Data means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).',
	},
	{
		title: 'Usage Data',
		description:
			'Usage Data is data collected automatically either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).',
	},
	{
		title: 'Cookies',
		description:
			'Cookies are small files stored on your device (computer or mobile device).',
	},
	{
		title: 'Data Controller',
		description:
			'Data Controller means the natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal information are, or are to be, processed.',
		additional:
			'For the purpose of this Privacy Policy, we are a Data Controller of your Personal Data.',
	},
	{
		title: 'Data Processors (or Service Providers)',
		description:
			'Data Processor (or Service Provider) means any natural or legal person who processes the data on behalf of the Data Controller.',
		additional:
			'We may use the services of various Service Providers in order to process your data more effectively.',
	},
	{
		title: 'Data Subject (or User)',
		description:
			'Data Subject is any living individual who is using our Service and is the subject of Personal Data.',
	},
]

const personalDataTypes = [
	'Email address',
	'First name and last name',
	'Phone number',
	'Address, State, Province, ZIP/Postal code, City',
	{
		title: 'Cookies and Usage Data',
		description:
			'We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or the instructions provided in any email we send.',
	},
]

const dataTypes = [
	{
		title: 'Usage Data',
		paragraphs: [
			'We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device ("Usage Data").',
			"This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.",
			'When you access the Service with a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.',
		],
	},
	{
		title: 'Location Data',
		paragraphs: [
			'We may use and store information about your location if you give us permission to do so ("Location Data"). We use this data to provide features of our Service, to improve and customise our Service.',
			'You can enable or disable location services when you use our Service at any time by way of your device settings.',
		],
	},
	{
		title: 'Tracking & Cookies Data',
		paragraphs: [
			'We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information.',
			'Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyse our Service.',
			'You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.',
		],
		listTitle: 'Examples of Cookies we use:',
		list: [
			{
				title: 'Session Cookies.',
				description: 'We use Session Cookies to operate our Service.',
			},
			{
				title: 'Preference Cookies.',
				description:
					'We use Preference Cookies to remember your preferences and various settings.',
			},
			{
				title: 'Security Cookies.',
				description: 'We use Security Cookies for security purposes.',
			},
		],
	},
]

const usageList = [
	'To provide and maintain our Service',
	'To notify you about changes to our Service',
	'To allow you to participate in interactive features of our Service when you choose to do so',
	'To provide customer support',
	'To gather analysis or valuable information so that we can improve our Service',
	'To monitor the usage of our Service',
	'To detect, prevent and address technical issues',
	'To provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information',
]

const legalBasis = [
	'We need to perform a contract with you',
	'You have given us permission to do so',
	'The processing is in our legitimate interests and it is not overridden by your rights',
	'For payment processing purposes',
	'To comply with the law',
]

const gdprRights = [
	{
		title:
			'The right to access, update or delete the information we have on you.',
		description:
			'Whenever made possible, you can access, update or request deletion of your Personal Data directly within your account settings section. If you are unable to perform these actions yourself, please contact us to assist you.',
	},
	{
		title: 'The right of rectification.',
		description:
			'You have the right to have your information rectified if that information is inaccurate or incomplete.',
	},
	{
		title: 'The right to object.',
		description:
			'You have the right to object to our processing of your Personal Data.',
	},
	{
		title: 'The right of restriction.',
		description:
			'You have the right to request that we restrict the processing of your personal information.',
	},
	{
		title: 'The right to data portability.',
		description:
			'You have the right to be provided with a copy of the information we have on you in a structured, machine-readable and commonly used format.',
	},
	{
		title: 'The right to withdraw consent.',
		description:
			'You also have the right to withdraw your consent at any time where Holden Knight Group relied on your consent to process your personal information.',
	},
]

const disclosureReasons = [
	'To comply with a legal obligation',
	'To protect and defend the rights or property of Holden Knight Group',
	'To prevent or investigate possible wrongdoing in connection with the Service',
	'To protect the personal safety of users of the Service or the public',
	'To protect against legal liability',
]

const sections = [
	{
		title: 'Security of Data',
		content:
			'The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.',
	},
	{
		title:
			'Our Policy on "Do Not Track" Signals under the California Online Protection Act (CalOPPA)',
		content: [
			'We do not support Do Not Track ("DNT"). Do Not Track is a preference you can set in your web browser to inform websites that you do not want to be tracked.',
			'You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser.',
		],
	},
	{
		title: 'Service Providers',
		content: [
			'We may employ third party companies and individuals to facilitate our Service ("Service Providers"), provide the Service on our behalf, perform Service-related services or assist us in analysing how our Service is used.',
			'These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.',
		],
	},
	{
		title: 'Analytics',
		content: {
			service: 'Google Analytics',
			description:
				'Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualise and personalise the ads of its own advertising network.',
			link: {
				text: 'For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page:',
				url: 'https://policies.google.com/privacy?hl=en',
			},
		},
	},
	{
		title: 'Links to Other Sites',
		content: [
			"Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.",
			'We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.',
		],
	},
	{
		title: "Children's Privacy",
		content: [
			'Our Service does not address anyone under the age of 18 ("Children").',
			'We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.',
		],
	},
	{
		title: 'Changes to This Privacy Policy',
		content: [
			'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.',
			'We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.',
			'You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.',
		],
	},
]
