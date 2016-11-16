let actions = {

		addToDo: function(text) {
				return {
						type: 'ADD_TODO',
						text: text
				}
		}

}

export default actions;