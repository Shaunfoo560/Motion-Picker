import React from 'react'
import { Link } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import styled from "styled-components";

const Header = () => {
    return (
        <div>
            <Nav>
                <Link to={"/"}>
                    <IoMdHome size={65} color='brown' />
                </Link>
            </Nav>
            <h1 className="font-weight-bold display-3 text-center">
                Motion Picker
            </h1>
            <h2 className="font-weight-normal display-5 text-center">
                A place to review films
            </h2>
        </div >
    )
}

const Nav = styled.div`
  padding: 1rem 0rem;
  margin-left: auto;
  margin-right: auto;
  width: 7%;
  font-size: 3rem;
`

export default Header;