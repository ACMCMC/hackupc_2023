// This page contains a list of HouseCards that are filtered by the search bar

import React, { useState, useEffect } from "react";
import { HouseCard } from "../Components/HouseCard";
import { House } from "../models/House";
import { Container, Box, TextField, Typography } from "@mui/material";

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
      {
        address: "123 Main St",
        name: "House 1",
        price: 999,
        description: "This is a house",
        image:
          "https://images.unsplash.com/photo-1584395630824-9d9d0d6b9b5c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
        id: 2,
      },
      {
        address: "123 Main St",
        name: "House 1",
        price: 500,
        description: "This is a house",
        image:
          "https://images.unsplash.com/photo-1584395630824-9d9d0d6b9b5c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
        id: 3,
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
    <Box
      margin={{ sm: 4, md: 8 }}
    >
      <Box
        marginBottom={4}
      >
        <Typography typography={'h3'}>Search Page</Typography>
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <div className="row">
        {filteredHouses.map((house) => {
          return (
            <Box
              marginY={{ xs: 4, md: 8 }}
            >
              <HouseCard house={house} />
            </Box>
          );
        })}
      </div>
    </Box>
  );
};

export default SearchPage;
