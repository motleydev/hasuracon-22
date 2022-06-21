# Using Hasura with the Vercel platform

It's important to understand three key concepts as to why I think these three work so well together.

1. Serverless, event-driven programming that manipulates a data store in both synchronous and asynchronous flows are good.
2. Best-of-breed software that allows for abstracting the different layers of the stack is a good thing (stack components)
3. Less code is a good thing. Rahms (gestalt theory)

alt -

The promise:
Hasura acts as the perfect server-state backend for apps built on Vercel.

and

How Vercel unlocks Hasura's power features with functions on the edge.

---

Let's break this down into parts:

1. What does "Hasura as server-state" mean
2. What is Vercel and what are these edge functions?

---

# Hasura fills two implicit functions in our builders tool kit

1. An API for data CRUD
2. An abstraction for our data as a data store

---

Traditional server architecture gives us ready to use state but requires long-running processes which are expensive and challening to scale.

Serverless scales really well, has transparent costs, but doesn't have access to a state.

---

Using Hasura allows us to manipulate state as data in our databases through API bindings, architecting side-effects in the process.

---

Now, regardless of framework or device, we can manipulate our stored data through serverless calls.

---

Not all serverless frameworks are created equal. Serverless and particularly serverless on the web needs:

1. Easy static hosting. Websites, CDN, etc
2. Serverless compute.

An eaven nicer approach would be if this was tailor made to work with a couple of frameworks for calling these functions and hehaviours.

---

## More slides

vercel allows us to bridge the gap between web framework and serverless platform

This new integration allows us to bridge the divide between these two platforms.

Update
