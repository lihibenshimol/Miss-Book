const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { AppHeader } from "./cmps/app-header.jsx";
import { Home } from "./views/home.jsx";
import { About } from "./views/about.jsx";
import { BooksIndex } from './views/books-index.jsx';
import { BookDetails } from "./views/book-details.jsx";
import { BookEdit } from "./views/book-edit.jsx";
import { UserMsg } from "./cmps/user-msg.jsx"
import { AddReview } from "./cmps/add-review.jsx";

export function App() {

    return <Router>

        <section className="main-layout app">

            <AppHeader />

            <main className="full main-layout">
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<About />} path="/about" />
                    <Route element={<BooksIndex />} path="/book" />
                    <Route element={<BookEdit />} path="/book/edit"/>
                    <Route element={<BookEdit />} path="/book/edit/:bookId"/>
                    <Route element={<BookDetails />} path="/book/:bookId"/>
                    <Route element={<AddReview />} path="/book/review/:bookId"/>
                </Routes>       
            </main>
            <UserMsg />
        </section>
    </Router>
}