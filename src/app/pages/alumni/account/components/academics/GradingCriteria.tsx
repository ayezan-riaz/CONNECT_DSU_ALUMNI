import React, { ChangeEvent, useRef, useState } from "react";

const MyForm = () => {
  const [ScoreMode, setScoreMode] = useState("CGPA");

  const GradingCriteria = [
    {
      name: "CGPA",
      options: [2, 2.3, 3, 3.3, 3.7, 4],
    },
    {
      name: "Division",
      options: ["1st", "2nd", "3rd", "4th"],
    },
    {
      name: "Grades",
      options: ["A", "B", "C"],
    },
  ];

  function getScoreOptions() {
    return GradingCriteria.find((item) => item.name == ScoreMode)?.options;
  }

  return (
    <form>
      <select
        name="ScoreMode"
        key="ScoreMode"
        onChange={(e) => {
          setScoreMode(e.target.value);
        }}
      >
        {GradingCriteria.map((x) => (
          <option value={x.name}>{x.name}</option>
        ))}
      </select>

      <select name="Score" key="Score">
        {getScoreOptions()?.map((item:any) => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </form>
  );
};

export default MyForm;
