# %%
import datasets
from utils import LUSTRE_DIR

# %%
# Load the JSON dataset from 'hackupc2023_restbai__dataset_sample.json'. It is stored on disk.
# The dataset is a dictionary of the form {id: example}. Each example is a dictionary of the form {column_name: value}.
# We need to convert the JSON file to a dictionary first, and incorporate the id as a column.

import pandas as pd
import json

with open(LUSTRE_DIR + 'hackupc/hackupc2023_restbai__dataset.json') as f:
    data = json.load(f)

df = pd.DataFrame.from_dict(data, orient='index')
df['id'] = df.index
df = df.reset_index(drop=True)

# Convert it to a dataset
dataset = datasets.Dataset.from_pandas(df)

# %%
# Save the dataset to the LUSTRE_DIR + 'hackupc/hackupc2023_restbai_dataset'
dataset.save_to_disk(LUSTRE_DIR + 'hackupc/hackupc2023_restbai_dataset')