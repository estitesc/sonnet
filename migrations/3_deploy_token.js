const DummyToken = artifacts.require("DummyToken");

module.exports = function(deployer) {
  deployer.deploy(DummyToken);
};
