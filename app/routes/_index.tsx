import { defer, type MetaFunction } from "@vercel/remix";
import { Await, useLoaderData } from "@remix-run/react";
import { GetUserReturns, getUser } from "dbschema/queries";
import { Suspense } from "react";
import { client } from "~/services/edgedb";

export function loader() {
  const user: Promise<GetUserReturns> = getUser(client);

  return defer({
    user,
  });
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const userMarkup = (user: Promise<GetUserReturns>) => {
  return (
    <Suspense fallback="Loading...">
      <Await resolve={user}>
        {(user) => {
          return <>{user?.username ?? "user"}</>;
        }}
      </Await>
    </Suspense>
  );
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix, {userMarkup(user)}!</h1>
    </div>
  );
}
