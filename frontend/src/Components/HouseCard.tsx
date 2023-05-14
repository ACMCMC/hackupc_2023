/* This component is a card with:
 * on the left: a house image that is loaded from a remote URL
 * on the right: two rows
 * - the first row: the name of the house as an H1,
 * - the second row: the price, a short description, and a button that will navigate to the HouseDetails component.
 * The component will receive the house object as a prop.
 */

import React from "react";
import { House } from "../models/House";
import { Box, Card, CardContent, CardMedia, Fade, Grow, LinearProgress, Rating, Stack, Typography } from '@mui/material';
import ScoreIcon from '@mui/icons-material/Speed';
import StarIcon from '@mui/icons-material/Star';
import { alpha } from '@mui/material/styles';
import { useSpring, animated } from "react-spring";
import { getReview } from "../api/api";

interface Props {
    house: House;
}

const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export const HouseCard: React.FC<Props> = ({ house }) => {
    const [value, setValue] = React.useState<number | null>(2);
    const [hover, setHover] = React.useState(-1);
    const [generatedDescription, setGeneratedDescription] = React.useState<string | null>(null);
    const [generatingDescription, setGeneratingDescription] = React.useState<boolean>(false);

    const [{ elevation }, set] = useSpring(() => ({ elevation: 0 }));

    //console.log(elevation);

    const generateDescription = () => {
        setGeneratingDescription(true);

        getReview(house).then((response) => {
            setGeneratedDescription(response);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                bgcolor: 'background.paper',
                overflow: 'hidden',
                fontWeight: 'bold',
            }}
            variant="outlined"
            onMouseEnter={() => generateDescription()}
            onMouseLeave={() => set({ elevation: 0 })}
        >

            <CardMedia
                src={house.image}
                title="Image of the house"
                sx={{
                    height: 233,
                }}
                component="img"
            />
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: { xs: 'center', md: 'flex-start' },
                        //m: 3,
                        minWidth: { md: 350 },
                    }}
                >
                    <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
                        {house.address}
                    </Box>
                    <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
                        {house.name}
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
                    {/*<Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={0.5}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Stack>*/}
                    <Fade in={generatingDescription}>
                    <Box sx={{ width: '100%' }} marginTop={4} hidden={generatedDescription !== null || !generatingDescription}>
                        <LinearProgress />
                    </Box>
                    </Fade>
                    <Fade in={generatedDescription !== null}>
                        <Typography component={'p'} marginTop={2} color={(theme) => theme.palette.grey[700]}>{generatedDescription}</Typography>
                    </Fade>
                </Box>
            </CardContent>
        </Card>
    );
};
