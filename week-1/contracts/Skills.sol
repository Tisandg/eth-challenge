// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "../node_modules/hardhat/console.sol";

contract PokemonFactorySkills{

  struct Pokemon{
    uint id;
    string name;
  }

  struct Skill{
    string name;
    string description;
  }

  event eventNewPokemon(
    Pokemon newPokemon
  );

  Pokemon[] private pokemons;

  mapping (uint => address) public pokemonToOwner;  // 01 -> xasasas
  mapping (address => uint) ownerPokemonCount;      // xasasas -> 01
  mapping (uint => uint) pokemonIndex;
  mapping (uint => Skill[]) pokemonSkills;

  //Pure bc we are not going to modify a state variable
  function getStringLength(string memory str) public pure returns(uint){
    bytes memory s = bytes(str);
    return s.length;
  }

  function createPokemon(uint _id, string memory _name, string memory skill_name, string memory skill_description) public{

    require(_id > 0, "Id must to be greater than zero");
    uint name_size = getStringLength(_name);
    require(name_size > 0, "Name must not be empty");
    require(name_size > 2, "Name length must be greather than two");

    Pokemon memory newPokemon = Pokemon(_id, _name);
    Skill memory newSkill = Skill(skill_name, skill_description);
    pokemons.push(newPokemon);
    pokemonSkills[_id].push(newSkill);

    pokemonToOwner[_id] = msg.sender;
    ownerPokemonCount[msg.sender]++;
    pokemonIndex[_id] = pokemons.length-1;

    emit eventNewPokemon(newPokemon);
  }

  function addNewSkill(uint _id, string memory skill_name, string memory skill_description) public{
    uint name_size = getStringLength(skill_name);
    uint description_size = getStringLength(skill_description);
    require(name_size>0 && description_size>0, "Name and/or description must no be empty");
    require(_id > 0, "Id must to be greater than zero");

    Skill memory newSkill = Skill(skill_name, skill_description);
    pokemonSkills[_id].push(newSkill);
  }

  function getAllPokemons() public view returns (Pokemon[] memory){
    return pokemons;
  }

  function getAllSkills(uint _id) public view returns (Skill[] memory){
    return pokemonSkills[_id];
  }

}