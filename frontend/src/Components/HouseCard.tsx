/* This component is a card with:
 * on the left: a house image that is loaded from a remote URL
 * on the right: two rows
 * - the first row: the name of the house as an H1,
 * - the second row: the price, a short description, and a button that will navigate to the HouseDetails component.
 * The component will receive the house object as a prop.
 */

import React from "react";
import { House } from "../models/House";
import { Box, Card } from '@mui/material';
import ScoreIcon from '@mui/icons-material/Speed';
import { alpha } from '@mui/material/styles';
import { useSpring, animated } from "react-spring";

interface Props {
    house: House;
}

export const HouseCard: React.FC<Props> = ({ house }) => {
    const [{ elevation }, set] = useSpring(() => ({ elevation: 0 }));

    console.log(elevation);

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                bgcolor: 'background.paper',
                overflow: 'hidden',
                borderRadius: '12px',
                fontWeight: 'bold',
            }}
            variant="outlined"
            onMouseEnter={() => set({ elevation: 1 })}
            onMouseLeave={() => set({ elevation: 0 })}
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
                    {house.id} | {house.address}
                </Box>
                <Box component="span" sx={{ color: theme => theme.palette.secondary.main, fontSize: 22 }}>
                    € {house.price}
                </Box>
                <Box
                    sx={{
                        mt: 1.5,
                        p: 0.5,
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                        borderRadius: '5px',
                        color: (theme) => alpha(theme.palette.primary.main, 1),
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
                    <ScoreIcon />
                    MATCH SCORE: 80%
                </Box>
            </Box>
        </Card>
    );
};
