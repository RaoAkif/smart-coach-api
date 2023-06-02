'use client';
import Link from 'next/link';
import React from 'react';
import { Button } from '@chakra-ui/react';

const Events = () => {
  return (
    <div className="my-8">
      <Link href={'/events/new'}>
        <Button colorScheme="blue">Create an Event</Button>
      </Link>
    </div>
  );
};

export default Events;
