import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <div>
        <span className="footer-title">GraphQL Engine</span>
        <a href="https://hasura.io/cloud/" className="link link-hover">
          Hasura Cloud
        </a>
        <a href="https://hasura.io/opensource/" className="link link-hover">
          Hasura CE
        </a>
        <a href="https://hasura.io/enterprise/" className="link link-hover">
          Hasura EE
        </a>
        <a
          href="https://www.youtube.com/watch?v=FEk9Li05Ye4"
          className="link link-hover"
        >
          What is Hasura
        </a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a href="https://hasura.io/about/" className="link link-hover">
          About us
        </a>
        <a href="https://discord.com/invite/hasura" className="link link-hover">
          Contact
        </a>
        <a href="https://hasura.io/careers/" className="link link-hover">
          Jobs
        </a>
        <a href="https://hasura.io/press/" className="link link-hover">
          Press kit
        </a>
      </div>
      <div>
        <span className="footer-title">Further Learning</span>
        <a
          href="https://hasura.io/docs/latest/graphql/core/index.html"
          className="link link-hover"
        >
          Documentation
        </a>
        <a
          href="https://github.com/hasura/graphql-engine"
          className="link link-hover"
        >
          Github
        </a>
        <a
          href="https://www.youtube.com/channel/UCZo1ciR8pZvdD3Wxp9aSNhQ"
          className="link link-hover"
        >
          Youtube
        </a>
      </div>
    </footer>
  );
}
