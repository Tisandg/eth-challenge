const { expect } = require("chai");

describe("PokemonFactorySkills", function () {

  let myContract;

  beforeEach(async function(){
    const MyContract = await ethers.getContractFactory("PokemonFactorySkills");
    myContract = await MyContract.deploy();
  });

  it("Should create a pokemon with a skill", async function(){
    const id = 1;
    const name = "pikachu";
    const skill_name = "Impactrueno";
    const skill_description = "Rayo electrico que produce daño en el enemigo";

    myContract.createPokemon(id, name, skill_name, skill_description)

    const skills = await myContract.getAllSkills(id);
    expect(skills.length).to.equal(1);
  });

  it("Should add a new skill after creation of pokemon", async function(){
    const id = 1;
    const name = "pikachu";
    const skill_name = "Impactrueno";
    const skill_description = "Rayo electrico que produce daño en el enemigo";

    myContract.createPokemon(id, name, skill_name, skill_description)

    myContract.addNewSkill(id, "Electricidad estatica","Habilidad de impactrueno mejorada")
    const skills = await myContract.getAllSkills(id);
    expect(skills.length).to.equal(2);
  });


});