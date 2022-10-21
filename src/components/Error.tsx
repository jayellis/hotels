import React from 'react';

type ErrorProps = {
  message: string;
};
const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className='alert alert-error'>
      <p>
        {message}
      </p>
    </div>
  );
};

export default Error;

