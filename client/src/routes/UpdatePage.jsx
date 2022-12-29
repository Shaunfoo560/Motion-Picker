import React from 'react';
import UpdateMovie from "../components/UpdateMovie";
import { Link } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import styled from "styled-components";

const UpdatePage = () => {
  return (
    <div>
      <Nav>
        <Link to={"/"}>
          <IoMdHome size={65} color='brown' />
        </Link>
      </Nav>
      <h1 className="font-weight-bold display-6 text-center">Update Movie Details</h1>
      <br></br>
      <UpdateMovie />
    </div>
  )
}

const Nav = styled.div`
  padding: 1rem 0rem;
  margin-left: auto;
  margin-right: auto;
  width: 7%;
  font-size: 3rem;
`


export default UpdatePage;