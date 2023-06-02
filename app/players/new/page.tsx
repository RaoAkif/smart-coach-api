'use client';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormValues = {
  name: String;
  position: String;
  contact: String;
};

const NewPlayer = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    contact: '',
  });
  const { register, handleSubmit, formState, control, getValues } =
    useForm<FormValues>();
  const { errors } = formState;
  const { name, ref, onChange, onBlur } = register('position');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const onSubmit = async (data: FormValues) => {
    const playerName = getValues('name');
    const playerPosition = getValues('position');
    const playerContactInfo = getValues('contact');
    const apiData = {
      playerName,
      playerPosition,
      playerContactInfo,
    };
    console.log(JSON.stringify(apiData));
    const result = await fetch('http://localhost:3000/api/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData),
    });
    const res = await result.json();
    console.log('Result Received from API ENDPOINT: ', res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormControl>
        <div className="my-8">
          <FormLabel>Player Name</FormLabel>
          <Input
            type="text"
            {...register('name', {
              required: 'Name is required!',
              validate: (fieldValue) => {
                return fieldValue !== 'john' || 'Enter a different name';
              },
            })}
          />
          <p>{errors.name?.message}</p>
        </div>
        <div className="my-8">
          <FormLabel>Position</FormLabel>
          <Select
            placeholder="Select Player Position"
            {...register('position', {
              required: {
                value: true,
                message: 'Player Position is required',
              },
              validate: (fieldValue) => {
                return (
                  fieldValue !== 'GOAL_KEEPER' || 'Enter a different position'
                );
              },
            })}
            name={'position'}
          >
            <option value="GOAL_KEEPER">GOAL_KEEPER</option>
            <option value="FULL_BACK_RIGHT">FULL_BACK_RIGHT</option>
            <option value="FULL_BACK_LEFT">FULL_BACK_LEFT</option>
            <option value="CENTRE_BACK">CENTRE_BACK</option>
            <option value="SWEEPER">SWEEPER</option>
            <option value="DEFENSIVE_MIDFIELD_RIGHT">
              DEFENSIVE_MIDFIELD_RIGHT
            </option>
            <option value="DEFENSIVE_MIDFIELD_LEFT">
              DEFENSIVE_MIDFIELD_LEFT
            </option>
            <option value="SECOND_STRIKER">SECOND_STRIKER</option>
            <option value="CENTRE_FORWARD">CENTRE_FORWARD</option>
          </Select>
          <p>{errors.position?.message}</p>
        </div>
        <div className="my-8">
          <FormLabel>Contact</FormLabel>
          <Input
            type="text"
            {...register('contact', {
              required: {
                value: true,
                message: 'Contact is required',
              },
            })}
          />
          <p>{errors.contact?.message}</p>
        </div>
        <div className="my-8">
          <Button
            colorScheme="blue"
            type="submit"
            onClick={() => console.log('Clicked')}
          >
            Button
          </Button>
        </div>
      </FormControl>
      <DevTool control={control} />
    </form>
  );
};

export default NewPlayer;
