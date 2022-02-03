import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(()=>import("./component/Home"));
const CountryDetails = lazy(()=>import("./component/CountryDetails"));


const  App:React.FC = ()=> {
  return (
   <div data-testid="app">
   <Suspense fallback={<p>Loading...</p>}>
     <BrowserRouter>
        <Switch>
           <Route exact path="/" component={Home}/>
           <Route exact path="/CountryDetails/:countryName" component={CountryDetails}/>
        </Switch>
     </BrowserRouter>
   </Suspense>
   </div>
  );
}

export default App;
