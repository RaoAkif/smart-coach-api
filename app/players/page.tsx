'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

const Players = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/players');
      const result = await response.json();
      setPlayers(result);
    };
    fetchData();
  }, []);

  return (
    <div className="my-8">
      <Link href={'/players/new'}>
        <Button colorScheme="blue">Add a Player</Button>
      </Link>
      <h2>All Players</h2>
      <ul>
        {players &&
          players.map((player) => {
            return <li>{player?.name}</li>;
          })}
      </ul>
    </div>
  );
};

export default Players;
