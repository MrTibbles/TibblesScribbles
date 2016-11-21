// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"assetTitle","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"time","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"creatorName","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"streamer","type":"address"},{"name":"jaaker","type":"address"}],"name":"requestAsset","outputs":[{"name":"assetID","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"assetLocation","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"verified","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"assetPrice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"jaakCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"playbackCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[{"name":"_creator","type":"address"},{"name":"_creatorName","type":"string"},{"name":"_assetTitle","type":"string"},{"name":"_assetPrice","type":"uint256"},{"name":"_assetID","type":"bytes32"},{"name":"_time","type":"uint256"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_playbackCount","type":"uint256"}],"name":"AssetRetrieved","type":"event"}],
    binary: "60606040526040516104b13803806104b183398101604052805160805160a05160c05160e051610100519495938401949290930192909160008054600160a060020a031916871781556001805487519282905290916020601f60026000198587161561010002019094169390930483018190047fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf69081019390918a01908390106100cc57805160ff19168380011785555b506100fc9291505b8082111561015557600081556001016100b8565b828001600101855582156100b0579182015b828111156100b05782518260005055916020019190600101906100de565b50508360036000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061015957805160ff19168380011785555b506101899291506100b8565b5090565b82800160010185558215610149579182015b8281111561014957825182600050559160200191906001019061016b565b505060029290925560045560065550506000600781905560088190556009805460ff191690556102f2915081906101bf90396000f3606060405236156100825760e060020a600035046302c3c377811461008457806302d05d3f146100e157806316ada547146101005780631f6f90bd1461010957806341aa80d814610164578063776cdb7c146101a1578063bbb82d89146101aa578063d24378eb146101b6578063d88e2bbb146101bf578063db4fd27f146101c8575b005b6101d160038054602060026001831615610100026000190190921691909104601f810182900490910260809081016040526060828152929190828280156102805780601f1061025557610100808354040283529160200191610280565b61023f60005473ffffffffffffffffffffffffffffffffffffffff1681565b61023f60065481565b6101d1600180546020601f6002838516156101000260001901909316929092049182018190040260809081016040526060828152929190828280156102805780601f1061025557610100808354040283529160200191610280565b61023f60043560243560025460009034101561028857507f30783000000000000000000000000000000000000000000000000000000000006102ec565b61023f60055481565b61024960095460ff1681565b61023f60025481565b61023f60085481565b61023f60075481565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156102315780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6060908152602090f35b15156060908152602090f35b820191906000526020600020905b81548152906001019060200180831161026357829003601f168201915b505050505081565b6007805460019081019182905560088054909101905573ffffffffffffffffffffffffffffffffffffffff841660609081526080919091527fb3ec55f3ec5648b034e307145430f14519d480407750d2666e106d2fb763bf7e90604090a160058190555b9291505056",
    unlinked_binary: "60606040526040516104b13803806104b183398101604052805160805160a05160c05160e051610100519495938401949290930192909160008054600160a060020a031916871781556001805487519282905290916020601f60026000198587161561010002019094169390930483018190047fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf69081019390918a01908390106100cc57805160ff19168380011785555b506100fc9291505b8082111561015557600081556001016100b8565b828001600101855582156100b0579182015b828111156100b05782518260005055916020019190600101906100de565b50508360036000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061015957805160ff19168380011785555b506101899291506100b8565b5090565b82800160010185558215610149579182015b8281111561014957825182600050559160200191906001019061016b565b505060029290925560045560065550506000600781905560088190556009805460ff191690556102f2915081906101bf90396000f3606060405236156100825760e060020a600035046302c3c377811461008457806302d05d3f146100e157806316ada547146101005780631f6f90bd1461010957806341aa80d814610164578063776cdb7c146101a1578063bbb82d89146101aa578063d24378eb146101b6578063d88e2bbb146101bf578063db4fd27f146101c8575b005b6101d160038054602060026001831615610100026000190190921691909104601f810182900490910260809081016040526060828152929190828280156102805780601f1061025557610100808354040283529160200191610280565b61023f60005473ffffffffffffffffffffffffffffffffffffffff1681565b61023f60065481565b6101d1600180546020601f6002838516156101000260001901909316929092049182018190040260809081016040526060828152929190828280156102805780601f1061025557610100808354040283529160200191610280565b61023f60043560243560025460009034101561028857507f30783000000000000000000000000000000000000000000000000000000000006102ec565b61023f60055481565b61024960095460ff1681565b61023f60025481565b61023f60085481565b61023f60075481565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156102315780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6060908152602090f35b15156060908152602090f35b820191906000526020600020905b81548152906001019060200180831161026357829003601f168201915b505050505081565b6007805460019081019182905560088054909101905573ffffffffffffffffffffffffffffffffffffffff841660609081526080919091527fb3ec55f3ec5648b034e307145430f14519d480407750d2666e106d2fb763bf7e90604090a160058190555b9291505056",
    address: "0x1896ed7fb8e266261c44330e961f49c4e228c0db",
    generated_with: "2.0.9",
    contract_name: "AssetContract"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("AssetContract error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("AssetContract error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("AssetContract error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("AssetContract error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.AssetContract = Contract;
  }

})();
