import React from "react";
import Login from "./Login";
import Signup from "./Signup";

type Props = {};

type ActionBtnProps = {
  action: Function;
  value: string;
  children: React.ReactNode;
};

const CONSTS = {
  SINGUP: "signup",
  LOGIN: "login",
};

const ActionButton = ({ action, children, value }: ActionBtnProps) => (
  <button
    onClick={() => action(value)}
    className="btn btn-sm btn-primary align-middle"
  >
    {children}
  </button>
);

export default function NeedsAuth({}: Props) {
  const [actionNeeded, setActionNeeded] = React.useState(CONSTS.LOGIN);

  return (
    <div>
      <div className="mb-6">
        <article className="prose">
          <h1>
            <span>Welcome, would you like to join us? You&apos;ll need to</span>
            <ActionButton action={setActionNeeded} value={CONSTS.SINGUP}>
              <span>signup</span>
            </ActionButton>
            <span>or</span>
            <ActionButton action={setActionNeeded} value={CONSTS.LOGIN}>
              <span>login</span>
            </ActionButton>
            <span>to continue.</span>
          </h1>
        </article>
      </div>
      <div>
        {actionNeeded === CONSTS.SINGUP && <Signup />}
        {actionNeeded === CONSTS.LOGIN && <Login />}
      </div>
    </div>
  );
}
