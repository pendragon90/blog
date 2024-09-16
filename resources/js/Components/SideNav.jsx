import { useEffect, useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { TbCategory } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";
import {
    Button,
    Group,
    Modal,
    Input,
    CloseButton,
    Accordion,
} from "@mantine/core";
import { CiDark, CiSearch } from "react-icons/ci";
import Profile from "./Profile";
import axios from "axios";
import { BsBookmarkFill } from "react-icons/bs";
import { RiArticleLine, RiHome4Line } from "react-icons/ri";

export default function SideNav({ user }) {
    const [opened, setOpened] = useState(false);
    const [searchOpened, { open, close }] = useDisclosure(false);
    const ref = useClickOutside(() => setOpened(false));
    const [search, setSearch] = useState('');
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(()=> {
        const fetchCategories = async() => {
            try {
                const res = await axios.get("/api/categories");
                setCategories(res.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCategories()
    },[])

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (search !== "") {
                try {
                    const res = await axios.get("/api/articles/search", {
                        params: { search },
                    });
                    setArticles(res.data.articles);
                } catch (error) {
                    console.error(error);
                }
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [search]);

    console.log(categories)

    return (
        <nav>
            <header className="flex justify-between fixed top-0 left-0 right-0 z-40 bg-white px-5 py-3">
                <h1 className="text-2xl font-sans font-bold">Dashboard</h1>
                <button
                    onClick={() => setOpened(true)}
                    aria-controls="sidebar-multi-level-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
                >
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        ></path>
                    </svg>
                </button>
                <Modal lockScroll={false} opened={searchOpened} onClose={close} title="Search">
                    {/* <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        leftSection={<CiSearch className="h-4" />}
                        rightSection={
                            <CloseButton
                                aria-label="Clear input"
                                onClick={() => setSearch('')} 
                                style={{ display: search ? undefined : "none" }}
                            />
                        }
                    /> */}
                              <div className="relative flex items-center">
    <CiSearch className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
    <input
    value={search}
    onChange={e => setSearch(e.target.value)}
        type="search"
        id="default-search"
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search..."
    />
</div>
                    <div className="mt-5">
                        {articles.length > 0 ? (
                            <div className="flex flex-col gap-y-2">
                                {articles.map((article) => (
                                    <Link
                                        className="p-3 border-b border-b-gray-300"
                                        key={article.slug}
                                        href={`/articles/${article.slug}`}
                                    >
                                        {article.title}
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <h1 className="text-center">No results found...</h1>
                        )}
                    </div>
                </Modal>
                <Group>
                    <Button
                        variant="default"
                        onClick={open}
                        leftSection={<CiSearch className="h-4" />}
                    >
                        Search...
                    </Button>
                    <Group style={{ zIndex: 999 }}>
                        <Link href="/articles-saved">
                        <BsBookmarkFill className="h-8" />
                        </Link>
                        <CiDark className="h-8" />
                        <Group>
                            {user ? (
                                <Profile user={user} />
                            ) : (
                                <Group>
                                    <Link href="/login">
                                        <Button variant="light">Login</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button variant="outline">
                                            Register
                                        </Button>
                                    </Link>
                                </Group>
                            )}
                        </Group>
                    </Group>
                </Group>
            </header>

            <aside
                id="sidebar-multi-level-sidebar"
                className={`bg-white fixed top-14 left-0 z-40 w-64 h-screen transition-transform ${opened ? "" : "-translate-x-full"} sm:translate-x-0 md:translate-x-0`}
                aria-label="Sidebar"
                ref={ref}
            >
                <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
                    <div className="font-medium hover:bg-gray-50 p-4">
                        <Link href="/" className="flex gap-4 items-center">
                            <RiHome4Line />
                            Home
                        </Link>
                    </div>

                    <Accordion variant="default">
  <Accordion.Item style={{border:'none'}} value="category">
    <Accordion.Control  icon={<TbCategory />}>Category</Accordion.Control>
    {categories.length > 0 ? (
      categories.map(category => (
        <Accordion.Panel key={category.id}>
            <Link href={`/articles/categories/${category.slug}`}>{category.name}</Link>
        </Accordion.Panel>
      ))
    ) : ""}
  </Accordion.Item>
</Accordion> 
                    <div className="font-medium hover:bg-gray-50 p-4">
                    <Link href="/articles/top-like" className="flex gap-4 items-center">
                        <RiArticleLine />
                            Top Liked
                        </Link>
                    </div>
                    <div className="font-medium hover:bg-gray-50 p-4">
                        <Link href="/articles/popular" className="flex gap-4 items-center">
                        <RiArticleLine />
                           Popular
                        </Link>
                    </div>
         
                </div>
            </aside>
        </nav>
    );
}
