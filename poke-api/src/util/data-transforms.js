export function getPokemonByType(typesList, pokemonList) {
  const pokemonByType = d3.flatGroup(
    pokemonList,
    (data) => data.types[0],
    (data) => data.types[1] ?? 'none'
  );

  const pokemonByFirstGenTypes = [];

  for (let i = 0; i < typesList.length; i++) {
    const currentType = typesList[i];
    const pokemonList = [];

    for (let j = 0; j < pokemonByType.length; j++) {
      const currentPokemonTypeGrouping = pokemonByType[j];

      const currentTypeMatchesGrouping =
        currentType === currentPokemonTypeGrouping[0] ||
        currentType === currentPokemonTypeGrouping[1];

      if (currentTypeMatchesGrouping) {
        for (let k = 0; k < currentPokemonTypeGrouping[2].length; k++) {
          const currentPokemonName = currentPokemonTypeGrouping[2][k].name;

          if (!pokemonList.includes(currentPokemonName)) {
            pokemonList.push(currentPokemonName);
          }
        }
      }
    }

    pokemonByFirstGenTypes.push({
      type: currentType,
      pokemon: pokemonList,
    });
  }

  return pokemonByFirstGenTypes;
}

export function getPokemonByTypeFlat(pokemonByType) {
  const flatPokemonByType = [];

  for (let i = 0; i < pokemonByType.length; i++) {
    const currentPokemonByType = pokemonByType[i];

    for (let j = 0; j < currentPokemonByType.pokemon.length; j++) {
      flatPokemonByType.push({
        type: currentPokemonByType.type,
        pokemon: currentPokemonByType.pokemon[j],
        color: _getColorByType(currentPokemonByType.type),
      });
    }
  }

  return flatPokemonByType;
}
