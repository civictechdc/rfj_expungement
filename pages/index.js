import React from "react";
import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";
import BodyView from "../components/bodyview";
import Button from "@material-ui/core/Button";


const Home = () => (
  <div>

    <Button variant="contained" color="primary">
      Hello World
    </Button>
    <BodyView rulesData={{okay:"Okay!"}} />

  </div>
);

export default Home;
