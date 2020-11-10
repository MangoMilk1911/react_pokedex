import React from "react";

export default function PokemonList(props) {
  const {pokemonList} = props; // add type
  // const pokemon = props.pokemon;
  return (
    <>
      <h1>PokéDex</h1>

      <div>
        {pokemonList.map((p) => (
            <div className="poke-container" 
            key={p.name}>{p.name}</div>
        ))} 
      </div>
    </>
  );
}
