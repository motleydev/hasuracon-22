import React from "react";
import { useStore } from "../store/store";

type Props = {};

export default function Signup({}: Props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signup } = useStore();

  const handleSubmit = () => {
    signup(username, password);
  };

  return (
    <div>
      <article className="prose">
        <h2>Signup!</h2>
      </article>
      <div>
        <div className="form-control w-full max-w-xs space-y-4">
          <label className="label">
            <span className="label-text">Please choose a secret phrase</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="password"
            placeholder="Password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
