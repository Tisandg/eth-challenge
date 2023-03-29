const { expect } = require("chai");

describe("PokemonFactoryTypes", function () {

  let myContract;

  beforeEach(async function(){
    const MyContract = await ethers.getContractFactory("PokemonFactoryTypes");
    myContract = await MyContract.deploy();
  });

  it("Should create a pokemon with a types", async function(){
    const id = 1;
    const name = "pikachu";
    const pokemonType = ["Electrico"];
    const weaknesses = ["Tierra"];

    const skill_name = "Impactrueno";
    const skill_description = "Rayo electrico que produce daño en el enemigo";

    myContract.createPokemon(id, name, pokemonType, weaknesses, skill_name, skill_description)

    const types = await myContract.getAllTypes(id);
    expect(types.length).to.equal(1);
  });

  it("Should create a pokemon with weaknesses", async function(){
    const id = 1;
    const name = "pikachu";
    const pokemonType = ["Electrico"];
    const weaknesses = ["Tierra"];

    const skill_name = "Impactrueno";
    const skill_description = "Rayo electrico que produce daño en el enemigo";

    myContract.createPokemon(id, name, pokemonType, weaknesses, skill_name, skill_description)

    const weaknesses_obtained = await myContract.getAllWeaknesses(id);
    expect(weaknesses_obtained.length).to.equal(1);
  });

  it("Should create two pokemons", async function(){
    const id = 1;
    const name = "pikachu";
    const pokemonType = ["Electrico"];
    const weaknesses = ["Tierra"];
    const skill_name = "Impactrueno";
    const skill_description = "Rayo electrico que produce daño en el enemigo";

    const id2 = 2;
    const name2 = "Bulbasaur";
    const pokemonType2 = ["Planta","Veneno"];
    const weaknesses2 = ["Fuego","Volador","Hielo"];
    const skill_name2 = "Espesura";
    const skill_description2 = "Potencia sus movimientos de tipo Planta cuando le quedan pocos PS.";

    myContract.createPokemon(id, name, pokemonType, weaknesses, skill_name, skill_description)
    myContract.createPokemon(id2, name2, pokemonType2, weaknesses2, skill_name2, skill_description2)

    const pokemons = await myContract.getAllPokemons();
    expect(pokemons.length).to.equal(2);
  });

});