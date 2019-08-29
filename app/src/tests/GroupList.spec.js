import React from "react";
import axios from "axios";
import { getUrl } from "../utils/api.utils";
import MockAdapter from "axios-mock-adapter";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import GroupList from "../Components/GroupList";
import { act } from "react-dom/test-utils";

test("displays table data", async () => {
  const mock = new MockAdapter(axios);
  const url = getUrl();
  let node;

  mock.onGet(`${url}/groups`).reply(200, [
    {
      id: 1,
      name: "testName",
      address: "testAddress",
      city: "testCity",
      state: "testState",
      country: "testCountry"
    }
  ]);

  await act(async () => {
    node = render(<GroupList />);
  });

  const { getByText } = node;

  expect(getByText("testName")).toBeTruthy();
  expect(getByText("testAddress")).toBeTruthy();
  expect(getByText("testCity")).toBeTruthy();
  expect(getByText("testState")).toBeTruthy();
  expect(getByText("testCountry")).toBeTruthy();
});
