import React from 'react';
import { useRouter } from 'next/router';

export default function PortfolioProjectPage() {
  const router = useRouter();

  console.log(router.pathname, router.query.projectid);

  // send a request to some backend server
  // to fetch the piece of data with an id of router.query.projectid

  return (
    <div>
      <h1>The Portfolio Project Page</h1>
    </div>
  );
}
