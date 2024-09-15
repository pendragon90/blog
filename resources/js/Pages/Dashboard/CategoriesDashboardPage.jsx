import React, { useEffect, useRef } from "react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import {
    Group,
    Table,
    Select,
    Modal,
    Button,
    Skeleton,
    Input,
} from "@mantine/core";
import Pagination from "@/Components/Pagination";
import { useDisclosure } from "@mantine/hooks";
import { MdFilterListAlt, MdOutlineClear } from "react-icons/md";
import { IoPrint } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";
import ConfirmlEdit from "@/Components/ConfirmEdit";
import ConfirmDelete from "@/Components/ConfirmDelete";
import DashboardLayout from "@/Layouts/DashboardLayout";
import CreateModal from "@/Components/CreateModal";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { Link } from "@inertiajs/inertia-react";

function CategoriesDashboardPage() {
    const { categories } = usePage().props;
    const { data, setData, get } = useForm({
        search: "",
       
        perpage: "20",
    });
    const [opened, { open, close }] = useDisclosure(false);
    const componentPdf = useRef();

    console.log(categories)

    const handleFilterChange = (name, value) => {
        setData(name, value);
    };

    useEffect(() => {
        if (
            data.search !== "" ||
            data.perpage !== "20"
        ) {
            get("/dashboard/categories", {
                preserveState: true,
                preserveScroll: true,
            });
        }
    }, [
        data.search,
        data.perpage,
    ]);

    const handlePrint = useReactToPrint({
        content: () => componentPdf.current,
        documentTitle: "Table Absence",
    });

    const rows = categories.data ? (
        categories.data.map((val, index) => (
            <Table.Tr key={index}>
                <Table.Td className="px-4 py-2">{index + 1}</Table.Td>
                <Table.Td className="px-4 py-2">{val.name}</Table.Td>
                <Table.Td className="px-4 py-2">
                    <Group>
                        <ConfirmlEdit
                            url={`/dashboard/categories/${val.slug}`}
                            val={val}
                            title="Category"
                        />
                        <ConfirmDelete
                            url={`/dashboard/categories/${val.slug}`}
                            val={val}
                            title="Category"
                        />
                    </Group>
                </Table.Td>
            </Table.Tr>
        ))
    ) : (
        <Skeleton />
    );

    const handlePageChange = (page) => {
        get(`/dashboard/categories?page=${page}`, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout>

<div className="flex justify-between items-end mb-5">
            <div className="flex gap-3 items-end">
          <CreateModal
          title='Category'
            url="/dashboard/categories"
            icon={<IoMdAdd className="h-4" />}
          />
        <Input
          value={data.search}
          onChange={e => setData('search', e.target.value)}
          placeholder="Search..."
          leftSection={<CiSearch className="h-4" />}
        />
                
          </div>

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
                    <Link href="/dashboard/categories">
                    <Button
                        leftSection={<MdOutlineClear className="h-5" />}
                        variant="default"
                    >
                        Clear Filter
                    </Button>
                    </Link>
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
                            
                            <Table.Th className="px-4 py-2 text-left uppercase tracking-wider whitespace-nowrap">
                                Title
                            </Table.Th>
                            
                            <Table.Th className="px-4 py-2 text-left uppercase tracking-wider whitespace-nowrap">
                                Opsi
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </div>
            <Pagination meta={categories.meta} onPageChange={handlePageChange} />
        </DashboardLayout>
    );
}

export default CategoriesDashboardPage;
