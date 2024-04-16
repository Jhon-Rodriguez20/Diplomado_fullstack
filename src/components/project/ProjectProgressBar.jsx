import { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

export const ProjectProgressBar = ({ numberProgress }) => {
  const [numberProgressProject, setNumberProgressProject] = useState(0);

  useEffect(() => {
    if (numberProgress !== undefined) {
      setNumberProgressProject(numberProgress);
    }
  }, [numberProgress]);

  let progressBarVariant = "danger";

  if (numberProgressProject >= 30 && numberProgressProject < 70) {
    progressBarVariant = "warning"; // Amarillo
  } else if (numberProgressProject >= 70) {
    progressBarVariant = "success"; // Verde
  }
  return (
    <ProgressBar
      variant={progressBarVariant}
      now={numberProgressProject}
      label={`${numberProgressProject}%`}
    />
  );
};
