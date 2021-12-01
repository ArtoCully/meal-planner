import React from 'react';
import styled from 'styled-components';
import {
  Pane,
  Avatar,
  Popover,
  Menu,
  Button,
  Position,
  PeopleIcon,
  LogOutIcon,
  DeltaIcon,
} from 'evergreen-ui';
import { useHistory, Link } from 'react-router-dom';
import useProvideAuth from 'src/hooks/useProvideAuth';
import useAuth from 'src/hooks/useAuth';

const Header = styled(Pane)`
  background: white;
  border: 1px solid #EEEEEE;
  max-height: 50px;
  font-size: calc(10px + 2vmin);
  color: var(--global-colour-black);
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  padding: 10px;
`;

const LinkLogo = styled(Link)`
  height: auto;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  cursor: pointer;

  span {
    user-select: none;
  }
`;

export default function TopHeader() {
  const { currentUser, setCurrentUser } = useAuth();
  const { logout } = useProvideAuth();

  const history = useHistory();
  // TODO: currentUser prop should
  // be on the global state decide
  // how to do this then implement
  // could be redux/rxjs/contextprovider
  const handleLogout = async () => {
    const cleared = await logout();
    if (cleared) {
      setCurrentUser(null);
      history.push('/login');
    }
  }

  return (
    <Header is="header">
      <LinkLogo to="/"><DeltaIcon size={20} /></LinkLogo>
      {currentUser &&
      <Popover
        position={Position.BOTTOM_LEFT}
        content={
          <Menu>
            <Menu.Group>
              <Menu.Item disabled icon={PeopleIcon}>
                Profile
              </Menu.Item>
            </Menu.Group>
            <Menu.Divider />
            <Menu.Group>
              <Menu.Item icon={LogOutIcon} intent="none">
                <Button onClick={handleLogout}>Logout</Button>
              </Menu.Item>
            </Menu.Group>
          </Menu>
        }
      >
        <StyledAvatar
          name={currentUser.username}
          size={40}
        />
      </Popover>
      }
    </Header>
  )
}
