import Head from "next/head";
import Header from "../components/Header/Header";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const data = await res.json();
  const paths = data.map((country) => {
    return {
      params: { id: country.alpha3Code },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("https://restcountries.com/v2/alpha/" + id);
  const data = await res.json();
  const borders = data.borders ?? [];
  let borderData = [];

  if (Boolean(borders.length)) {
    const borderRes = await fetch(
      `https://restcountries.com/v2/alpha?codes=${borders.join(",")}`
    );
    borderData = await borderRes.json();
  }

  return {
    props: {
      country: data,
      borderCountries:
        Array.isArray(borderData) && borderData.map(({ name }) => name),
    },
  };
};

const Details = ({ country, borderCountries = [] }) => {
  return (
    <div className="font-body">
      <Head>
        <title>{country.name}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Header />
      <div className="flex w-full h-28 px-16 py-10">
        <Link href="/">
          <button className="inline-flex items-center border px-7 shadow rounded">
            <BsArrowLeft />
            Back
          </button>
        </Link>
      </div>
      <div className="flex w-full">
        <div className="w-1/2 px-16">
          <img src={country.flag} alt="flag" className="border-2" />
        </div>
        <div className="w-1/2 pt-8">
          <h1 className="font-bold text-3xl">{country.name}</h1>
          <div className="flex mt-9">
            <div className="w-1/2 space-y-3.5">
              <p>
                <span className="font-bold">Native Name: </span>
                {country.nativeName}
              </p>
              <p>
                <span className="font-bold">Population: </span>
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-bold">Region: </span>
                {country.region}
              </p>
              <p>
                <span className="font-bold">Sub Region: </span>
                {country.subregion}
              </p>
              <p>
                <span className="font-bold">Capital: </span>
                {country.capital}
              </p>
            </div>
            <div className="w-1/2 space-y-3.5">
              <p>
                <span className="font-bold">Top Level Domain: </span>
                {country.topLevelDomain}
              </p>
              <p>
                <span className="font-bold">Currency: </span>
                {country.currencies?.map((currency, index, array) => (
                  <span key={currency}>
                    {currency.name}
                    {index + 1 !== array.length && ", "}
                  </span>
                ))}
              </p>
              <p>
                <span className="font-bold">Languages: </span>
                {country.languages.map((language, index, array) => (
                  <span key={language}>
                    {language.name}
                    {index + 1 !== array.length && ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="mt-12">
            <p>
              <span className="font-bold">Border Countries: </span>
              {borderCountries.map((name) => (
                <span
                  key={name}
                  className="mr-1.5 shadow-sm rounded p-1.5 border-solid border-2"
                >
                  {name}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
