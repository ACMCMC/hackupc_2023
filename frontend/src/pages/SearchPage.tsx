// This page contains a list of HouseCards that are filtered by the search bar

import React, { useState, useEffect } from "react";
import { HouseCard } from "../Components/HouseCard";
import { House } from "../models/House";

export const SearchPage = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    //const fetchHouses = async () => {
    //const response = await fetch('https://www.anapioficeandfire.com/api/houses');
    //const data = await response.json();
    const data: House[] = [
      {
        address: "123 Main St",
        name: "House 1",
        price: 100000,
        description: "This is a house",
        image:
          "https://images.unsplash.com/photo-1584395630824-9d9d0d6b9b5c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
        id: 1,
      },
    ];
    setHouses(data);
  }, []);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const filteredHouses = houses.filter((house) => {
    return house.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Search Page</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <div className="row">
        {filteredHouses.map((house) => {
          return (
            <div className="col-md-4" key={house.name}>
              <HouseCard house={house} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
