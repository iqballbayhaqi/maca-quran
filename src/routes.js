import Home from "./containers/Home";
import Menu from "./containers/MenuPage";
import Detail from "./containers/DetailPage";

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
    }
]

export default routes;