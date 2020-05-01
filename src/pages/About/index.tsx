import React, { useMemo } from "react";
import { Table } from "../../components";
import { getTestList } from "../../services/about";
import { useTable } from "../../hooks";
import { renderUtils } from "../../utils";

const { renderWithUseRequest } = renderUtils;

const About = React.memo(() => {
  const { error, loading, state, changePage } = useTable(getTestList);
  
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
      <h1 className="about-page-title" onClick={() => changePage({ pageNum: 2 })}>
        About Page.
      </h1>
      {renderWithUseRequest(error, loading, (
        <Table
          columns={columns}
          dataSource={state.tableList}
          pagination={state.pagination}
          changePage={changePage}
        />
      ))}
    </div>
  );
});

export default About;