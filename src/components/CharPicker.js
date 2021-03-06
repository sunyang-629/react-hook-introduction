import React, { useState, useEffect } from 'react';
import { useHttp } from "./../hooks/http";

import './CharPicker.css';

const CharPicker = props => {
  // state = { loadedChars: [], isLoading: false };
  // const [loadedChars,setLoadedChars] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  
  const [isLoading, loadedChars] = useHttp('https://swapi.co/api/people', []);
  
  const selectedloadedChars = loadedChars ? loadedChars.results.slice(0, 5).map((char, index) => ({
    name: char.name,
    id: index + 1
  })) : [];

    let content = <p>Loading characters...</p>;

    if (
      !isLoading &&
      selectedloadedChars &&
      selectedloadedChars.length > 0
    ) {
      content = (
        <select
          onChange={props.onCharSelect}
          value={props.selectedloadedChars}
          className={props.side}
        >
          {selectedloadedChars.map(char => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      );
    } else if (
      !isLoading &&
      (!selectedloadedChars || selectedloadedChars.length === 0)
    ) {
      content = <p>Could not fetch any data.</p>;
    }
    return content;
}

export default CharPicker;
