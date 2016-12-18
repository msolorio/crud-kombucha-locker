const Kombuchas = {

	loadElements() {
		this.kombuchaList = document.getElementById('js-kombuchaList');

		// add form elements
		this.buttonAdd = document.getElementById('js-button-add');
		this.nameAdd = document.getElementById('js-name-add');
		this.typeAdd = document.getElementById('js-type-add');
		this.quantityAdd = document.getElementById('js-quantity-add');

		// update form elements
		this.buttonUpdate = document.getElementById('js-button-update');
		this.nameUpdate = document.getElementById('js-name-update');
		this.typeUpdate = document.getElementById('js-type-update');
		this.quantityUpdate = document.getElementById('js-quantity-update');

		// delete form elements
		this.buttonDelete = document.getElementById('js-button-delete');
		this.nameDelete = document.getElementById('js-name-delete');

		this.kombuchaEntries = document.getElementsByClassName('kombuchaEntry');
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
			kombuchaEl.dataset.entryname = response[i].name;
			kombuchaName.className = 'kombuchaProp kombuchaName';
			kombuchaType.className = 'kombuchaProp kombuchaType';
			kombuchaQuantity.className = 'kombuchaProp kombuchaQuantity';

			// add id to entry
			kombuchaEl.id = response[i]._id;

			kombuchaEl.appendChild(kombuchaName);
			kombuchaEl.appendChild(kombuchaType);
			kombuchaEl.appendChild(kombuchaQuantity);
			kombuchaFragment.appendChild(kombuchaEl);
		}
		this.kombuchaList.innerHTML = "";
		this.kombuchaList.appendChild(kombuchaFragment);
	},

	addKombucha() {
		console.log('in addKombucha()');
		const nameAddVal = this.nameAdd.value;
		const typeAddVal = this.typeAdd.value;
		const quantityAddVal = this.quantityAdd.value;

		const params = `name=${nameAddVal}&type=${typeAddVal}&quantity=${quantityAddVal}`;

		const xhr = new XMLHttpRequest();

		const processRequest = () => {
			console.log('in processRequest()');
			if (xhr.readyState === 4 && xhr.status === 200) {
				// parse the string repsonse text into json
				const response = JSON.parse(xhr.responseText);

				// create elements
				const kombuchaEl = document.createElement('div');
				const kombuchaName = document.createElement('h3');
				const kombuchaType = document.createElement('p');
				const kombuchaQuantity = document.createElement('p');

				// add text
				kombuchaName.appendChild( document.createTextNode(response.data.name) );
				kombuchaType.appendChild( document.createTextNode(`Type: ${response.data.type}`) );
				kombuchaQuantity.appendChild( document.createTextNode(`Quantity: ${response.data.quantity}`) );

				// add classes
				kombuchaEl.className = 'kombuchaEntry';
				kombuchaEl.dataset.entryname = response.data.name;
				kombuchaName.className = 'kombuchaProp kombuchaName';
				kombuchaType.className = 'kombuchaProp kombuchaType';
				kombuchaQuantity.className = 'kombuchaProp kombuchaQuantity';

				// add id to entry
				kombuchaEl.id = response.data._id;

				kombuchaEl.appendChild(kombuchaName);
				kombuchaEl.appendChild(kombuchaType);
				kombuchaEl.appendChild(kombuchaQuantity);
				this.kombuchaList.appendChild(kombuchaEl);

				this.nameAdd.value = "";
				this.typeAdd.value = "";
				this.quantityAdd.value = "";
			}
		};

		xhr.open('POST', '/api/kombuchas/', true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(params);
		xhr.onreadystatechange = processRequest;
	},

	updateKombucha() {
		console.log('in updateKombucha()');
		const buttonupdate = this.buttonUpdate;
		const nameUpdateVal = this.nameUpdate.value;
		const typeUpdateVal = this.typeUpdate.value;
		const quantityUpdateVal = this.quantityUpdate.value;
		const kombuchaEntries = this.kombuchaEntries;
		let idToUpdate;
		let kombuchaType;
		let kombuchaQuantity;

		for (let i=0, j=kombuchaEntries.length; i<j; i++) {
				let entryName = kombuchaEntries[i].dataset.entryname;
				if (nameUpdateVal === entryName) {
					idToUpdate = kombuchaEntries[i].id;
					console.log('idToUpdate:', idToUpdate);
					kombuchaType = kombuchaEntries[i].querySelector('.kombuchaType');
					kombuchaQuantity = kombuchaEntries[i].querySelector('.kombuchaQuantity');
					break;
				}
			}

		const updateDom = () => {
			console.log('in updateDom');
			kombuchaType.innerHTML = `Type: ${typeUpdateVal}`;
			kombuchaQuantity.innerHTML = `Quantity: ${quantityUpdateVal}`;
			this.nameUpdate.value = "";
			this.typeUpdate.value = "";
			this.quantityUpdate.value = "";
		}

		const updateMongo = () => {
			const params = `name=${nameUpdateVal}&type=${typeUpdateVal}&quantity=${quantityUpdateVal}`;

			const xhr = new XMLHttpRequest();
			const processRequest = () => {
				if (xhr.readyState === 4 && xhr.status === 200) {
					console.log('put request was successful');
					updateDom();
				}
			}
			xhr.open('PUT', `/api/kombuchas/${idToUpdate}`);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(params);
			xhr.onreadystatechange = processRequest;
		}

		updateMongo();
	},

	deleteKombucha() {
		console.log('in deleteKombucha')
		const nameDeleteVal = this.nameDelete.value;
		const kombuchaEntries = this.kombuchaEntries;
		let entryToRemove;
		let idToDelete;

		for (let i=0, j=kombuchaEntries.length; i<j; i++) {
				let entryName = kombuchaEntries[i].dataset.entryname;
				if (nameDeleteVal === entryName) {
					entryToRemove = kombuchaEntries[i];
					idToDelete = entryToRemove.id;
					break;
				}
			}

		const removeFromDom = () => {
			entryToRemove.parentNode.removeChild(entryToRemove);
			this.nameDelete.value = "";
		}

		const removeFromMongo = () => {
			const xhr = new XMLHttpRequest();
			const processRequest = () => {
				if (xhr.readyState === 4 && xhr.status === 200) {
					console.log('delete request was processed');
					removeFromDom();
				}
			}
			xhr.open('DELETE', `/api/kombuchas/${idToDelete}`, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send();
			xhr.onreadystatechange = processRequest;
		}

		removeFromMongo();
	},

	addListeners() {
		this.buttonAdd.addEventListener('click', this.addKombucha.bind(this));
		this.buttonUpdate.addEventListener('click', this.updateKombucha.bind(this));
		this.buttonDelete.addEventListener('click', this.deleteKombucha.bind(this));
	},

	init() {
		this.loadElements();
		this.loadKombuchas();
		this.addListeners();
	}
}

window.Kombuchas = Kombuchas;
Kombuchas.init();
