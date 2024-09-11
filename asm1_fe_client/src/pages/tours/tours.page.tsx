import React from "react";
import { Header, ToursView } from "../../views";
import { observer } from "mobx-react";

type Props = {};

export const Tours: React.FC<Props> = observer((props) => {
  return (
    <div>
      <Header />
      <ToursView />
    </div>
  );
});
