import Head from "next/head";
import Header from "../components/Header/Header";
import Searchbar from "../components/Searchbar/Searchbar";
import Filter from "../components/Filter/Filter";
import Card from "../components/Card/Card";
import Link from "next/link";
import { useState } from "react";

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const data = await res.json();
  return { props: { countries: data } };
};

export default function Home({ countries }) {
  const [search, setSearch] = useState("");
  const [filterDisplay, setFilterDisplay] = useState("");

  return (
    <div className="font-body">
      <Head>
        <title>Around the world!</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Header />
      <div className="flex justify-between px-16 py-8">
        <Searchbar setSearch={setSearch} />
        <Filter setFilterDisplay={setFilterDisplay} />
      </div>
      <div className="flex px-16 flex-wrap -m-3 justify-center">
        {countries
          .filter((value) => {
            if (search == "") {
              return value;
            } else if (
              value.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return value;
            }
          })
          .filter((val) => {
            if (filterDisplay == "") {
              return val;
            } else if (val.region.includes(filterDisplay)) {
              return val;
            }
          })
          .map((country) => (
            <Link
              key={country.alpha3Code}
              passHref
              href={"/" + country.alpha3Code}
            >
              <a>
                <Card {...country} />
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
}
