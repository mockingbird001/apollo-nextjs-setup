import Head from "next/head";
import { useQuery, gql } from "@apollo/client";

const MyQuery = gql`
  query MyQuery {
    name
  }
`;

export default function Home() {
  const { data, loading } = useQuery(MyQuery);

  if (loading) return <span>loading...</span>;
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
