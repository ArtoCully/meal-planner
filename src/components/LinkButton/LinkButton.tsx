import React from 'react';
import { Link } from 'react-router-dom';

const LinkButton = (props: any) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    text,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props;

  return (
    <Link to={to}>
      <button
        {...rest} // `children` is just another prop!
        onClick={(event) => {
          onClick && onClick(event)
          history.push(to)
        }}
      >
        {text}
      </button>
    </Link>
  )
}

export default LinkButton;
