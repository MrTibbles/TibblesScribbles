// The Picnic Box Group landing page
angular.module('PicnicBoxApp', [])
  .controller('instaFeed', ['$scope', '$http', function instaFeed($scope, $http) {

    const instaUrl = 'https://api.instagram.com/v1/users/self/media/recent?access_token=3534812594.8b53de6.43efce3bd9214f5b85fb55c5a5d90cca&count=3';

    $scope.instaResponses = [];
    // ng-repeat being super weird    

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
            $('.insta-feed').prepend('<img src="' + instaItem.imgUrl + '" alt="' + instaItem.caption + '" class="insta-img" /><p class="insta-caption">' + instaItem.caption + '</p><a href="' + instaItem.link + '" target="_blank" class="insta-link">view on instagram</a>');
    			} else {
            $('.insta-feed').prepend('<img src="' + instaItem.imgUrl + '" alt="' + instaItem.caption + '" class="insta-img" /><a href="' + instaItem.link + '" target="_blank" class="insta-link">view on instagram</a>');
          } 
    		});
      },
      error: function(err) {
        console.error(err);
      }
    });

  }]);
