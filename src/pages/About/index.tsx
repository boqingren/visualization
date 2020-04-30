import React, { useMemo } from "react";
import { DataLoading, DataError, Table } from "../../components";
import { useRequest } from "@umijs/hooks";
// import { useTable } from "../../hooks";
import { getTestList } from "../../services/about";

const About = React.memo(() => {
  const { data, error, loading } = useRequest(() => getTestList({
    id: 100,
    name: "ADCD",
    age: 100
  }));
  
  const columns = useMemo(() => [{
    title: "id",
    dataIndex: "id",
    key: "id"
  }, {
    title: "name",
    dataIndex: "name",
    key: "name"
  }, {
    title: "age",
    dataIndex: "age",
    key: "age"
  }], []);

  console.log("render about page...");

  return (
    <div className="about-page-container">
      <h1 className="about-page-title">
        About Page.
      </h1>
      {loading && <DataLoading />}
      {error && <DataError />}
      {data  && <Table columns={columns} dataSource={data} />}
    </div>
  );
});

export default About;