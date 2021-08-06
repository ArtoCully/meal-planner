import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const LinkButton = (props: any) => {
  const { pathname } = useLocation();

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

  const newTo = to || pathname;

  return (
    <Link to={newTo}>
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
