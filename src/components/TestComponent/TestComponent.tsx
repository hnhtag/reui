import React from "react";

import { TestComponentProps } from "./TestComponent.types";

import styles from "./testComponent.module.scss";

const TestComponent: React.FC<TestComponentProps> = ({ theme }) => (
  <div
    data-testid="test-component"
    className={[
      styles.testComponent,
      (theme === "secondary" && styles.testComponentSecondary) || "",
    ].join(" ")}
  >
    <h1 className="heading">I'm the test component</h1>
  </div>
);

export default TestComponent;
