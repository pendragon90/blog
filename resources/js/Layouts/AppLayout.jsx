import React from "react";
import Footer from "../Components/Footer/Footer";

import SideNav from "@/Components/SideNav";
import Profile from "@/Components/Profile";
import PopularArticles from "@/Components/PopularArticles";
import { Button, Container, Group, Input } from "@mantine/core";

function AppLayout({ children, user }) {
    return (
        <>
            <SideNav user={user} />
            <div className="lg:ml-64 lg:mt-16 mt-10 flex">
                <Container size="responsive">
                    
                    {children}
                </Container>

                <Container size="responsive" style={{ minWidth: "20%" }}>
                  
                    <PopularArticles /> 
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default AppLayout;
