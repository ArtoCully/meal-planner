import React from 'react';
// import useUserContext from '../../hooks/useUserContext';

interface IMatch {
  key: string,
  isArray: boolean,
  value?: string,
}

interface IPrivateComponentProps {
  component?: React.ReactNode,
  match?: IMatch,
}

const PrivateComponent: React.FC<IPrivateComponentProps> = ({ component, match, ...rest }) => {
    // const { currentUser } = useUserContext();
    const Component = component as any;

    // if (!currentUser) {
    //   return null;
    // }

    // if (!match) {
    //   return null;
    // }

    // const key = currentUser[match.key];
    // let hasMatch = false;

    // if (!key) {
    //   return null;
    // }

    // if (match.isArray) {
    //   hasMatch = key.find((f: string) => f === match.value);
    // } else {
    //   hasMatch = key === match.value;
    // }

    // // console.log('key', key);
    // // console.log('match.value', match.value);
    // // console.log('key.find', key.find((f: string) => f === match.value));

    // if (!hasMatch) {
    //   return null;
    // }

    return <Component {...rest} />
}

export default PrivateComponent;
