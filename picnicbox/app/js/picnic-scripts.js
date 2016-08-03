// The Picnic Box Group landing page
angular.module('PicnicBoxApp', [])
  .controller('instaFeed', ['$scope', '$http', function instaFeed($scope, $http) {

    const instaUrl = 'https://api.instagram.com/v1/users/self/media/recent?access_token=5161271.a38db20.ce31784768d94875a91d2c8efbbe7408';

    $scope.instaResponse = [];

    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: instaUrl,
      success: function(res) {
        
      	var
      		data = res.data,
      		dataCount = data.length;

    		$(data).each(function(idx, ele) {
    			var	instaItem = {
    				imgUrl: ele.images.standard_resolution.url,
    				link: ele.link
    			}
    			if (ele.hasOwnProperty('caption') && ele.caption !== null) {
    				instaItem.caption = ele.caption.text;
    			}
    			console.info(instaItem);
    			$scope.instaResponse.push(instaItem);
    		});

    		console.info($scope.instaResponse.length);
      },
      error: function(err) {
        console.error(err);
      }
    });

  }]);
