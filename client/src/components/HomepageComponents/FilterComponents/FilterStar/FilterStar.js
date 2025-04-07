import ImportantStar from "../../../utils/ImportantStar/ImportantStar";

function FilterStar({ importantFilter, onChangeImportantFilter, id }) {
  return (
    <>
      <h4>Star</h4>
      <ImportantStar
        id={id}
        onClickImportant={onChangeImportantFilter}
        currentImportant={importantFilter}
      />
    </>
  );
}

export default FilterStar;
