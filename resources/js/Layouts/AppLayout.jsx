import React from "react";
import Footer from "../Components/Footer/Footer";
import SideNav from "@/Components/SideNav";
import PopularArticles from "@/Components/PopularArticles";
import {  Container } from "@mantine/core";


function AppLayout({ children,user }) {
    
    return (
        <Container className="bg-primary" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <SideNav user={user} />
            <section className="lg:ml-10 lg:mr-20 lg:mt-16 mt-10 flex-grow flex">
                {/* Container utama untuk konten */}
                <Container size="responsive" className="w-full">
                {children}
                </Container>
            </section>
            <Footer />
            {/* Footer */}
            {/* Container tetap di sebelah kanan untuk artikel populer */}
            <Container className="fixed top-16 right-0 z-50 h-screen" size="xs" style={{ width: "23%" }}>
                <PopularArticles /> 
            </Container>
        </Container>
    );
}

export default AppLayout;
