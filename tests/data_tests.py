# %%
import datasets
from utils import LUSTRE_DIR

# %%
# Load the dataset from LUSTRE_DIR + 'hackupc/hackupc2023_restbai_dataset'

dataset = datasets.Dataset.load_from_disk(LUSTRE_DIR + 'hackupc/hackupc2023_restbai_dataset')

# %%
# Plot the histogram of the price per square meter. They are stored in the 'price' and 'square_meters' columns. Some of them are None, so we filter them out.
def add_price_per_sq_meter(batch):
    # There may be None values in the price or square_meters columns, so we filter them out
    # The columns are lists, so we use list comprehension
    batch['price_per_sq_meter'] = [price / sq_meters for price, sq_meters in zip(batch['price'], batch['square_meters']) if price is not None and sq_meters is not None]
    return batch

dataset = dataset.map(add_price_per_sq_meter, batched=True, batch_size=20)

# %%
# Remove outliers, i.e. prices that are above the 95th percentile or below the 5th percentile
import numpy as np
square_meter_prices = np.array([x['price'] / x['square_meters'] for x in examples])
square_meter_prices_filtered = square_meter_prices[(square_meter_prices > np.percentile(square_meter_prices, 5)) & (square_meter_prices < np.percentile(square_meter_prices, 95))]

import matplotlib.pyplot as plt

plt.hist(square_meter_prices_filtered, bins=50)

# Draw a box plot of the prices
plt.figure()
plt.boxplot(square_meter_prices_filtered)
# %%
# Now, plot a 2d scatter plot of the number of rooms vs the price per square meter

plt.figure()

plt.scatter([x['bedrooms'] for x in examples], square_meter_prices)

# %%
