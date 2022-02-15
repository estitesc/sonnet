const NaiveSonnetPub = artifacts.require("NaiveSonnetPub");

module.exports = function(deployer) {
  deployer.deploy(NaiveSonnetPub);
};
