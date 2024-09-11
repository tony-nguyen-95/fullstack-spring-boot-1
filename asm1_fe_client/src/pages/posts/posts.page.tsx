import React from "react";
import { Header, PostsView } from "../../views";
import { observer } from "mobx-react";

type Props = {};

export const Posts: React.FC<Props> = observer((props) => {
  return (
    <div>
      <Header />
      <PostsView />
    </div>
  );
});
