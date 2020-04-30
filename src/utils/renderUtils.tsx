import React from "react";
import { DataLoading, DataError } from "../components";
import { TRenderWithUseRequest } from "../types";

export const renderWithUseRequest: TRenderWithUseRequest = (error, loading, element) => {
  if (error) return <DataError />;
  else if (loading) return <DataLoading />;
  return element;
};