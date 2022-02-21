const Card = ({ flag, name, population, region, capital }) => {
  return (
    <div className="flex flex-col w-80 h-96 shadow rounded m-3">
      <img src={flag} alt="flag" className="h-1/2 w-full" />
      <div className="h-1/2 px-4 py-4">
        <h1 className="font-bold">{name}</h1>
        <div className="py-3">
          <p>Population: {population.toLocaleString()}</p>
          <p>Region: {region}</p>
          <p>Capital: {capital}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
