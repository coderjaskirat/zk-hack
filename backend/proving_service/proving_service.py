import ezkl
import numpy as np
import os
import json
import asyncio


compiled_model_path = os.path.join("network.compiled")
pk_path = os.path.join("test.pk")
vk_path = os.path.join("test.vk")
settings_path = os.path.join("settings.json")
data_path = os.path.join("input.json")
witness_path = os.path.join("witness.json")


# called once.
async def setup_service(model):

    model_path = os.path.join(model)

    py_run_args = ezkl.PyRunArgs()
    py_run_args.input_visibility = "public"
    py_run_args.output_visibility = "public"
    py_run_args.param_visibility = "fixed"  # "fixed" for params means that the committed to params are used for all proofs

    # the calibration step (to find a better srs size) needs at least one input
    dummy_input = np.random.rand(1, 1, 32, 32).astype(np.float32)

    data = {data_path: [dummy_input.reshape([-1]).tolist()]}
    with open("input.json", "w") as f:
        json.dump(data, f)

    ezkl.gen_settings(model_path, settings_path, py_run_args=py_run_args)

    # await ezkl.calibrate_settings(model_path, settings_path, data_path, target='resources') # this step is optional

    ezkl.compile_circuit(model_path, compiled_model_path, settings_path)
    ezkl.get_srs("settings.json")

    ezkl.setup(
        compiled_model_path,
        vk_path,
        pk_path,
    )

    # get the evm verifier
    ezkl.create_evm_verifier(vk_path, settings_path, sol_code_path="verifier.sol")


async def eval_submission(picture: np.array):
    compiled_model_path = os.path.join("network.compiled")
    proof_path = os.path.join("proof.json")
    data = {"input_data": [picture.reshape([-1]).tolist()]}
    with open("input.json", "w") as f:
        json.dump(data, f)
    await ezkl.gen_witness(data_path, compiled_model_path, witness_path)
    ezkl.prove(
        witness_path,
        compiled_model_path,
        pk_path,
        proof_path,
        "single",
    )
    with open(proof_path) as fp:
        proof = json.load(fp)
        return proof
