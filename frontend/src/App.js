import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsBrowser from "./components/SpotsBrowser";
import SpotDetail from "./components/SpotDetail";
import ManageListings from "./components/ManageListings";
import ManageReviews from "./components/ManageReviews";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' exact>
            <SpotsBrowser />
          </Route>
          <Route path='/spots/:id'>
            <SpotDetail />
          </Route>
          <Route path='/users/:id/spots'>
          <ManageListings />
        </Route>
          <Route path='/users/:id/reviews'>
          <ManageReviews />
        </Route>
         
        </Switch>
      )}
    </>
  );
}

export default App;