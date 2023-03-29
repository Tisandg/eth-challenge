const { expect } = require("chai");
const { BigNumber } = require("@ethersproject/bignumber");

describe("Pokemon contract", function () {

  it("Pokemon Factory shouldn't has pokemons", async function () {

    const PokemonFactory = await ethers.getContractFactory("PokemonFactory");
    const hardhatPokemon = await PokemonFactory.deploy();
    
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
    await expect(hardhatPokemon.createPokemon(id, name))
      .to.emit(hardhatPokemon, "eventNewPokemon")
      .withArgs(expectedArgs);
  });
});