// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract PokemonFactoryRequire{

  struct Pokemon{
    uint id;
    string name;
  }

  event eventNewPokemon(
    Pokemon newPokemon
  );

  Pokemon[] private pokemons;

  mapping (uint => address) public pokemonToOwner;  // 01 -> xasasas
  mapping (address => uint) ownerPokemonCount;      // xasasas -> 01

  //Pure bc we are not going to modify a state variable
  function getStringLength(string memory str) public pure returns(uint){
    bytes memory s = bytes(str);
    return s.length;
  }

  function createPokemon(uint _id, string memory _name) public{
    require(_id > 0, "Id must to be greater than zero");
    uint name_size = getStringLength(_name);
    console.log(name_size);
    require(name_size > 0, "Name must not be empty");
    require(name_size > 2, "Name length must be greather than two");
    Pokemon memory p = Pokemon(_id, _name);
    pokemons.push(p);
    pokemonToOwner[_id] = msg.sender;
    ownerPokemonCount[msg.sender]++;
    emit eventNewPokemon(p);
  }

  function getAllPokemons() public view returns (Pokemon[] memory){
    return pokemons;
  }

  function getResult() public pure returns(uint product, uint sum){
    uint a = 1;
    uint b = 2;
    product = a * b;
    sum = a + b;
  }

}