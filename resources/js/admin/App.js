import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./store/reducers/RootReducer";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Pages
import Dashboard from "./pages/Dashboard";
import ListPosts from "./pages/posts/Index";
import AddPosts from "./pages/posts/Add";
import EditPosts from "./pages/posts/Edit";
import ListCategories from "./pages/categories/Index";
import AddCategories from "./pages/categories/Add";
import EditCategories from "./pages/categories/Edit";
import ListTags from "./pages/tags/Index";
import AddTags from "./pages/tags/Add";
import EditTags from "./pages/tags/Edit";
import ListComments from "./pages/comments/Index";
import ListUsers from "./pages/users/Index";
import AddUsers from "./pages/users/Add";
import EditUsers from "./pages/users/Edit";
import Login from "./components/Auth/Login";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

function App() {
    const location = useLocation();
    return (
        <Provider store={store}>
            <div className={`flex h-screen w-full bg-slate-50`}>
                <Header />
                <Sidebar />
                <main
                    className={`w-full min-h-full px-5  mt-20 ${
                        location.pathname !== "/login" ? "lg:pr-64 lg:pl-4" : ""
                    }`}
                >
                    <Routes>
                        <Route exact path="/login" element={<Login />} />
                        <Route
                            exact
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            exact
                            path="/posts"
                            element={
                                <ProtectedRoute>
                                    <ListPosts />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/posts/add"
                            element={
                                <ProtectedRoute>
                                    <AddPosts />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/posts/edit/:id"
                            element={
                                <ProtectedRoute>
                                    <EditPosts />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            exact
                            path="/users"
                            element={
                                <ProtectedRoute>
                                    <ListUsers />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/users/add"
                            element={
                                <ProtectedRoute>
                                    <AddUsers />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/users/edit/:id"
                            element={
                                <ProtectedRoute>
                                    <EditUsers />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            exact
                            path="/tags"
                            element={
                                <ProtectedRoute>
                                    <ListTags />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/tags/add"
                            element={
                                <ProtectedRoute>
                                    <AddTags />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/tags/edit/:id"
                            element={
                                <ProtectedRoute>
                                    <EditTags />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            exact
                            path="/categories"
                            element={
                                <ProtectedRoute>
                                    <ListCategories />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/categories/add"
                            element={
                                <ProtectedRoute>
                                    <AddCategories />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/categories/edit/:id"
                            element={
                                <ProtectedRoute>
                                    <EditCategories />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            exact
                            path="/comments"
                            element={
                                <ProtectedRoute>
                                    <ListComments />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>

                    <Footer />
                </main>
            </div>
        </Provider>
    );
}
export default App;
