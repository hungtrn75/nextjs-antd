import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { requireSignedIn } from "../utils/AuthService";

const Home = () => (
  <>
    <Layout />
  </>
);

export default requireSignedIn(Home);
