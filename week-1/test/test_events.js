const { expect } = require("chai");
const { BigNumber } = require("@ethersproject/bignumber");

/**
 * 'describe' function create a new test suite with the name given in the 1 parameter
 */
describe("PokemonContract", function () {

  let myContract;

  //beforeEach is a Mocha test framework hook that is called before each test case in a test suite.
  //It is used to set up any necessary state or dependencies for the tests to run.
  beforeEach(async function(){
    //Create a new instance of the contract
    const MyContract = await ethers.getContractFactory("PokemonFactoryRequire");
    //Deploy the contract
    myContract = await MyContract.deploy();
  });

  it("Event emitted when pokemon is created", async function () {
    const id = 15;
    const name = "Pikachu";

    //Even the id was converted to a BigNumber, the hardhat found it not appropiate for the test.
    //So, we have to conver the object to an array of primitive types.
    //From this
    //const expectedArgs = { id: BigNumber.from(id), name };
    //To this
    const expectedArgs = [BigNumber.from(id), name];

    //The createPokemon Functions emits the event 'eventNewPokemon'
    //with a 'pokemon' parameter. So, in this way, we can check if the event
    //was emitted with the correct data.
    await expect(myContract.createPokemon(id, name))
      .to.emit(myContract, "eventNewPokemon")
      .withArgs(expectedArgs);
  });

  it("Should revert when id is less than or equal to zero", async function () {    
    const id = 0;
    const name = "Pikachu";
    await expect(myContract.createPokemon(id, name)).to.be.revertedWith(
      "Id must to be greater than zero"
    );
  });

  it("Should no revert when id is greater than zero", async function () {    
    const id = 1;
    const name = "Pikachu";
    myContract.createPokemon(id, name);
    const pokemons = await myContract.getAllPokemons();
    expect(pokemons.length).to.equal(1);
  });

  it("Should revert when name is empty", async function(){
    const id = 1;
    const name = "";
    await expect(myContract.createPokemon(id, name)).to.be.revertedWith(
      "Name must not be empty"
    );
  });

  it("Should revert when name length is less than or equal to 2", async function(){
    const id = 1;
    const name = "pi";
    await expect(myContract.createPokemon(id, name)).to.be.revertedWith(
      "Name length must be greather than two"
    );
  });

});