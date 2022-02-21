const Filter = ({ setFilterDisplay }) => {
  return (
    <select
      name="regions"
      className="w-48  rounded shadow"
      onChange={(event) => {
        setFilterDisplay(event.target.value);
      }}
    >
      <option value="" defaultValue>
        All Regions
      </option>
      <option value="Africa">Africa</option>
      <option value="America">America</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
};

export default Filter;
