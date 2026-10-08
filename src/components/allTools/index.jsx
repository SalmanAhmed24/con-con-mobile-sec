import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import allToolsTable from "../tables/toolTrackTable";
import AllToolsTable from "../tables/allToolsTable";

const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function AllTools({ module, toolNumber, userInfo }) {
  // const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTools, setAllTools] = useState([]);
  const [toolFlag, setToolFlag] = useState(false);
  const [toolLabel, setToolLabel] = useState("");
  const [filterVal, setFilterVal] = useState({
    label: "Tool No",
    value: "Tool No",
  });
  const [search, setSearch] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/allTools/`)
      .then((res) => {
        console.log("####", res.data.allTools);

        const filteredTool = res.data.allTools.filter(
          (i) => i.techAssigned == userInfo.fullname
        );
        setAllTools(filteredTool);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  // const handleCloseDrawer = () => {
  //   setDrawer(!drawer);
  // };
  // const addStorageLocations = (data) => {
  //   axios
  //     .post(`${apiPath.prodPath}/api/storageLocation/addStorageLocation`, data)
  //     .then((res) => {
  //       handleCloseDrawer();
  //       refreshData();
  //     })
  //     .catch((err) => console.log(err));
  // };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/allTools/`)
      .then((res) => {
        console.log("####", res.data.allTools);

        const filteredTool = res.data.allTools.filter(
          (i) => i.techAssigned == userInfo.fullname
        );
        setAllTools(filteredTool);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const searchFormHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(
        `${apiPath.prodPath}/api/allTools/searchTool/?search=${search}&&filterVal=${filterVal.value}`
      )
      .then((res) => {
        if (module == "all tools") {
          setAllTools(res.data.allTools);
          setLoading(false);
        }
        if (module == "individual") {
          const filteredTool = res.data.allTools.filter(
            (i) => i.techAssigned == userInfo.fullname
          );
          setAllTools(filteredTool);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleClear = () => {
    console.log("clicked");
    setSearch("");
    refreshData();
  };
  const handleToolSorting = (toolSortLable, toolSortFlag) => {
    if (toolSortLable == "Last Updated") {
      setToolLabel("Last Updated");
      const sortedData =
        toolSortFlag == false
          ? allTools.sort((a, b) => a.lastUpdated.localeCompare(b.lastUpdated))
          : allTools.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
      setAllTools(sortedData);
    }
    if (toolSortLable == "Category") {
      setToolLabel("Category");
      const sortedData =
        toolSortFlag == false
          ? allTools.sort((a, b) => a.category.localeCompare(b.category))
          : allTools.sort((a, b) => b.category.localeCompare(a.category));
      setAllTools(sortedData);
    }

    if (toolSortLable == "Sub-Category") {
      setToolLabel("Sub-Category");
      const sortedData =
        toolSortFlag == false
          ? allTools.sort((a, b) => a.subCategory.localeCompare(b.subCategory))
          : allTools.sort((a, b) => b.subCategory.localeCompare(a.subCategory));
      setAllTools(sortedData);
    }
    if (toolSortLable == "Brand") {
      setToolLabel("Brand");
      const sortedData =
        toolSortFlag == false
          ? allTools.sort((a, b) => a.brand.localeCompare(b.brand))
          : allTools.sort((a, b) => b.brand.localeCompare(a.brand));
      setAllTools(sortedData);
    }
    if (toolSortLable == "Description") {
      setToolLabel("Description");
      const sortedData =
        toolSortFlag == false
          ? allTools.sort((a, b) =>
              a.toolDescription.localeCompare(b.toolDescription)
            )
          : allTools.sort((a, b) =>
              b.toolDescription.localeCompare(a.toolDescription)
            );
      setAllTools(sortedData);
    }
    if (toolSortLable == "Tech Assigned") {
      setToolLabel("Tech Assigned");
      const sortedData =
        toolSortFlag == false
          ? allTools.sort((a, b) =>
              a.techAssigned.localeCompare(b.techAssigned)
            )
          : allTools.sort((a, b) =>
              b.techAssigned.localeCompare(a.techAssigned)
            );
      setAllTools(sortedData);
    }
    if (toolSortLable == "Project") {
      setToolLabel("Project");
      const sortedData =
        toolSortFlag == false
          ? allTools.sort((a, b) => a.job.localeCompare(b.job))
          : allTools.sort((a, b) => b.job.localeCompare(a.job));
      setAllTools(sortedData);
    }
    if (toolSortLable == "Vehicle") {
      setToolLabel("Vehicle");
      const sortedData =
        toolSortFlag == false
          ? allTools.sort((a, b) => a.vehicle.localeCompare(b.vehicle))
          : allTools.sort((a, b) => b.vehicle.localeCompare(a.vehicle));
      setAllTools(sortedData);
    }
    if (toolSortLable == "Location") {
      setToolLabel("Location");
      const sortedData =
        toolSortFlag == false
          ? allTools.sort((a, b) => a.location.localeCompare(b.location))
          : allTools.sort((a, b) => b.location.localeCompare(a.location));
      setAllTools(sortedData);
    }
    if (toolSortLable == "Age") {
      setToolLabel("Age");
      const sortedData =
        toolSortFlag == false
          ? allTools.sort((a, b) =>
              a.purchaseDate.localeCompare(b.purchaseDate)
            )
          : allTools.sort((a, b) =>
              b.purchaseDate.localeCompare(a.purchaseDate)
            );
      setAllTools(sortedData);
    }
    if (toolSortLable == "Due Date") {
      setToolLabel("Due Date");
      const sortedData =
        toolSortFlag == false
          ? allTools.sort((a, b) => a.dueDate.localeCompare(b.dueDate))
          : allTools.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
      setAllTools(sortedData);
    }
    if (toolSortLable == "Tool Number") {
      console.log("herererererere");
      setToolLabel("Tool Number");
      const sortedData =
        toolSortFlag == false
          ? allTools.sort((a, b) => a.toolNumber.localeCompare(b.toolNumber))
          : allTools.sort((a, b) => b.toolNumber.localeCompare(a.toolNumber));
      setAllTools(sortedData);
    }
    if (toolSortLable == "Checked Out") {
      console.log("herererererere");
      setToolLabel("Checked Out");
      const sortedData =
        toolSortFlag == false
          ? allTools.sort((a, b) => a.checkedOut - b.checkedOut)
          : allTools.sort((a, b) => b.checkedOut - a.checkedOut);
      setAllTools(sortedData);
    }
    if (toolSortLable == "Category") {
      setToolLabel("Category");

      const sortedData =
        toolSortFlag == false
          ? allTools.sort((a, b) => a.category.localeCompare(b.category))
          : allTools.sort((a, b) => b.category.localeCompare(a.category));
      setAllTools(sortedData);
    }
    setToolFlag(!toolSortFlag);
  };
  return (
    <section className="main-table-wrap">
      <div className="flex flex-row justify-between pb-5">
        <h2 className={`${poppins.className} font-semibold text-2xl pt-2 pb-2`}>
          Tool History
        </h2>
        {/* <button
          onClick={() => setDrawer(true)}
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
        >
          + Add Storage Location
        </button> */}
      </div>
      <form
        onSubmit={searchFormHandler}
        className="flex flex-row flex-wrap gap-5 justify-start"
      >
        <div className="flex flex-col self-start w-[300px] mb-4">
          <Select
            className="z-[50]"
            options={[
              { label: "Tool No", value: "Tool No" },
              { label: "Location", value: "Location" },
              { label: "Category", value: "Category" },
              { label: "Sub-Category", value: "Sub-Category" },
              { label: "Brand", value: "Brand" },
              { label: "Description", value: "Description" },
              { label: "Tech Assigned", value: "Tech Assigned" },
              { label: "Project", value: "Project" },
              { label: "Vehicle", value: "Vehicle" },
            ]}
            value={filterVal}
            onChange={(e) => setFilterVal(e)}
            placeholder={`Select`}
          />
        </div>
        <div className="flex flex-col self-start w-[300px] mb-4">
          <input
            type="text"
            className="rounded-[5px] border-gray-400 border-[1px] p-[7px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search By ${filterVal.value}`}
          />
        </div>
        <div className="flex flex-col self-start w-[100px] mb-4">
          <input
            className="rounded-[5px] border-orange-400 border-[1px] bg-orange-400 text-white font-semibold p-[7px]"
            type="submit"
            value={"Search"}
          />
        </div>
        {search !== "" ? (
          <div className="flex flex-col self-start w-[100px] mb-4">
            <button
              onClick={() => handleClear()}
              className="rounded-[5px] border-orange-400 border-[1px] bg-orange-400 text-white font-semibold p-[7px]"
            >
              Clear
            </button>
          </div>
        ) : null}
      </form>
      <div className="table-wrap">
        {loading == true ? (
          <p>Loading....</p>
        ) : (
          <AllToolsTable
            loading={loading}
            allTools={allTools}
            refreshData={refreshData}
            handleToolSort={(sortLabel, toolSortFlag) =>
              handleToolSorting(sortLabel, toolSortFlag)
            }
            toolAscDesc={toolFlag}
            toolLabel={toolLabel}
          />
        )}
      </div>
      {/* <StorageLocationDrawer
        addStorageLocation={addStorageLocations}
        open={drawer}
        onClose={handleCloseDrawer}
        edit={false}
      /> */}
    </section>
  );
}

export default AllTools;
