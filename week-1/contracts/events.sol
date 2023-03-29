// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/*

*/

contract PokemonFactory{

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

  function createPokemon(uint _id, string memory _name) public{
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