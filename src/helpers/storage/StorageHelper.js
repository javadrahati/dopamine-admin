
export default {
	getItem: localStorage.getItem,
	setItem: localStorage.setItem,
	get: (key) => {
		try {
			return JSON.parse( localStorage.getItem(key) )
		} catch (e) {
			return null
		}
	},
	set: (key, obj) => {
		localStorage.setItem(key, JSON.stringify(obj))
	},
}
