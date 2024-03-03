/*--------------------------------------------------------------
  Auto Year
--------------------------------------------------------------*/
document.getElementById("year").innerHTML = (new Date().getFullYear());

/*--------------------------------------------------------------
	Languages
--------------------------------------------------------------*/
const language = {
	'enGb': {
		'countryEnglish': 'Great Britain',
		'countryNative': 'Great Britain',
		'languageEnglish': 'English',
		'code': 'en-GB',
		'currency': 'GBP',
		'symbol': '£',
		'title': 'Product Calculator',
	},
	'enCh': {
		'countryEnglish': 'Switzerland',
		'countryNative': 'Schweiz',
		'languageEnglish': 'English',
		'code': 'en-CH',
		'currency': 'CHF',
		'symbol': 'CHF',
		'title': 'Product Calculator',
	},
	'deCh': {
		'countryEnglish': 'Switzerland',
		'countryNative': 'Schweiz',
		'languageEnglish': 'German',
		'code': 'de-CH',
		'currency': 'CHF',
		'symbol': 'CHF',
		'title': 'Produktrechner',
	},
	'fr': {
		'countryEnglish': 'France',
		'countryNative': 'La France',
		'languageEnglish': 'French',
		'code': 'fr-FR',
		'currency': 'EUR',
		'symbol': '€',
		'title': 'Calculateur de produits',
	},
	'de': {
		'countryEnglish': 'Germany',
		'countryNative': 'Deutschland',
		'languageEnglish': 'German',
		'code': 'de-DE',
		'currency': 'EUR',
		'symbol': '€',
		'title': 'Produktrechner',
	},
	'es': {
		'countryEnglish': 'Spain',
		'countryNative': 'Espa&ntilde;a',
		'languageEnglish': 'Spanish',
		'code': 'es-ES',
		'currency': 'EUR',
		'symbol': '€',
		'title': 'Calculadora de productos',
	},
	'it': {
		'countryEnglish': 'Italy',
		'countryNative': 'Italia',
		'languageEnglish': 'Italian',
		'code': 'it-IT',
		'currency': 'EUR',
		'symbol': '€',
		'title': 'Calcolatore del prodotto'
	},
};


/*--------------------------------------------------------------
	Create page elements
--------------------------------------------------------------*/
const template = document.createElement('template');
const container = document.querySelector('.lang-cur-selector__container > ul');

for (const [key, value] of Object.entries(language)) {
  template.innerHTML = `
    <li class="${key}">
			<span class="currency__flag">
				<picture>
					<img src="assets/img/flags/flag__${value.code}.svg" alt="">
				</picture>
			</span>
			<span class="currency__icon">${value.symbol}</span>
			<span class="currency__text">${value.languageEnglish}</span>
		</li>
  `;
    container.appendChild(template.content);
}


/*--------------------------------------------------------------
	Globals
--------------------------------------------------------------*/
var lancurMain = document.querySelector('.lang-cur-selector'),
		langcurOption = document.querySelectorAll('.lang-cur-selector__container > ul > li');


/*--------------------------------------------------------------
	Check for currency and language selection
--------------------------------------------------------------*/
const currency = localStorage.getItem('setCurrency');

if (!currency) {
	console.log('Language and Currency have not been set');
	document.getElementById('title').innerHTML = language.enGb.title;
	lancurMain.classList.add('active');
	lancurMain.classList.remove('inactive');
} else {
	lancurMain.classList.remove('active');
	lancurMain.classList.add('inactive');
}

/*--------------------------------------------------------------
	Currency and language selection
--------------------------------------------------------------*/
[].forEach.call(langcurOption, el => {
	el.addEventListener('click', function () {

		[].forEach.call(langcurOption, el => {
			if (el !== this) el.classList.remove('active');
		});

		this.classList.add('active');

		for (const [country, object] of Object.entries(language)) {
			if (this.classList.contains(country)) {
				localStorage.setItem('setCurrency', JSON.stringify(object));
				lancurMain.classList.remove('active');
				lancurMain.classList.add('inactive');
			}
		}
		
	});
});


