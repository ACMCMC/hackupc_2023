import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Box } from '@mui/system';
import { useSpring, animated } from "react-spring";
import { Grow } from '@mui/material';

export interface ChipData {
  key: number;
  label: string;
  completed: boolean;
}

interface ChipArrayProps {
  chips: ChipData[];
  handleDelete: (chipToDelete: ChipData) => () => void;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipArray(props: ChipArrayProps) {
  // Run a function every 2 seconds
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
            <Grow key={data.key} in={true}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={props.handleDelete(data)}
              />
            </Grow>
          </ListItem>
        );
      })}
    </Box>
  );
}
