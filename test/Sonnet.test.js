const { assert } = require('chai')

const Sonnet = artifacts.require('./Sonnet.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Sonnet', ([deployer, poet]) => {
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
      assert.equal(name, 'Sonnet Dapp')
    })
  })

  describe('lines', async () => {
    let result, lineCount

    before(async () => {
      result = await sonnet.addLine('two bee or not two bees?', { from: poet })
      lineCount = await sonnet.lineCount()
    })

    it('adds lines', async () => {
      // SUCCESS
      assert.equal(lineCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), lineCount.toNumber(), 'id is correct')
      assert.equal(event.content, 'two bee or not two bees?', 'name is correct')
      assert.equal(event.poet, poet, 'owner is correct')
      
      // FAILURE: Product must have a name
      await await sonnet.addLine('', { from: poet }).should.be.rejected;
    })
  })
})