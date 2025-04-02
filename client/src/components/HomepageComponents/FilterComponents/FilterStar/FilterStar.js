import ImportantStar from "../../../utils/ImportantStar/ImportantStar";

function FilterStar({ importantFilter, onChangeImportantFilter, id }) {
  return (
    <ImportantStar
      id={id}
      onClickImportant={onChangeImportantFilter}
      currentImportant={importantFilter}
    />
  );
}

export default FilterStar;
