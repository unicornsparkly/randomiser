import 'whatwg-fetch';

const url = 'https://icanhazdadjoke.com/'

const options = {
	headers: {
		Accept: 'application/json'
	}
};

export default () => (
	fetch(url, options).then(response => {
		return response.json();
	}).then(json => {
		return json.joke
	})
)
