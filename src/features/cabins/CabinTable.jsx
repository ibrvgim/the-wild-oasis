import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { useCabins } from "./useCabins";

function CabinTable() {
  const [searchParams] = useSearchParams();

  const { isLoading, cabins } = useCabins();

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourcesName="cabins" />;

  // FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabin;

  switch (filterValue) {
    case "all":
      filteredCabin = cabins;
      break;

    case "without-discount":
      filteredCabin = cabins.filter((cabin) => !cabin.discount);
      break;

    case "with-discount":
      filteredCabin = cabins.filter((cabin) => cabin.discount);
      break;
  }

  // SORT BY

  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");

  const sortedCabin = filteredCabin
    .slice()
    .sort((a, b) =>
      direction === "asc" ? a[field] - b[field] : b[field] - a[field]
    );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
