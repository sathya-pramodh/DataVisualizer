from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/api/visualize", methods=["POST"])
def visualize():
    # TODO: Implement getting data from the file sent as a csv and then read it using pandas.
    # Then use matplotlib to plot the graphs and send it back to the frontend.
    return jsonify(request.json)


if __name__ == "__main__":
    app.run()
