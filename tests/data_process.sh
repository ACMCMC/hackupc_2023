#!/bin/bash
#SBATCH --job-name=data_process # Job name
#SBATCH --nodes=1                    # -N Run all processes on a single node   
#SBATCH --ntasks=1                   # -n Run a single task   
#SBATCH --cpus-per-task=32
#SBATCH --mem=64gb                    # Job memory request
#SBATCH --time=00:15:00              # Time limit hrs:min:sec
#SBATCH --output=run_%j.log       # Standard output and error log
#SBATCH --mail-type=ALL
#SBATCH --mail-user=aldan.creo@rai.usc.es
##SBATCH --qos=short
##SBATCH --gres=gpu:1

echo "Hostname: $(hostname)"
#module avail
ml cuda
#module list
export HF_DATASETS_CACHE="$LUSTRE/.cache"
export TRANSFORMERS_CACHE="$LUSTRE/.cache"
export DATASETS_VERBOSITY=info
export EVALUATE_VERBOSITY=info
export TRANSFORMERS_VERBOSITY=info

source $HOME/miniconda3/etc/profile.d/conda.sh
conda deactivate
conda activate hugging-face-tests
echo "Conda info:"
conda info
echo "Python route: $(which python)"

#export PYTORCH_CUDA_ALLOC_CONF="garbage_collection_threshold:0.6,max_split_size_mb:128"
python -u data_process.py
