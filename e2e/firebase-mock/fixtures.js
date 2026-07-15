// Fixture data for E2E mode. Shapes mirror the real Firestore documents the
// components read. Only used when VITE_E2E=true (see vite.config.js alias).

const courseContentBlock = (label) => ({
	content_title: `Vad du lär dig på ${label}`,
	content_list: ['Teknik och form', 'Progressioner', 'Skadeförebyggande'],
	content_text: `På ${label} bygger vi din styrka steg för steg.`,
	content_title2: 'För vem passar kursen?',
	content_list2: ['Nybörjare', 'Van utövare'],
	content_text2: 'Alla nivåer är välkomna – vi möter dig där du är.',
	content_title3: 'Upplägg',
	content_list3: ['13 tillfällen', 'En termin'],
	content_text3: 'Vi träffas en gång i veckan under hela terminen.'
});

const table = (headers, rows) => ({
	headers,
	rows: rows.map((cols) => ({
		columns: cols.map((c) =>
			typeof c === 'string' ? { type: 'text', text: c } : c
		)
	}))
});

export const kurserData = {
	open_gym: {
		title: 'Open Gym',
		title2: 'Träna fritt – tillsammans',
		texts: [
			'Open gym är till för dig som vill ta din träning i egna händer.',
			'Du tränar i din egen takt med tillgång till all utrustning och stöd från oss.'
		],
		tables: [
			table(['Tid', 'Plats'], [['Måndagar 18:00', 'Gymnastikens hus']]), // index 0 - openGym
			table(['Pass', 'Dag'], [['Muscle up', 'Tisdagar']]), // index 1 - muscle_up
			table(['—', '—'], []), // index 2 - unused
			table(['Pass', 'Dag'], [['Grundkurs', 'Torsdagar']]) // index 3 - grund_kurs
		]
	},
	muscle_up: {
		title: 'Muscle up kursen',
		title2: 'Lär dig din första muscle up',
		...courseContentBlock('muscle up kursen')
	},
	grund_kurs: {
		title: 'Calisthenics grundkurs',
		title2: 'Bygg en stark grund',
		...courseContentBlock('grundkursen')
	}
};

export const evenemangDocs = [
	{
		id: 'evt-1',
		title: 'SWAG-mästerskapet',
		date: '2025-09-13',
		shortText: 'Vår årliga tävling i street workout.',
		text: 'En heldag med tävlingar, gemenskap och träningsglädje för alla nivåer.'
	}
];

export const membersDocs = [
	{
		id: 'mem-1',
		fName: 'Test',
		lName: 'Testsson',
		birth: '199001011234',
		email: 'test@example.com',
		adress: 'Testgatan 1',
		postNr: '41100',
		phoneNr: '0700000000',
		student: false,
		message: ''
	}
];

// Storage folders -> image URLs (use existing static assets so they render)
export const storageFolders = {
	startsida_carusel: ['/img/L5.jpg', '/img/L9.jpg', '/img/L19.jpg', '/img/Gruppbild-min.webp'],
	evenemang: []
};
