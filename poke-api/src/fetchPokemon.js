const pokeAPIBaseUrl = 'https://pokeapi.co/api/v2';
const getGen1PokemonSuffix = '/pokemon?limit=151';
const getGen1PokemonGen1Suffix = '/generation/1';
const getGen1PokemonUrl = `${pokeAPIBaseUrl}${getGen1PokemonSuffix}`;
const getGen1PokemonGen1Url = `${pokeAPIBaseUrl}${getGen1PokemonGen1Suffix}`;

export async function fetchGen1Pokemon() {
  let pokemonList = [];

  const response = await fetch(getGen1PokemonUrl);

  const responseJson = await response.json();
  const pokemonResults = responseJson.results;
  for (let i = 0; i < pokemonResults.length; i++) {
    const currentPokemon = pokemonResults[i];

    const fullPokemonResponse = await fetch(currentPokemon.url);
    const fullPokemonData = await fullPokemonResponse.json();
    const { name, types } = fullPokemonData;

    const currentPokemonTypes = [];
    types.forEach((pokemonType) => {
      currentPokemonTypes.push(pokemonType?.type?.name);
    });

    const relevantPokemonData = { name, types: currentPokemonTypes };

    pokemonList.push(relevantPokemonData);
  }

  return pokemonList;
}

export async function fetchGen1PokemonTypes() {
  let typesList = [];

  const response = await fetch(getGen1PokemonGen1Url);
  const gen1PokemonTypesResponse = await response.json();

  const types = gen1PokemonTypesResponse.types;
  types.forEach((pokemonType) => {
    typesList.push(pokemonType.name);
  });

  return typesList;
}
