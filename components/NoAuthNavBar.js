/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Button, Nav,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NoAuthNavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Kids Play Soccer</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/teams">
              <Nav.Link>Team</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link>View Players</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link>Create Players</Nav.Link>
            </Link>
            <Button variant="outline-secondary" type="button" size="sm" className="signOutBtnNav" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
