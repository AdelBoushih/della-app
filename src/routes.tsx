import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { HomeView, DocumentView, PlaybookView, AnswersView } from "./views/";

const Routes: React.SFC = () => (
  <Switch>
    <Route exact path="/" component={HomeView} />
    <Route exact path="/documents" component={DocumentView} />
    <Route exact path="/playbooks" component={PlaybookView} />
    <Route
      exact
      path="/documents/:documentId/answers"
      component={AnswersView}
    />

    <Route component={() => <div>View Not Found</div>} />
  </Switch>
);

export default Routes;
