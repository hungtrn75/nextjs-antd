import React from "react";
import ZipItem from "../zips/ZipItem";
import { Spin } from "antd";

export default function Pagination({ zips, isLoading }) {
  return (
    <div>
      <ul className="contacts">
        {zips.map((zip, index) => (
          <li key={index}>
            <ZipItem {...zip} />
          </li>
        ))}
      </ul>
    </div>
  );
}
