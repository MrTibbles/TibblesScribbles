window.onload = function() {
  var
    accounts = web3.eth.accounts,
    acp = AccessPass.at(AccessPass.deployed_address),
    createBtn = document.querySelector('.btn-create'),
    deployedContracts = document.querySelector('.deployed-contracts'),
    contracts = [],
    contractListings = '';

  createBtn.addEventListener('click', createPass);

  function createPass() {
    var
      name = document.querySelector('.pass-name').value,
      quota = Number(document.querySelector('.pass-quota').value);

    AccessPass.new(name, quota, { from: accounts[0] }).then(
      function(accesspass) {
        contracts.push(accesspass);

        var ticketPrice = web3.toWei(.05, 'ether');
        var initialBalance = web3.eth.getBalance(accesspass.address).toNumber();

        updateContractList();
        //event listeners on contract
        // var event = accesspass.allEvents().watch({}, '');
        // // or use conference.Deposit() or .Refund()
        // event.watch(function(error, result) {
        //   if (error) {
        //     console.log("Error: " + error);
        //   } else {
        //     console.log("Event: " + result.event);
        //   }
        // })
      });
  }

  function updateContractList() {
    for (contract in contracts) {
      contracts[contract].accessPassName.call().then(
        function(accessPassName) {
          contractListings += '<p data-addr="' + contracts[contract].address + '">' + accessPassName + ' deployed at: ' + contracts[contract].address + '</p>';

          deployedContracts.innerHTML = contractListings;
        });        
    }
  }

  function buyTicket() {
    // var accesspass = 
    accesspass.buyTicket({ from: accounts[1], value: ticketPrice }).then(
      function() {
        var newBalance = web3.eth.getBalance(accesspass.address).toNumber();
        console.log("After someone bought a ticket it's: " + newBalance);
        return accesspass.refundTicket(accounts[1], ticketPrice, { from: accounts[0] });
      }).then(
      function() {
        var balance = web3.eth.getBalance(accesspass.address).toNumber();
        console.log("After a refund it's: " + balance);
      });
  }
};
