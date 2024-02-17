import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
import os
matplotlib.use('agg')


def visualize_target(target):
    plt.ioff()
    csv_frame = pd.read_csv(target)
    for idx, header in enumerate(csv_frame.head()):
        if "id" == header:
            continue
        _, ax = plt.subplots()
        ax.hist(csv_frame[header], bins=20, color='skyblue', edgecolor='black')
        ax.set_title(f'{header} Distribution')
        ax.set_xlabel(header)
        ax.set_ylabel('Count')
        plt.savefig(f".files/plot{idx}.png")
        plt.close()

    os.remove(target)
    return "Saved Plots!"
