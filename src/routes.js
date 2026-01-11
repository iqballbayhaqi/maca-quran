import Home from "./containers/Home";
import Menu from "./containers/MenuPage";
import Detail from "./containers/DetailPage";
import Search from "./containers/SearchPage";
import About from "./containers/AboutPage";
import Bookmark from "./containers/BookmarkPage";
import DailyAyat from "./containers/DailyAyatPage";
import ShareAyat from "./containers/ShareAyatPage";
import Memorization from "./containers/MemorizationPage";
import ReadingHistory from "./containers/ReadingHistoryPage";
import DailyTarget from "./containers/DailyTargetPage";
import Notes from "./containers/NotesPage";

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
    },
    {
        id: 6,
        name: "Bookmark",
        path: "/bookmark",
        page: <Bookmark/>,
        exact: false
    },
    {
        id: 7,
        name: "DailyAyat",
        path: "/daily-ayat",
        page: <DailyAyat/>,
        exact: false
    },
    {
        id: 8,
        name: "ShareAyat",
        path: "/share-ayat",
        page: <ShareAyat/>,
        exact: false
    },
    {
        id: 9,
        name: "Memorization",
        path: "/memorization",
        page: <Memorization/>,
        exact: false
    },
    {
        id: 10,
        name: "ReadingHistory",
        path: "/reading-history",
        page: <ReadingHistory/>,
        exact: false
    },
    {
        id: 11,
        name: "DailyTarget",
        path: "/daily-target",
        page: <DailyTarget/>,
        exact: false
    },
    {
        id: 12,
        name: "Notes",
        path: "/notes",
        page: <Notes/>,
        exact: false
    }
]

export default routes;