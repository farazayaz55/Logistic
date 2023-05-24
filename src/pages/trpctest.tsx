import { useEffect } from 'react';
import { api } from '../utils/trpc';
export default function IndexPage() {


  const hello = api.firstRouter.hello.useQuery({ text: 'client' });


  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
      <p>{bye.data?.greeting}</p>
    </div>
  );
}