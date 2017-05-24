export default {
	install(vue) {
		vue.prototype.$formatJson = function(file) {
			var result = [];
			var keyNames = [];
			file.forEach((element, index) => {
				if (index == 0) {
					keyNames = element;
					console.log(keyNames);
				} else {
					var obj = {};
					element.forEach((entry, index2) => {
						let prop = keyNames[index2].toLowerCase().replace(" ", "");
						obj[prop] = entry;
					});
					result.push(obj)
				}
			});
			return result;
		};

		/**
		 * [$filterData filters given data with one or more criteria]
		 * @param  {Array}   data   [the data you want to filter]
		 * @param  {...Object} filter [filter object with 
		 * property prop as for property you want to filter and min and max ranges
		 * for numbers and property value for string fields]
		 * @return {Array}[returns filtered data]
		 */
		vue.prototype.$filterData = function(data,filter) {
			return data.filter((entry, indexEn) => {
				let toKeep = false;
				filter.forEach(function(filterElement, index) {
					let value = entry[filterElement.prop];
					let number = parseInt(value);
					if (!isNaN(number)) {
						value = number;
						if (filterElement.min && filterElement.max)
							toKeep = value > filterElement.min && value < filterElement.max;
						if (filterElement.min && !filterElement.max)
							toKeep = value > filterElement.min;
						if (filterElement.max && !filterElement.min)
							toKeep = value < filterElement.max;
					} else {
						toKeep = value === filterElement.value;
					}
					if (!toKeep) return;
				});
				return toKeep;
			});
		};

	}
}