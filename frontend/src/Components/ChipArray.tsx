import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Box } from '@mui/system';
import { useSpring, animated } from "react-spring";

export interface ChipData {
  key: number;
  label: string;
}

interface ChipArrayProps {
    chips: ChipData[];
    handleDelete: (chipToDelete: ChipData) => () => void;
  }

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipArray(props: ChipArrayProps) {
  return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 0.5,
          m: 0,
          minHeight: '8vh'
        }}
        component="ul"
      >
        {props.chips.map((data) => {
          let icon;
          return (
            <ListItem key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={props.handleDelete(data)}
              />
            </ListItem>
          );
        })}
      </Box>
  );
}
