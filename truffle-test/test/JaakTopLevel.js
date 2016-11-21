contract('JaakTopLevel', function(accounts) {

  var
    iniBalance = 680000,
    assetTitle = 'Big booty bitches',
    assetPrice = 5000,
    assetID = '0x0',
    time = 4761565665;

  it('Top level contract is deployed with empty asset listings', function(done) {

    JaakTopLevel.new({ from: accounts[0], amount: 9999999 }).then(
      function(jaakTopLevel) {

        jaakTopLevel.assetCount.call().then(
          function(assetCount) {

            assert.equal(assetCount, 0, 'Registered assets should be empty on initiation');
            done();

          }).catch(done);

      });

  });

  it('New asset is registered and global asset count increments', function(done) {

    JaakTopLevel.new({ from: accounts[0], amount: 9999999 }).then(
      function(jaakTopLevel) {

        jaakTopLevel.assetCount.call().then(
          function(assetCount) {
            assert.equal(assetCount, 0, 'Registered assets should be empty on initiation');
          }).then(
          function() {

            return jaakTopLevel.registerAsset(assetTitle, assetPrice, assetID, { from: accounts[1] });

          }).then(
          function(result) {

            console.info('tx hash: ' + result);            
            return jaakTopLevel.assetCount.call();
          
          }).then(
          function(assetCount) {

            assert.equal(assetCount, 1, 'Registered assets should increment UPON injection of asset');
            done();

          }).catch(done);

      }).catch(done);

  });

  it('Assets should be retrievable', function(done) {

    JaakTopLevel.new({ from: accounts[0], amount: 9999999 }).then(
      function(jaakTopLevel) {

        jaakTopLevel.assetCount.call().then(
          function(assetCount) {
            assert.equal(assetCount, 0, 'Registered assets should be empty on initiation');
          }).then(
          function() {

            return jaakTopLevel.registerAsset(assetTitle, assetPrice, assetID, { from: accounts[1] });

          }).then(
          function(result) {

            console.info('tx hash: ' + result);
            return jaakTopLevel.assetCount.call();
          
          }).then(
          function(assetCount) {

            assert.equal(assetCount, 1, 'Registered assets should increment UPON injection of asset');
            return jaakTopLevel.getAssetContractLocations.call();

          }).then(
          function(assets) {

            console.info(assets);
            done();

          }).catch(done);

      }).catch(done);

  });

});
