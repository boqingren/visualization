import React, { useMemo } from "react";
import { DataLoading, DataError, Table } from "../../components";
import { useRequest } from "@umijs/hooks";
// import { useTable } from "../../hooks";
import { getTestList, IGetTestListParams } from "../../services/about";

const About = React.memo(() => {
  const { data, error, loading } = useRequest(() => getTestList({
    id: 100,
    name: "ADCD",
    age: 100
  }));

  const list = useMemo(() => {
    const hasData = data && data.length > 0;
    return !hasData? null: (
      <ul className="about-page-list-container">
        {data.map((item: IGetTestListParams) => (
          <li key={item.id} className="about-page-list-item-container">
            <span className="about-page-list-item-id">
              {item.id}
            </span>
            <span className="about-page-list-item-name">
              {item.name}
            </span>
            <span className="about-page-list-item-age">
              {item.age}
            </span>
          </li>
        ))}
      </ul>
    );
  }, [ data ]);

  console.log("render about page...");
  console.log("about page error:", error);

  return (
    <div className="about-page-container">
      <h1 className="about-page-title">
        About Page.
      </h1>
      <Table />
      {loading && <DataLoading />}
      {error && <DataError />}
      {data  && list}
    </div>
  );
});

export default About;