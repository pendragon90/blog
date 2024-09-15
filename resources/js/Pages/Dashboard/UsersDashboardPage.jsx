import React, { useEffect, useRef } from "react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import {
    Group,
    Table,
    Select,
    Modal,
    Button,
    Image,
    Skeleton,
    UnstyledButton,
    Input,
} from "@mantine/core";
import Pagination from "@/Components/Pagination";
import { useDisclosure } from "@mantine/hooks";
import { MdFilterListAlt, MdOutlineClear } from "react-icons/md";
import { IoPrint } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";
import CustomDatePicker from "@/Components/CustomDatePicker";
import ConfirmlEdit from "@/Components/ConfirmEdit";
import ConfirmDelete from "@/Components/ConfirmDelete";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import CreateModal from "@/Components/CreateModal";
import { Link } from "@inertiajs/inertia-react";
import CustomMonthPicker from "@/Components/CustomMonthPicker";

function UsersDashboardPage() {
    const { users, minDate, maxDate } = usePage().props;
    const { data, setData, get } = useForm({
        date: "",
        search: "",
        perpage: "20",
        sort_date: "", 
    });
    const [opened, { open, close }] = useDisclosure(false);
    const componentPdf = useRef();

    const handleFilterChange = (name, value) => {
        setData(name, value);
    };

    useEffect(() => {
        if (
            data.search !== "" ||
            data.date !== "" ||
            data.perpage !== "20" ||
            data.sort_date !== "" 
        ) {
            get("/dashboard/users", {
                preserveState: true,
                preserveScroll: true,
            });
        }
    }, [
        data.search,
        data.date,
        data.perpage,
        data.sort_date, // tambahkan ini untuk sort date
    ]);

    const handlePrint = useReactToPrint({
        content: () => componentPdf.current,
        documentTitle: "Table Absence",
    });

    const rows = users.data ? (
        users.data.map((val, index) => (
            <Table.Tr key={index}>
                <Table.Td className="px-4 py-2">{index + 1}</Table.Td>
                <Table.Td className="px-4 py-2">{val.date}</Table.Td>
                <Table.Td className="px-4 py-2">{val.name}</Table.Td>
                <Table.Td className="px-4 py-2">
                    {val.avatar && (
                    <Image src={val.avatar} width={100} height={100} />
                    )}
                </Table.Td>
                <Table.Td className="px-4 py-2">
                    <Group>
                        <ConfirmDelete
                            url={`/users/${val.slug}`}
                            val={val}
                            title="User"
                        />
                    </Group>
                </Table.Td>
            </Table.Tr>
        ))
    ) : (
        <Skeleton />
    );

    const handlePageChange = (page) => {
        get(`/dashboard/users?page=${page}`, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout>
            <Modal
                opened={opened}
                onClose={close}
                title="Filter Table"
                centered
            >
                <div className="flex flex-col gap-5">
                    <CustomDatePicker
                        value={data.date ? new Date(data.date) : null}
                        onChange={(value) => handleFilterChange("date", value)}
                        label="Date input"
                        placeholder="Date input"
                    />

                    <CustomMonthPicker
                       minDate={minDate}
                       maxDate={maxDate}
                       url='/dashboard/users'
                    />

                </div>
            </Modal>

            <div className="flex justify-between items-end mb-5">
        <Input
          value={data.search}
          onChange={e => setData('search', e.target.value)}
          placeholder="Search..."
          leftSection={<CiSearch className="h-4" />}
        />

                <div className="flex gap-3 items-end">
                <Select
                    label="Pilih jumlah data perhalaman"
                    placeholder=""
                    data={[10, 20, 50, 100].map((value) => ({
                        value: value.toString(),
                        label: value.toString(),
                    }))}
                    value={data.perpage}
                    onChange={(e) => handleFilterChange("perpage", e)}
                />
                    <Button
                        leftSection={<IoPrint className="h-5" />}
                        variant="default"
                        onClick={handlePrint}
                    >
                        Print
                    </Button>
                    <Link href="/dashboard/users">
                    <Button
                        leftSection={<MdOutlineClear className="h-5" />}
                        variant="default"
                    >
                        Clear Filter
                    </Button>
                    </Link>
                    <Button
                        onClick={open}
                        leftSection={<MdFilterListAlt className="h-5" />}
                        variant="default"
                    >
                        Filter
                    </Button>
                </div>
            </div>
            <div ref={componentPdf} className="max-w-sm">
                <Table
                    stickyHeader
                    stickyHeaderOffset={0}
                     withTableBorder withColumnBorders
                    className="bg-white"
                >
                    <Table.Thead className="bg-gray-50">
                        <Table.Tr>
                            <Table.Th className="px-4 py-2 text-left uppercase tracking-wider whitespace-nowrap">
                                No
                            </Table.Th>
                            <Table.Th className="hover:bg-gray-50 cursor-pointer px-4 py-2 text-left uppercase tracking-wider whitespace-nowrap">
                                <button
                                    className="flex items-center justify-between w-full"
                                    onClick={() => {
                                        handleFilterChange(
                                            "sort_date",
                                            data.sort_date === "asc"
                                                ? "desc"
                                                : "asc",
                                        );
                                    }}
                                >
                                    Date
                                    {data.sort_date === "asc" ? (
                                        <IoIosArrowDown className="h-4 ml-2" />
                                    ) : (
                                        <IoIosArrowUp className="h-4 ml-2" />
                                    )}
                                </button>
                            </Table.Th>
                            <Table.Th className="px-4 py-2 text-left uppercase tracking-wider whitespace-nowrap">
                                Name
                            </Table.Th>
                            <Table.Th className="px-4 py-2 text-left uppercase tracking-wider whitespace-nowrap">
                                Avatar
                            </Table.Th>
                            <Table.Th className="px-4 py-2 text-left uppercase tracking-wider whitespace-nowrap">
                                Opsi
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </div>
            <Pagination meta={users.meta} onPageChange={handlePageChange} />
        </DashboardLayout>
    );
}

export default UsersDashboardPage;
