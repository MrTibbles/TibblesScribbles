/// @title AssetContract
/// @author MrTibbles
contract AssetContract {
	
	address public creator; // address of creator of asset (ie. artist, producer)
	string public creatorName; // name of creator
	uint public assetPrice; // asset price for retrieval
	string public assetTitle; // asset title
	bytes32 private assetID; // location of asset is private to control access
	bytes32 public assetLocation; 
	uint public time; // unix timestamp of creation/publication
	uint public playbackCount; // how many times that asset has been consumed	
	uint public jaakCount; // how many times the asset has been shared from one user to another, in the network - JAAK specific parameter
	bool public verified; // whether or not the owner of the content has been verified in otder process payments

	event AssetRetrieved(address _from, uint _playbackCount);

	/// @param _assetTitle string - title of submitted asset
	/// @param _assetPrice uint - price of submitted asset  
  /// @param _assetID bytes32 - hash location of asset in swarm
  /// @param _time uint - timestamp of publication
	function AssetContract(address _creator, string _creatorName, string _assetTitle, uint _assetPrice, bytes32 _assetID, uint _time) {
		creator = _creator;
		creatorName = _creatorName;
		assetTitle = _assetTitle;
		assetPrice = _assetPrice;
		assetID = _assetID;
		time = _time;
		playbackCount = 0;
		jaakCount = 0;
		verified = false;
	}

	/// @notice request location of asset 
	/// @return bool of transaction completing
	function requestAsset(address streamer, address jaaker) public returns (bytes32 assetID) {
    if (msg.value < assetPrice) {
      return "0x0";
    }
    playbackCount++;
    jaakCount++;
		AssetRetrieved(streamer, playbackCount);
		assetLocation = assetID;
		return assetLocation;
	}

}