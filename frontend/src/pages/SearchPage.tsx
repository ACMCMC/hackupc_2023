// This page contains a list of HouseCards that are filtered by the search bar

import React, { useState, useEffect } from "react";
import { HouseCard } from "../Components/HouseCard";
import { House } from "../models/House";
import { Box, Card, Checkbox, Collapse, FormControlLabel, FormGroup, Grid, List, Stack, TextField, Typography, easing } from "@mui/material";
import ChipArray, { ChipData } from "../Components/ChipArray";
import { TransitionGroup } from 'react-transition-group';
import { getCompletion, getHouses } from "../api/api";
import { alignProperty } from "@mui/material/styles/cssUtils";

var chipKey = 0;

export const SearchPage = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [chipData, setChipData] = React.useState<ChipData[]>([]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const addChip = (label: string) => {
    var trimmedLabel = label.trim();
    if (trimmedLabel === '')
      return; // don't add empty chips

    const newChip = {
      key: chipKey++,
      label: trimmedLabel,
      completed: false
    }

    setChipData((chips) => [
      ...chips,
      newChip
    ]);

    getCompletion(trimmedLabel).then((response) => {
      setChipData((chips) => {
        // Find the index of the chip with the same key as the new chip
        var index = chips.findIndex((chip) => chip.key === newChip.key);
        // Replace the chip with the new chip
        // Do a copy of the array so that React will rerender
        const newChips = chips.slice();
        newChips[index] = {
          key: newChip.key,
          label: response + ' ' + newChip.label,
          completed: true
        };
        return newChips;
      });
    }).catch((error) => {
      console.log(error);
    });

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
    // All chips need to be completed before we can filter houses
    var allChipsCompleted = chipData.every((chip) => chip.completed);
    if (!allChipsCompleted || chipData.length === 0)
      return;

    var labels = chipData.map((chip) => chip.label);
    getHouses(labels, false, false, 'score').then((response) => {
      setHouses([]);
      //setHouses(response);
    }).catch((error) => {
      console.log(error);
    });
  }, [chipData]);

  return (
    <Box
      margin={{ xs: 4, md: 8 }}
    >
      {/*<Box
        marginBottom={4}
      >
        <Typography typography={'h3'}>Search Page</Typography>
      </Box>*/}
      <TextField
        fullWidth
        variant="outlined"
        type="text"
        placeholder="Netflix, pizza, books..."
        value={searchTerm}
        onChange={handleTextFieldChange}
        onKeyDown={handleKeyDown}
      />
      <ChipArray chips={chipData} handleDelete={handleDelete}></ChipArray>
      <Grid container spacing={{md: 2}}>
        <Grid item xs={12} md={4}>
          <Card sx={{ width: { xs: '100%', md: 275 } }}
            variant="outlined"
          >
            <Box sx={{ display: 'flex', justifyContent: 'left' }}
              paddingTop={4} paddingX={2}>
              <Typography typography='h5' variant="h5">Filters</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}
              padding={2}>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Student" />
                <FormControlLabel control={<Checkbox />} label="Sustainable" />
              </FormGroup>
            </Box>
          </Card>
        </Grid>


        <Grid item xs={12} md={8}>
          <Stack direction="row" spacing={4}>
            <TransitionGroup>
              {houses.map((house) =>
                <Collapse key={house.id}>
                  <Box
                    sx={{
                      marginBottom: 4,
                    }}
                  >
                    <HouseCard house={house} />
                  </Box>
                </Collapse>
              )}
            </TransitionGroup>
          </Stack>
        </Grid>
      </Grid>
    </Box >
  );
};

export default SearchPage;
