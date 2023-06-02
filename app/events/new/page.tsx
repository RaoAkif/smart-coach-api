'use client';
import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Stack,
  Textarea,
} from '@chakra-ui/react';

const NewEvent = () => {
  return (
    <FormControl>
      <div className="my-8">
        <FormLabel>Event Type</FormLabel>
        <Select placeholder="Select option">
          <option value="option1">PRACTICE</option>
          <option value="option2">MATCH</option>
          <option value="option3">OTHER</option>
        </Select>
      </div>
      <div className="my-8">
        <FormLabel>Date</FormLabel>
        <Input type="date" />
      </div>
      <div className="my-8">
        <FormLabel>Time</FormLabel>
        <Input type="time" />
      </div>
      <div className="my-8">
        <FormLabel>Location</FormLabel>
        <Input type="text" />
      </div>
      <div className="my-8">
        <FormLabel>Details</FormLabel>
        <Textarea placeholder="Here you can add details" />
      </div>
      <Stack direction="row" spacing={4}>
        <Button
          isLoading={false}
          loadingText="Submitting"
          colorScheme="teal"
          variant="outline"
        >
          Submit
        </Button>
      </Stack>
    </FormControl>
  );
};

export default NewEvent;
