const KombuchasForm = {

	dom: {},

	loadElements() {
		this.dom.kombuchaList = document.getElementById('js-kombuchaList');
		this.dom.buttonAdd = document.getElementById('js-button-add');
		this.dom.buttonUpdate = document.getElementById('js-button-update');
		this.dom.buttonDelete = document.getElementById('js-button-delete');
	},

	loadKombuchas() {
		console.log('entered loadKombuchas()');
		const xhr = new XMLHttpRequest;
		const processRequest = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				const response = JSON.parse(xhr.responseText);
				this.printKombuchas(response);
			}
		}

		xhr.open('GET', '/api/kombuchas/', true);
		xhr.send();

		xhr.onreadystatechange = processRequest;
	},

	printKombuchas(response) {
		const kombuchaFragment = document.createDocumentFragment();

		for (let i=0, j=response.length; i<j; i++) {

			// create elements
			const kombuchaEl = document.createElement('div');
			const kombuchaName = document.createElement('h3');
			const kombuchaType = document.createElement('p');
			const kombuchaQuantity = document.createElement('p');

			// add text
			kombuchaName.appendChild( document.createTextNode(response[i].name) );
			kombuchaType.appendChild( document.createTextNode(`Type: ${response[i].type}`) );
			kombuchaQuantity.appendChild( document.createTextNode(`Quantity: ${response[i].quantity}`) );

			// add classes
			kombuchaEl.className = 'kombuchaEntry';
			kombuchaName.className = 'kombuchaProp kombuchaName';
			kombuchaType.className = 'kombuchaProp kombuchaType';
			kombuchaQuantity.className = 'kombuchaProp kombuchaQuantity';

			//
			kombuchaEl.appendChild(kombuchaName);
			kombuchaEl.appendChild(kombuchaType);
			kombuchaEl.appendChild(kombuchaQuantity);

			kombuchaFragment.appendChild(kombuchaEl);
		}
		this.dom.kombuchaList.appendChild(kombuchaFragment);
	},

	addKombucha() {
		console.log('in addKombucha()');
	},

	updateKombucha() {
		console.log('in updateKombucha()');
	},

	deleteKombuchas() {
		console.log('in deleteKombuchas()');
	},

	init() {
		this.loadElements();
		this.loadKombuchas();
	}
}

window.KombuchasForm = KombuchasForm;
KombuchasForm.init();
