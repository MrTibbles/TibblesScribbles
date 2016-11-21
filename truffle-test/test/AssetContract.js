contract('AssetContract', function(accounts) {
	
	var
		creator = accounts[0],
		assetTitle = 'Big booty bitches',
		assetPrice = 5000,
		assetID = '0x0',
		time = 4761565665;

	it('Initial AssetContract configuration should match', function(done) {
			
		AssetContract.new(creator, assetTitle, assetPrice, assetID, time, {from: accounts[0] }).then(
				function(assetcontract) {

					assetcontract.assetTitle.call().then(
						function(title) {
							
							assert.equal(title, assetTitle, 'Asset title does not match');

						}).then(function() {

							return assetcontract.playbackCount.call();

						}).then(function(plays) {

							assert.equal(plays, 0, 'Playback count is not zero on creation!');

						}).then(function() {

							return assetcontract.jaakCount.call();

						}).then(function(jaaks) {

							assert.equal(jaaks, 0, 'Jaak count is not zero on creation!');
							return assetcontract.creator.call();

						}).then(function(creator) {

							assert.equal(creator, accounts[0], 'Creator does not match!');
							done();

						}).catch(done);

			}).catch(done);

	});

	it('Playback count should increment on request of asset', function(done) {
		
		AssetContract.new(creator, assetTitle, assetPrice, assetID, time, {from: accounts[0] }).then(
			function(assetcontract) {

				var initialBalance = web3.eth.getBalance(assetcontract.address).toNumber();
				var requesterBalance = web3.eth.getBalance(accounts[1]).toNumber();

				console.info(requesterBalance);

				assetcontract.requestAsset(accounts[2], '0x0', {from: accounts[1], value: assetPrice} )
					.then(
						function() {
							
							var
								newBalance = web3.eth.getBalance(assetcontract.address).toNumber(),
								difference = newBalance - initialBalance;

							assert.equal(difference, assetPrice, 'Doesnt match yo!');
							return assetcontract.playbackCount.call();
						}).then(function(plays) {

							assert.equal(plays, 1, 'Playback count has not incremented on request');
							done();

						}).catch(done);

			}).catch(done);

	});

});