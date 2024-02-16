from flask import Flask, request
from flask_cors import CORS
import os
import pandas as pd

app = Flask(__name__)
CORS(app)


@app.route("/api/visualize", methods=["POST"])
def visualize():
    file = request.files["file"]
    if file is not None and file.filename is not None:
        if not os.path.isdir(".files/"):
            os.mkdir(".files/")
        target = f".files/{file.filename.replace(" ", "_")}"
        file.save(target)
        file.close()
        try:
            csv = pd.read_csv(target)
            # TODO: Use matplotlib to plot the graphs and send it back to the frontend.
            # `csv` is a `DataFrame` containing the parsed CSV with headers.
            os.remove(target)
            # Ideally you would send the visualized data. Sending the csv representation directly here just to get it working.
            return csv.__repr__(), 200
        except UnicodeDecodeError as e:
            print(e.reason)
            os.remove(target)
            return f"Invalid File: {e.reason}", 403
    return "No Files.", 402


if __name__ == "__main__":
    app.run()
