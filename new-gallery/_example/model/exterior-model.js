define('models/range-model','main',['jquery','underscore','Backbone','router'], function($,_,Backbone,Router){
	var range;
	range = Backbone.Model.extend({
		initialize = function(range){
			// Router.initialize();
			var _this = this,
					range = 'AU6';
			return $.getJSON(window.range_url + range+'.json', function(data){
				var parsed = _this.parse(data,range);				
				return _this.set(parsed);
			});
		},
		parse = function(response,range){
			var body_styles, result,
					_this = this;
			result = {
				id: Number(response.id),
				range: response.rangecode,
				body_styles: [],
				colours: [],
				name: response.name
			};
			_.each(response.body_styles, function(src_body,idx)){
				src_body = new 
				return _.each(src_body.grades, function(src_grade){
					var grade,						
							hash = [(src_grade.code, src_body.id];

					grade = {
						code: src_grade.code,
						hash: hash.join('-'),
						grade_name: src_grade.name,
						grade_body: src_body,
						grade_order: src_grade.order,
						grade_price: src_grade.price,
						grade_spec: src_grade.mdata[0], // 0 can be changed for condensed etc 

					}
				})
			}
		}
	});
	return range;
});