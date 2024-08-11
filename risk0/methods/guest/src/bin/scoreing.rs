// Copyright 2023 RISC Zero, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

use std::io::Read;

use alloy_primitives::U256;
use alloy_primitives::FixedBytes;
use alloy_sol_types::SolValue;
use risc0_zkvm::guest::env;

fn scoring(a : FixedBytes<10>, b: FixedBytes<10>) -> u32{
    let mut score = (a[0] - b[0]) * (a[0] - b[0]);
    for i in 1..10 {
        score = score + (a[i] - b[i]) * (a[i] - b[i]);
    }
    return f32::sqrt(score as f32) as u32;
}

fn main() {
    // Read the input data for this application.
    // let mut input_bytes = Vec::<u8>::new();
    // env::stdin().read_to_end(&mut input_bytes).unwrap();

    let mut reference_vector_bytes = Vec::<u8>::new();
    env::stdin().read_to_end(&mut reference_vector_bytes).unwrap();

    let mut submitted_vector_bytes = Vec::<u8>::new();
    env::stdin().read_to_end(&mut submitted_vector_bytes).unwrap();

    let reference_vector = <FixedBytes<10>>::abi_decode(&reference_vector_bytes, true).unwrap();
    let submitted_vector = <FixedBytes<10>>::abi_decode(&submitted_vector_bytes, true).unwrap(); 


    let score = scoring(reference_vector, submitted_vector);
    
    

    // Run the computation.
    // In this case, asserting that the provided number is even.
    assert!( score == scoring(reference_vector, submitted_vector) , "scoring is not correct!");
    let score_encode : U256 =  U256::from(score);

    // Commit the journal that will be received by the application contract.
    // Journal is encoded using Solidity ABI for easy decoding in the app contract.
    env::commit_slice(score_encode.abi_encode().as_slice());
}
