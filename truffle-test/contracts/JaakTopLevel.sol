/// @title JaakTopLevel
/// @author MrTibbles
contract mortal {address owner;function mortal() { owner = msg.sender; }function kill() { if (msg.sender == owner) suicide(owner); }}

contract Creator {address public creator; uint public startDate; function Creator(address _creator) { creator = msg.sender; startDate = block.timestamp; }}

contract AssetContract {address public creator; string public creatorName; uint public assetPrice; string public assetTitle; bytes32 private assetID; bytes32 public assetLocation; uint public time; uint public playbackCount; uint public jaakCount; bool public verified; event AssetRetrieved(address _from, uint _playbackCount); function AssetContract(address _creator, string _creatorName, string _assetTitle, uint _assetPrice, bytes32 _assetID, uint _time) { creator = _creator; creatorName = _creatorName; assetTitle = _assetTitle; assetPrice = _assetPrice; assetID = _assetID; time = _time; playbackCount = 0; jaakCount = 0; verified = false; } function requestAsset(address streamer, address jaaker) public returns (bytes32 assetID) { if (msg.value < assetPrice) { return "0x0"; } playbackCount++; jaakCount++; AssetRetrieved(streamer, playbackCount); assetLocation = assetID; return assetLocation; }}

contract JaakTopLevel is mortal {

  uint constant JAAK_FRACTION = 84; // cut JAAK takes per listen in wei
  uint constant JAAKER_FRACTION = 336; // cut JAAK takes per listen in wei
  uint constant PLAY_PRICE = 4200; /// price per play in wei

  mapping (address => AssetContract[]) public assetList;
  address[] public registeredAssets;// array of all assets
  mapping (address => Creator) public creatorList;// array of all creators
  uint public creatorCount = 0;
  uint public assetCount;

  mapping (address => uint) public balanceOf; // array of balances for creators & users

  struct Asset {
    address creator;
    string creatorName;
    uint assetPrice;
    string assetTitle;
    // bytes32 assetID;
    uint time;
    uint playbackCount;
    uint jaakCount;
    bool verified;
  }

  event AssetAdded(address _creator, address _assetContractLocation, string _assetTitle, uint _assetPrice);

  function JaakTopLevel() {
    balanceOf[owner] = msg.value;
  }

  /// @notice register a creator to the network
  function registerCreator() {
    Creator newCreator = new Creator(msg.sender);
    creatorList[msg.sender] = newCreator;
    creatorCount++;
  }

  /// @notice register function is used to register a new asset on the chain
  /// @param assetPrice uint - price of submitted asset
  /// @param assetTitle string - title of submitted asset
  /// @param assetID bytes32 - hash location of asset in swarm
  function registerAsset(string creatorName, string assetTitle, uint assetPrice, bytes32 assetID) public returns (address) {

    // check to see if asset is already present
    // if (assetList[assetID].length > 0) {
    //   return registered = false;
    // }
    AssetContract newAsset = new AssetContract(msg.sender, creatorName, assetTitle, assetPrice, assetID, block.timestamp);
    assetList[msg.sender].push(newAsset);
    registeredAssets.push(newAsset);    
    assetCount = registeredAssets.length;
    AssetAdded(msg.sender, newAsset, assetTitle, assetPrice);
    return newAsset;
  }

  /// @notice return all asset contract locations  
  function getAssetContractLocations() public returns (address[]) {
    return registeredAssets;
  }

  /// @notice parse the asset objects into readable data objects
  // function parseAssets() public returns (Asset[] assetObjects) {

  //   Asset[] memory assetObjects = new Asset[];
  //   for (uint i; i < assetCount; i++) {
  //     Asset asset = registeredAssets[i];
  //     assetObjects.push(asset);
  //   }

  // }

  /// @notice return all creators address
  // function  getAllCreators() public returns (address => Creator) {
  //   return creatorList;
  // }

}