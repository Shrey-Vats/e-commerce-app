import HeroSection from "@/components/HeroSection";
import Navbar from "@/layout/Navbar";
import { prisma } from "@/lib/prisma";

export default async function Page() {

    return (
        <div className="">
            <Navbar />
            <HeroSection />
        </div>
    )

}
