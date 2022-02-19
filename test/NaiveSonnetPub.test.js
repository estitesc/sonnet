const { assert } = require('chai')

const Sonnet = artifacts.require('./NaiveSonnetPub.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('NaiveSonnetPub', ([deployer, poet, another_poet, not_a_poet]) => {
  let sonnet

  before(async () => {
    sonnet = await Sonnet.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await sonnet.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await sonnet.name()
      assert.equal(name, 'Naive Sonnet Publisher')
    })
  })

  describe('poets', async () => {
    let result, poetCount

    before(async () => {
      result = await sonnet.addPoet('poetez', 'http://sonn3t.com/pfps/pfp_0.png', { from: poet })
      poetCount = await sonnet.poetCount()
    })

    it('adds poet', async () => {
      // SUCCESS
      assert.equal(poetCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), poetCount.toNumber() - 1, 'id is correct')
      assert.equal(event.name, 'poetez', 'name is correct')
      assert.equal(event.pfpUrl, 'http://sonn3t.com/pfps/pfp_0.png', 'pfpUrl is correct')
      assert.equal(event.wallet, poet, 'owner is correct')
      
      // FAILURE: Can't use same name claimed by another poet.
      await await sonnet.addPoet('poetez', 'http://sonn3t.com/pfps/pfp_0.png', { from: another_poet }).should.be.rejected;

      // FAILURE: Can't create another account for existing poet wallet
      await await sonnet.addPoet('noo_poet', 'http://sonn3t.com/pfps/pfp_0.png', { from: poet }).should.be.rejected;

      // FAILURE: Require name
      await await sonnet.addPoet('', 'http://sonn3t.com/pfps/pfp_0.png', { from: another_poet }).should.be.rejected;
    })
  })

  describe('poems', async () => {
    let result, poemCount, poetResult

    before(async () => {
      poetResult = await sonnet.addPoet('poet_poet', 'http://sonn3t.com/pfps/pfp_0.png', { from: another_poet })
      result = await sonnet.addPoem('', 'short\nlittle\npoem', { from: another_poet })
      poemCount = await sonnet.poemCount();
    })

    it('adds poem', async () => {
      // SUCCESS
      assert.equal(poemCount, 1)
      const poetEvent = poetResult.logs[0].args
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), poemCount.toNumber() - 1, 'id is correct')
      assert.equal(event.name, '', 'name is correct')
      assert.equal(event.content, 'short\nlittle\npoem', 'content is correct')
      assert.equal(event.poetId.toNumber(), poetEvent.id.toNumber(), 'poet is correct')

      // FAILURE: Require a poet before adding poem
      await await sonnet.addPoem('', 'short\nlittle\npoem', { from: not_a_poet }).should.be.rejected;
    })
  })
})