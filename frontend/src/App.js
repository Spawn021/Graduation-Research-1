import React from 'react';
import { Navigate } from 'react-router-dom';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';

function App() {
   return (
      <Router>
         <div className="App">
            <Routes>
               {privateRoutes.map((route, index) => {
                  const Page = route.component;
                  let Layout = DefaultLayout;

                  if (route.layout) {
                     Layout = route.layout;
                  } else if (route.layout === null) {
                     Layout = Fragment;
                  }

                  return (
                     <Route
                        key={index}
                        path={route.path}
                        element={
                           <Layout>
                              <Page />
                           </Layout>
                        }
                     >
                        {route.children &&
                           route.children.map((childRoute, childIndex) => (
                              <Route
                                 key={childIndex}
                                 path={childRoute.path}
                                 element={
                                    <Layout>
                                       <Page />
                                    </Layout>
                                 }
                              />
                           ))}
                     </Route>
                  );
               })}
               {publicRoutes.map((route, index) => {
                  const Page = route.component;
                  let Layout = DefaultLayout;
                  if (route.layout) {
                     Layout = route.layout;
                  } else if (route.layout === null) {
                     Layout = Fragment;
                  }

                  return (
                     <Route
                        key={index}
                        path={route.path}
                        element={
                           <Layout>
                              <Page />
                           </Layout>
                        }
                     >
                        {route.children &&
                           route.children.map((childRoute, childIndex) => (
                              <Route
                                 key={childIndex}
                                 path={childRoute.path}
                                 element={
                                    <Layout>
                                       <Page />
                                    </Layout>
                                 }
                              />
                           ))}
                     </Route>
                  );
               })}
            </Routes>
         </div>
      </Router>
   );
}

export default App;
