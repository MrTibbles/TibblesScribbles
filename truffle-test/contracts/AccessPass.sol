contract AccessPass { 
  
  address public organizer; // Wallet address of organiser/owner
  mapping (address => string) public allPasses;
  mapping (address => uint) public registrantsPaid;  
  
  string public accessPassName;
  uint public numRegistrants;
  uint public quota;
  
  // so you can log these events
  event Deposit(address _from, uint _amount); 
  event Refund(address _to, uint _amount);

  function AccessPass(string inAccessPassName, uint inQuota) { // Constructor
    organizer = msg.sender;
    accessPassName = inAccessPassName;
    quota = inQuota;
    numRegistrants = 0;
  }

  function buyTicket() public returns (bool success) { 
    if (numRegistrants >= quota) { return false; } // see footnote
    registrantsPaid[msg.sender] = msg.value;
    numRegistrants++;
    Deposit(msg.sender, msg.value);
    return true;
  }

  function changeQuota(uint newquota) public {
    if (msg.sender != organizer) { return; }
    quota = newquota;
  }

  function refundTicket(address recipient, uint amount) public returns (bool success) {
    if (msg.sender != organizer) { return false; }
    if (registrantsPaid[recipient] == amount) {
      address myAddress = this;
      if (myAddress.balance >= amount) {
        recipient.send(amount);
        Refund(recipient, amount);
        registrantsPaid[recipient] = 0;
        numRegistrants--;
        return true;
      }
    }
    return false;
  }

  // So funds not locked in contract forever
  function destroy() {
    if (msg.sender == organizer) {
      suicide(organizer); // send funds to organizer
    }
  }

}