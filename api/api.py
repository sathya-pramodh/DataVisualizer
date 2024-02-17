from flask import Flask, make_response, request, send_file
from flask_cors import CORS
import os
import zipfile

from visualize import visualize_target

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
            return visualize_target(target), 200
        except UnicodeDecodeError as e:
            print(e.reason)
            os.remove(target)
            return f"Invalid File: {e.reason}", 403
    return "No Files.", 402


@app.route("/api/get-recent-plots", methods=["GET"])
def get_recent_plots():
    zipf = zipfile.ZipFile(".files/plots.zip", "w", zipfile.ZIP_DEFLATED)
    dir = os.listdir(".files/")
    for file in dir:
        if file.endswith(".png"):
            zipf.write(f".files/{file}")
    zipf.close()

    response = make_response(
        send_file(".files/plots.zip", mimetype="zip", as_attachment=True))
    response.headers['Content-Transfer-Encoding'] = 'base64'

    for file in os.listdir(".files/"):
        os.remove(f".files/{file}")

    return response, 200


if __name__ == "__main__":
    app.run()
