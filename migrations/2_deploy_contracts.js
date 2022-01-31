const Sonnet = artifacts.require("Sonnet");

module.exports = function(deployer) {
  deployer.deploy(Sonnet);
};
