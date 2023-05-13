// This page contains a list of HouseCards that are filtered by the search bar

import React, { useState, useEffect } from "react";
import { HouseCard } from "../Components/HouseCard";
import { House } from "../models/House";
import { Box, List, Stack, TextField, Typography, easing } from "@mui/material";
import ChipArray, { ChipData } from "../Components/ChipArray";
import { TransitionGroup } from 'react-transition-group';

interface RenderItemOptions {
  item: House;
  handleDeleteHouse: (item: House) => void;
}

function renderItem({ item, handleDeleteHouse }: RenderItemOptions) {
  return (
    <HouseCard house={item} />
  );
}

export const SearchPage = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [chipData, setChipData] = React.useState<ChipData[]>([]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const addChip = (label: string) => {
    setChipData((chips) => [
      ...chips,
      {
        key: chips.length,
        label: label,
      },
    ]);
    setSearchTerm('');
  };

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === ' ' || event.key === 'Enter') {
      addChip(searchTerm)
    }
  }

  useEffect(() => {
    //const fetchHouses = async () => {
    //const response = await fetch('https://www.anapioficeandfire.com/api/houses');
    //const data = await response.json();
    const example = {
      address: "123 Main St",
      name: "House 1",
      price: 100000,
      description: "This is a house",
      image:
        "https://images.unsplash.com/photo-1584395630824-9d9d0d6b9b5c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
      id: 1,
    }
    // Data is a list of num_examples examples
    const num_examples = chipData.length + 1;
    const data: House[] = [];
    for (let i = 0; i < num_examples; i++) {
      data.push(example);
    }

    setHouses(data);
  }, [chipData]);

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
        onChange={handleTextFieldChange}
        onKeyDown={handleKeyDown}
      />
      <ChipArray chips={chipData} handleDelete={handleDelete}></ChipArray>
      <Stack direction="column" spacing={4} divider>
        <TransitionGroup>
          {filteredHouses.map((house) =>
            renderItem({ item: house, handleDeleteHouse: () => { } })
          )}
        </TransitionGroup>
      </Stack>
    </Box>
  );
};

export default SearchPage;
