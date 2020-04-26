import React, { useMemo } from "react";
import { DataLoading, DataError } from "../../components";
import { useRequest } from "@umijs/hooks";
import { getTestList, IGetTestListParams } from "../../services/about";

const About = React.memo(() => {
  const { data, error, loading } = useRequest(() => getTestList({
    id: 100,
    name: "ADCD",
    age: 100
  }));

  const list = useMemo(() => {
    const isSuccessful = data && data.status === 200 && data.data.data && data.data.code === 200;
    console.log("list data:", data);
    return !isSuccessful? null: (
      <ul className="about-page-list-container">
        {data.data.data.map((item: IGetTestListParams) => (
          <li className="about-page-list-item-container">
            <div className="about-page-list-item-id">
              {item.id}
            </div>
            <div className="about-page-list-item-name">
              {item.name}
            </div>
            <div className="about-page-list-item-age">
              {item.age}
            </div>
          </li>
        ))}
      </ul>
    );
  }, [ data ]);

  console.log("render about page...");

  return (
    <div className="about-page-container">
      <h1 className="about-page-title">
        About Page.
      </h1>
      {loading && <DataLoading />}
      {error && <DataError />}
      {data  && list}
    </div>
  );
});

export default About;