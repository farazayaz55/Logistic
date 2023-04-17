import { useEffect } from 'react';
import { trpc } from '../utils/trpc';
export default function IndexPage() {
  const hello = trpc.hello.useQuery({ text: 'client' });
  const bye=trpc.bye.useMutation()

  useEffect(()=>
  bye.mutate({text:"Faraz"})
  ,[])

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