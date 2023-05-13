/* This component is a card with:
 * on the left: a house image that is loaded from a remote URL
 * on the right: two rows
 * - the first row: the name of the house as an H1,
 * - the second row: the price, a short description, and a button that will navigate to the HouseDetails component.
 * The component will receive the house object as a prop.
 */

import React from "react";
import { House } from "../models/House";
import { Card, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { alpha } from '@mui/material/styles';

interface Props {
    house: House;
}

export const HouseCard: React.FC<Props> = ({ house }) => {
    return (
        <div>
            <Card>
                <img src={house.image} alt="House" />
                <h1>{house.name}</h1>
                <p>{house.price}</p>
                <p>{house.description}</p>
            </Card>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    boxShadow: 1,
                    fontWeight: 'bold',
                }}
            >
                <Box
                    component="img"
                    sx={{
                        height: 233,
                        width: 350,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="The house from the offer."
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: { xs: 'center', md: 'flex-start' },
                        m: 3,
                        minWidth: { md: 350 },
                    }}
                >
                    <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
                        123 Main St, Phoenix AZ
                    </Box>
                    <Box component="span" sx={{ color: 'primary.main', fontSize: 22 }}>
                        $280,000 — $310,000
                    </Box>
                    <Box
                        sx={{
                            mt: 1.5,
                            p: 0.5,
                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                            borderRadius: '5px',
                            color: 'primary.main',
                            fontWeight: 'medium',
                            display: 'flex',
                            fontSize: 12,
                            alignItems: 'center',
                            '& svg': {
                                fontSize: 21,
                                mr: 0.5,
                            },
                        }}
                    >
                        <ErrorOutlineIcon />
                        CONFIDENCE SCORE 85%
                    </Box>
                </Box>
            </Box>
        </div>
    );
};
