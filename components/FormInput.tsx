import React from "react";
import {
  InsertFruit,
  InsertFruitMutation,
  InsertFruitMutationVariables,
} from "../generated/graphql";
import { client } from "../utils/client";

type Props = {};

export default function FormInput({}: Props) {
  const [input, setInput] = React.useState("");

  const handleInput = (e: any) => {
    e.preventDefault();
    client
      .mutation<InsertFruitMutation, InsertFruitMutationVariables>(
        InsertFruit,
        {
          fruit: input,
        }
      )
      .toPromise()
      .then((d) => {
        if (d.error) {
          console.log(d.error.graphQLErrors);
        }
        setInput("");
      });
  };
  return (
    <form onSubmit={handleInput}>
      <input
        type="text"
        placeholder="Type here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input input-bordered input-primary w-full max-w-xs mb-4"
      />
      <input type="submit" hidden />
    </form>
  );
}
