import Home from "./containers/Home";
import Menu from "./containers/MenuPage";
import Detail from "./containers/DetailPage";
import Search from "./containers/SearchPage";
import About from "./containers/AboutPage";

const routes = [
    {
        id: 1,
        name: "Home",
        path: "/",
        page: <Home/>,
        exact: true
    },
    {
        id: 2,
        name: "Menu",
        path: "/menu",
        page: <Menu/>,
        exact: false
    },
    {
        id: 3,
        name: "Detail",
        path: "/surah/:id",
        page: <Detail/>,
        exact: false
    },
    {
        id: 4,
        name: "Search",
        path: "/search",
        page: <Search/>,
        exact: false
    },
    {
        id: 5,
        name: "About",
        path: "/about",
        page: <About/>,
        exact: false
    }
]

export default routes;