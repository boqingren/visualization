import React from "react";
import { DataLoading, DataError } from "../components";

export const renderWithUseRequest: (error: any, loading: any, element: React.ReactElement) => React.ReactElement = (error, loading, element) => {
  if (error) return <DataError />;
  else if (loading) return <DataLoading />;
  return element;
};