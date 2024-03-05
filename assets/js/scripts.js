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
	Handle font resize
--------------------------------------------------------------*/
function fontResize() {
	var appWidth = document.querySelector('.app').offsetWidth;
	document.documentElement.style.fontSize = appWidth / 100 + 'px';
}

fontResize();

window.addEventListener("resize", (event) => {
	fontResize();
});

/*--------------------------------------------------------------
	Create language selector page
--------------------------------------------------------------*/
const template = document.createElement('template');
const container = document.querySelector('.langcur-selector__container > ul');

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
var htmlTitle = document.getElementById('title'),
		lancurMain = document.querySelector('.langcur-selector'),
		langcurOption = document.querySelectorAll('.langcur-selector__container > ul > li'),
		calculator = document.getElementById('calculator'),
		headerTitle = document.querySelector('#header-title'),
		headerButton = document.querySelector('#lang-change'),
		transition = 'all 500ms linear';

/*--------------------------------------------------------------
	Check for currency and language selection
--------------------------------------------------------------*/
const currency = localStorage.getItem('setCurrency');

if (!currency) {
	console.log('Language and Currency have not been set');
	htmlTitle.innerHTML = language.enGb.title;
	lancurMain.style.transform = 'translate(0, 0)';
	calculator.style.transform = 'translate(100vw, 0)';
} else {
	lancurMain.style.transform = 'translate(-100vw, 0)';
	calculator.style.transform = 'translate(0, 0)';
	htmlTitle.innerHTML = JSON.parse(currency).title;
	headerTitle.innerHTML = JSON.parse(currency).title;
	headerButton.innerHTML = `<span class="currency__flag"><picture><img src="assets/img/flags/flag__${JSON.parse(currency).code}.svg" alt=""></picture></span><span class="currency__icon">${JSON.parse(currency).symbol}</span>`;
}

headerButton.addEventListener('click', function() {
	lancurMain.style.transform = 'translate(0, 0)';
	calculator.style.transform = 'translate(100vw, 0)';
	lancurMain.style.transition= transition;
	calculator.style.transition= transition;
});


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
				lancurMain.style.transform = 'translate(-100vw, 0)';
				calculator.style.transform = 'translate(0, 0)';
				lancurMain.style.transition= transition;
				calculator.style.transition= transition;

				reloadP();
				
			}
		}
		
	});
});


/*--------------------------------------------------------------
	Calculate
--------------------------------------------------------------*/

	/* Variables
	================================================= */
	var buttonReset = document.getElementById('reset-button'),
		buttonCalc = document.getElementById('calculate-button'),
		currentProductOpTime = document.getElementById('current__op-time'),
		newProductOpTime = document.getElementById('new__op-time'),
		// percent
		newProductOpPercent = document.getElementById('new__op-percent'),
		// annual product cost
		annualOtherProductCost = document.getElementById('current__annual-product'),
		annualNewProductProductCost = document.getElementById('new__annual-product'),
		// annual operating cost
		annualOtherOpCost = document.getElementById('current__annual-op'),
		annualNewProductOpCost = document.getElementById('new__annual-op'),
		// totals
		currentProductTotal = document.getElementById('current__total'),
		newProductTotal = document.getElementById('new__total'),
		// net financial
		netFinancial = document.getElementById('net-financial');


	/* Calculating ProGrip Percentage
	================================================= */
	function percentageCurrentProduct() {
		var currentProductOperatingTime = document.getElementById('current__op-time').value,
			newProductOperatingTime = document.getElementById('new__op-time').value,
			newProductOpPercent = document.getElementById('new__op-percent'),
			//
			newProductOpTime = 0.17 * Number(currentProductOperatingTime),
			newProductPercent = 0.17 * 100,
			newProductMinus = Math.round(Number(currentProductOperatingTime) - newProductOpTime);;

		// Client wants the caculation to autocalcuate 17%.
		newProductOpPercent.innerHTML = '( -' + newProductPercent + '%' + ')';
		document.getElementById('new__op-time').value = newProductMinus; // adds to HTML

	}

	function percentageProGrip() {
		var currentProductOperatingTime = document.getElementById('current__op-time').value,
			newProductOperatingTime = document.getElementById('new__op-time').value,
			newProductOpPercent = document.getElementById('new__op-percent');

		// Maths
		// ( (stating value - final value) / starting value ) * 100

		if ((Number(currentProductOperatingTime)) > (Number(newProductOperatingTime))) {

			var calc = ((currentProductOperatingTime - newProductOperatingTime) / currentProductOperatingTime) * 100;
			newProductOpPercent.innerHTML = '( -' + Math.round(calc) + '%' + ')';
		} else if ((Number(currentProductOperatingTime)) < (Number(newProductOperatingTime))) {
			var calc = ((currentProductOperatingTime - newProductOperatingTime) / currentProductOperatingTime) * 100;
			newProductOpPercent.innerHTML = '(' + Math.round(calc) + '%' + ')';
		}

	}



	/* Total : Other Annual Product
	================================================= */
	var annualOtherProductCostTotal;

	function currentProductAnnualProductCost() {
		var annualProcedures = document.getElementById('annual-procedure').value, currentProductProductCost = document.getElementById('current__product-cost').value;

		annualOtherProductCostTotal = Number(annualProcedures) * Number(currentProductProductCost);

		let storageString = localStorage.getItem('setCurrency');
		let savedCurrency = JSON.parse(storageString);

		if (localStorage.getItem('setCurrency') === null) {
		} else {
			var currency = new Intl.NumberFormat(savedCurrency.code, {
				currency: savedCurrency.currency, maximumSignificantDigits: 3, useGrouping: true
			});

			annualOtherProductCost.innerHTML = currency.format(annualOtherProductCostTotal);
		}

	}


	/* Total : Other Annual Operating
	================================================= */
	var annualOtherOpCostTotal;

	function currentProductAnnualOperatingCost() {
		var annualProcedures = document.getElementById('annual-procedure').value,
			currentProductOperatingTime = document.getElementById('current__op-time').value,
			totalCostPerMin = document.getElementById('current__total-cost-or').value;

		annualOtherOpCostTotal = Number(annualProcedures) * Number(currentProductOperatingTime) * Number(totalCostPerMin);

		let storageString = localStorage.getItem('setCurrency');
		let savedCurrency = JSON.parse(storageString);

		if (localStorage.getItem('setCurrency') === null) {
		} else {
			var currency = new Intl.NumberFormat(savedCurrency.code, {
				currency: savedCurrency.currency, maximumSignificantDigits: 3, useGrouping: true
			});

			annualOtherOpCost.innerHTML = currency.format(annualOtherOpCostTotal);
		}

	}


	/* Total : Other
	================================================= */
	function currentProductTotalTotal() {
		columnOneTotal = Number(annualOtherProductCostTotal) + Number(annualOtherOpCostTotal);

		let storageString = localStorage.getItem('setCurrency');
		let savedCurrency = JSON.parse(storageString);

		if (localStorage.getItem('setCurrency') === null) {
		} else {
			var currency = new Intl.NumberFormat(savedCurrency.code, {
				currency: savedCurrency.currency, maximumSignificantDigits: 3, useGrouping: true
			});

			currentProductTotal.innerHTML = currency.format(columnOneTotal);
		}

	}


	/* Total : ProGrip Product
	================================================= */
	var annualNewProductProductCostTotal;

	function newProductAnnualProductCost() {
		var annualProcedures = document.getElementById('annual-procedure').value, newProductProductCost = document.getElementById('new__product-cost').value;

		annualNewProductProductCostTotal = Number(annualProcedures) * Number(newProductProductCost);

		let storageString = localStorage.getItem('setCurrency');
		let savedCurrency = JSON.parse(storageString);

		if (localStorage.getItem('setCurrency') === null) {
		} else {
			var currency = new Intl.NumberFormat(savedCurrency.code, {
				currency: savedCurrency.currency, maximumSignificantDigits: 3, useGrouping: true
			});

			annualNewProductProductCost.innerHTML = currency.format(annualNewProductProductCostTotal);
		}

	}


	/* Total : ProGrip Operating
	================================================= */
	var annualNewProductOpCostTotal;
	
	function newProductAnnualOperatingCost() {
		var annualProcedures = document.getElementById('annual-procedure').value,
			newProductOperatingTime = document.getElementById('new__op-time').value,
			totalCostPerMin = document.getElementById('current__total-cost-or').value;

		annualNewProductOpCostTotal = Number(annualProcedures) * Number(newProductOperatingTime) * Number(totalCostPerMin);

		let storageString = localStorage.getItem('setCurrency');
		let savedCurrency = JSON.parse(storageString);

		if (localStorage.getItem('setCurrency') === null) {
		} else {
			var currency = new Intl.NumberFormat(savedCurrency.code, {
				currency: savedCurrency.currency, maximumSignificantDigits: 3, useGrouping: true
			});

			annualNewProductOpCost.innerHTML = currency.format(annualNewProductOpCostTotal);
		}

	}


	/* Total : ProGrip
	================================================= */
	function newProductTotalTotal() {
		columnTwoTotal = Number(annualNewProductProductCostTotal) + Number(annualNewProductOpCostTotal);

		let storageString = localStorage.getItem('setCurrency');
		let savedCurrency = JSON.parse(storageString);

		if (localStorage.getItem('setCurrency') === null) {
		} else {
			var currency = new Intl.NumberFormat(savedCurrency.code, {
				currency: savedCurrency.currency, maximumSignificantDigits: 3, useGrouping: true
			});

			newProductTotal.innerHTML = currency.format(columnTwoTotal);
		}

	}


	/* Function : OnInput : Annual Procedures
	================================================== */
	// var annualProcedures = document.getElementById('annual-procedure').value;

	document.getElementById('annual-procedure').oninput = function () {
		// annual product total
		currentProductAnnualProductCost();
		newProductAnnualProductCost();
		// annual operating total
		currentProductAnnualOperatingCost();
		newProductAnnualOperatingCost();

		resetNetFinancial();
		save_data();
	}


	/* Function : OnInput : Current Operating Time
	================================================== */
	document.getElementById('current__op-time').oninput = function () {
		// percentage
		percentageCurrentProduct();
		// annual product total
		currentProductAnnualProductCost();
		newProductAnnualProductCost();
		// annual operating total
		currentProductAnnualOperatingCost();
		newProductAnnualOperatingCost();

		resetNetFinancial();
		save_data();
	};


	/* Function : OnInput : ProGrip Operating Time
	================================================== */
	document.getElementById('new__op-time').oninput = function () {
		// percentage
		percentageProGrip();
		// annual product total
		currentProductAnnualProductCost();
		newProductAnnualProductCost();
		// annual operating total
		currentProductAnnualOperatingCost();
		newProductAnnualOperatingCost();

		resetNetFinancial();
		save_data();
	};


	/* Function : OnInput : Total cost OR per Min
	================================================== */
	document.getElementById('current__total-cost-or').oninput = function () {
		// annual product total
		currentProductAnnualProductCost();
		newProductAnnualProductCost();
		// annual operating total
		currentProductAnnualOperatingCost();
		newProductAnnualOperatingCost();

		resetNetFinancial();
		save_data();
	}


	/* Function : OnInput : Other - Product Cost
	================================================== */
	document.getElementById('current__product-cost').oninput = function () {
		// annual product total
		currentProductAnnualProductCost();
		newProductAnnualProductCost();
		// annual operating total
		currentProductAnnualOperatingCost();
		newProductAnnualOperatingCost();

		currentProductTotalTotal();

		resetNetFinancial();
		save_data();
	}


	/* Function : OnInput : NewProduct - Product Cost
	================================================== */
	document.getElementById('new__product-cost').oninput = function () {
		// annual product total
		currentProductAnnualProductCost();
		newProductAnnualProductCost();
		// annual operating total
		currentProductAnnualOperatingCost();
		newProductAnnualOperatingCost();

		newProductTotalTotal();

		resetNetFinancial();
		save_data();
	}


	/* Function : Calculate
	================================================== */
	function calculate() {
		if (localStorage.getItem('setCurrency') === null) {
			// alert('Language and Currency have not been set');
		} else {
			// LocalStorage
			let storageString = localStorage.getItem('setCurrency');
			let savedCurrency = JSON.parse(storageString);

			var currency = new Intl.NumberFormat(savedCurrency.code, { style: 'currency', currency: savedCurrency.currency, maximumSignificantDigits: 3, useGrouping: true });

			netFinancialDifference = Number(columnOneTotal) - Number(columnTwoTotal);

			netTotal = netFinancial.innerHTML = currency.format(netFinancialDifference);

			// Total
			if (newProductTotal.innerHTML < currentProductTotal.innerHTML) {
				netFinancial.innerHTML = '+ ' + netTotal;
			} else if (newProductTotal.innerHTML > currentProductTotal.innerHTML) {
				netFinancial.innerHTML = netTotal;
			}
		}

	}


	/* Save Input Values in LocalStorage
	================================================== */
	function save_data() {
		let fields = document.querySelectorAll("input[type='number']");
		let saved_fields = [];
		fields.forEach(x => {
			saved_fields.push({
				key: x.id,
				value: x.value
			})
		})
		localStorage.setItem("saved_data", JSON.stringify(saved_fields))
	}

	function show_saved_data() {
		if (localStorage.getItem('saved_data') === null) {
			console.log('No saved data');
		} else {
			console.log('saved data found');
			JSON.parse(localStorage.getItem("saved_data")).forEach(x => {
				document.getElementById(x.key).value = x.value;
			});
		}
	}

	function loadAllFunctions() {
		// Is there any saved data?
		show_saved_data();

		// Operating Time percentage for ProGrip
		// percentageCurrentProduct();
		percentageProGrip();

		// Annual Product Cost - Other
		currentProductAnnualProductCost();

		// Annual Operating Cost - Other
		currentProductAnnualOperatingCost();

		// Final Total for Other
		currentProductTotalTotal();

		// Annual Product Cost - NewProduct
		newProductAnnualProductCost();

		// Annual Operating Cost - NewProduct
		newProductAnnualOperatingCost();

		// Final Total for NewProduct
		newProductTotalTotal();

		// Don't let the Net Financial Bar stay emptys
		calculate();
	}


	/* Function : Empty for Nah?
	================================================== */
	function emptyOrNah() {
		var input = document.getElementsByTagName("input"),
			warning = document.querySelector('.calculator__warning');
		for (var i = 0; i < input.length; i++) {
			if (input[i].value == '') {
				input[i].classList.add('empty');
				warning.classList.add('empty');
			} else if (input[i].value > '') {
				input[i].classList.remove('empty');
				warning.classList.remove('empty');
			}
		}
	}


	/* Because page refreshes when "calculate" pressed, need a way to let emptyOrNah work
	================================================== */
	function reloadEmptyOrNah() {
		emptyOrNah();
	}

	window.addEventListener('load', function() {
		loadAllFunctions();
		var reloading = sessionStorage.getItem("reloading");
	
		if (reloading) {
			sessionStorage.removeItem("reloading");
			reloadEmptyOrNah();
		}
	})
	
	function reloadP() {
		sessionStorage.setItem("reloading", "true");
		document.location.reload();
	}


	/* Function : Reset
	================================================== */
	function reset() {
		var input = document.querySelectorAll('.input');

		for (var i = 0; i < input.length; i++) {
			input[i].value = "";
		}

		currentProductOpTime.value = 53;
		newProductOpTime.value = 44;
		newProductOpPercent.innerHTML = '';
		annualOtherProductCost.innerHTML = '';
		annualOtherOpCost.innerHTML = '';
		annualNewProductProductCost.innerHTML = '';
		annualNewProductOpCost.innerHTML = '';
		currentProductTotal.innerHTML = '';
		newProductTotal.innerHTML = '';
		netFinancial.innerHTML = '----';
	}

	function resetNetFinancial() {
		netFinancial.innerHTML = '----';
	}



	/* OnClick
	================================================== */
	buttonCalc.onclick = function () {
		if (localStorage.getItem('setCurrency') === null) {
			alert('Language and Currency have not been set');
		}

		emptyOrNah();
		calculate();
		reloadP();
	}

	window.addEventListener("keyup", function (event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			buttonCalc.click();
		}
	});

	buttonReset.onclick = function () {
		reset();
		percentageProGrip();

		localStorage.removeItem('saved_data');

		var input = document.getElementsByTagName("input");
		for (var i = 0; i < input.length; i++) {
			if (input[i].value == '') {
				input[i].classList.remove('empty');
			}
		}
	}

	/* onInput
	================================================== */
	const input = document.getElementsByTagName("input");

	const inputHandler = function () {
		emptyOrNah();
	}

	for (i = 0; i < input.length; i++) {
		input[i].addEventListener('input', inputHandler);
	}
