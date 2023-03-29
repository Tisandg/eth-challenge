//Chai es una libreria de Javascript para testing
const { expect } = require("chai");


//Creamos un test. Puedo tener varios describe dentro de un archivo javascript
describe("Pokemon contract", function () {

    //Un describe puede tener n cantidad de 'it'. Estos son como escenarios a probar
    it("Pokemon Factory shouldn't has pokemons", async function () {

        //Esta funcion devolvera el address de quien esta invocando el smartContract
        //Hardhat permite utilizar varios usuarios de prueba
        // const [owner] = await ethers.getSigners(); // Esto lo ocuparán para crear un pokemon

        //Obtenemos el contracto
        const PokemonFactory = await ethers.getContractFactory("PokemonFactory");

        //Lo desplegamos localmente para luego probarlo
        //Desplegado dentro del hardhat local
        const hardhatPokemon = await PokemonFactory.deploy();

        //Una vez desplegado, utilizamos los metodos que queremos probar
        const pokemons = await hardhatPokemon.getAllPokemons();

        //El arreglo debe ser igual a zero
        expect(pokemons.length).to.equal(0);

    });
});