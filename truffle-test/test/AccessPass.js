contract('AccessPass', function(accounts) {
  
  var
    passTitle = "Test AccessPass Title",
    passQuota = 99,
    ticketPrice = web3.toWei(.05, 'ether');

  // Check initial config of access psss contract
  it("Initial AccessPass settings should match", function(done) {

    // var accesspass = AccessPass.at(AccessPass.deployed_address);

    // same as previous example up to here
    AccessPass.new(passTitle, passQuota, { from: accounts[0] }).then(
      function(accesspass) {
        accesspass.accessPassName.call().then(
          function(name) {

            assert.equal(name, passTitle, "AccessPass name doesn't match!");

          }).then(function() {

          return accesspass.quota.call();

        }).then(function(quota) {

          assert.equal(quota, passQuota, "Quota doesn't match!");

        }).then(function() {

          return accesspass.numRegistrants.call();

        }).then(function(num) {

          assert.equal(num, 0, "Registrants should be zero!");
          return accesspass.organizer.call();

        }).then(function(organizer) {

          assert.equal(organizer, accounts[0], "Owner doesn't match!");
          done(); // to stop these tests earlier, move this up

        }).catch(done);

      }).catch(done);

  });

  // // Check that th quota updates
  it("Should update quota", function(done) {

    // var c = AccessPass.at(AccessPass.deployed_address);

    AccessPass.new(passTitle, 50, { from: accounts[0] }).then(

      function(accesspass) {

        accesspass.quota.call().then(

          function(quota) {

            assert.equal(quota, 50, "Quota doesn't match!");

          }).then(

          function() {

            return accesspass.changeQuota(passQuota);

          }).then(

          function(result) {

            console.log('Transaction hex :' + result);
            // printed will be a long hex, the transaction hash
            return accesspass.quota.call();

          }).then(

          function(quota) {

            assert.equal(quota, passQuota, "New quota is not correct!");
            done();

          }).catch(done);
      }).catch(done);

  });

  // // Check if ticket can be bought and contract balance increases
  it("Should let you buy a ticket", function(done) {

    // var c = AccessPass.at(AccessPass.deployed_address);

    AccessPass.new(passTitle, passQuota, { from: accounts[0] }).then(

      function(accesspass) {
        
        var initialBalance = web3.eth.getBalance(accesspass.address).toNumber();

        accesspass.buyTicket({ from: accounts[1], value: ticketPrice })
          .then(
            function() {

              var newBalance = web3.eth.getBalance(accesspass.address).toNumber();
              var difference = newBalance - initialBalance;
              assert.equal(difference, ticketPrice, "Difference should be what was sent");
              return accesspass.numRegistrants.call();

            }).then(
            function(num) {

              assert.equal(num, 1, "there should be 1 registrant");
              return accesspass.registrantsPaid.call(accounts[1]);

            }).then(function(amount) {

            assert.equal(amount.toNumber(), ticketPrice, "Sender's paid but is not listed");
            done();

          }).catch(done);
      }).catch(done);

  });

  // // ONLY organisesr can issue refund
  it("Should issue a refund by owner only", function(done) {

    // var c = AccessPass.at(AccessPass.deployed_address);

    AccessPass.new(passTitle, passQuota, { from: accounts[0] }).then(
      function(accesspass) {

        var initialBalance = web3.eth.getBalance(accesspass.address).toNumber();

        accesspass.buyTicket({
          from: accounts[1],
          value: ticketPrice
        }).then(
          function() {

            var newBalance = web3.eth.getBalance(accesspass.address).toNumber();
            var difference = newBalance - initialBalance;
            assert.equal(difference, ticketPrice, "Difference should be what was sent");
            // Now try to issue refund as second user - should fail
            return accesspass.refundTicket(accounts[1], ticketPrice, { from: accounts[1] });

          }).then(function() {

          var balance = web3.eth.getBalance(accesspass.address).toNumber();

          assert.equal(web3.toBigNumber(balance), ticketPrice, "Balance should be unchanged");
          // Now try to issue refund as organizer/owner - should work
          return accesspass.refundTicket(accounts[1], ticketPrice, { from: accounts[0] });

        }).then(function() {

          var postRefundBalance = web3.eth.getBalance(accesspass.address).toNumber();
          assert.equal(postRefundBalance, initialBalance, "Balance should be initial balance");
          done();

        }).catch(done);
      }).catch(done);

  });

});
