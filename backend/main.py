from flask import Flask, send_from_directory, request
import json
import proving_service
import asyncio
import numpy as np

app = Flask(__name__)
loop = asyncio.get_event_loop()
asyncio.set_event_loop(loop)


@app.route("/")
def testform():
    return send_from_directory("static", "test.html")


@app.route("/evaluatedrawing", methods=["POST"])
def evaluate_drawing():
    data = request.form["drawing"]
    drawing = np.asarray(json.loads(data)["input_data"])

    res = proving_service.eval_submission(drawing)

    asyncio.set_event_loop(asyncio.SelectorEventLoop())
    loop = asyncio.get_event_loop()

    proof_json = loop.run_until_complete(res)
    return proof_json


async def main():
    await proving_service.setup_service("models/ezkl-lenet.onnx")


# main driver function
if __name__ == "__main__":
    print("setting up ezkl proving env....")
    asyncio.run(main())
    print("launching service ....")
    app.run()
