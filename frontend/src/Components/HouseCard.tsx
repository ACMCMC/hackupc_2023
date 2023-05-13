/* This component is a card with:
 * on the left: a house image that is loaded from a remote URL
 * on the right: two rows
 * - the first row: the name of the house as an H1,
 * - the second row: the price, a short description, and a button that will navigate to the HouseDetails component.
 * The component will receive the house object as a prop.
 */

import React from "react";
import { House } from "../models/House";
import { Card } from '@mui/material';

interface Props {
    house: House;
}

export const HouseCard: React.FC<Props> = ({ house }) => {
    return (
        <Card>
            <img src={house.image} alt="House" />
            <h1>{house.name}</h1>
            <p>{house.price}</p>
            <p>{house.description}</p>
        </Card>
    );
};
