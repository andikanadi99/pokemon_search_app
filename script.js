/* Global DOM variables */
  let input = document.getElementById('search-input');
  let button = document.getElementById('search-button');
  let image = document.getElementById('image-container');
  //Basic Pokemon Attributes
  let pokemon_name = document.getElementById('pokemon-name');
  let id = document.getElementById('pokemon-id');
  let weight = document.getElementById('weight');
  let height = document.getElementById('height');
  let types = document.getElementById('types');
  //Pokemon Stats
  let hp = document.getElementById('hp');
  let attack = document.getElementById('attack');
  let defense = document.getElementById('defense');
  let special_attack = document.getElementById('special-attack');
  let special_defense = document.getElementById('special-defense');
  let speed = document.getElementById('speed');
/* Variables for API Calls */
let address = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/' 
/* API Function call */
async function getPokemon(param){
  const url = address + param;
  // try and catch to get the pokemon data
  try{
    const response = await fetch(url);
    if(!response.ok){
      alert("Pokémon not found")
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    //Call attribute function to set pokemon data
     setAttributes(data);
  }
  catch(error){
    console.log(error.message);
  }
}
/* Function to set pokemon data */
function setAttributes(attr){
  //Base Attributes
  pokemon_name.innerText = attr.name;
  id.innerText = attr.id;
  weight.innerText = attr.weight;
  height.innerText = attr.height;
  //Set Image
  const img = document.createElement('img');
  img.id = "sprite"
  img.src = attr.sprites.front_default; 
  image.appendChild(img); 
  //For loop to get all types
  let types_str = ''
  for(let i = 0; i < attr.types.length; i++){
    const p = document.createElement('p');
    p.innerText = attr.types[i].type.name + ' '
    types.appendChild(p);
  }
  //For loop to map each special stat to its value
  let stat_map = new Map();
  for(let i = 0; i < attr.stats.length; i++){
      let attr_name = attr.stats[i].stat.name;
      let attr_val = attr.stats[i].base_stat;
      stat_map[attr_name]=attr_val;
  }
  //Set all special stats
  hp.innerText = stat_map['hp'];
  attack.innerText = stat_map['attack'];
  defense.innerText = stat_map['defense'];
  special_attack.innerText = stat_map['special-attack'];
  special_defense.innerText = stat_map['special-defense'];
  speed.innerText = stat_map['speed'];
}
/* Function to handle search */
function handleSearch(){
  let val = input.value;
  //Reset need values
  image.innerHTML = '';
  types.innerHTML = '';
  //Function call to get all pokemon attributes
  getPokemon(val.toLowerCase());
}
//Declare Button's clicking event
button.onclick = handleSearch;
