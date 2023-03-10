import Link from 'next/link';
import React from 'react';

export default function ClientsPage() {
  const clients = [
    { id: 'greg', name: 'Grégory' },
    { id: 'max', name: 'Maximilian' },
    { id: 'dani', name: 'Daniel' },
  ];
  return (
    <div>
      <h1>My clients page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link
              href={{ pathname: '/clients/[id]', query: { id: client.id } }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
