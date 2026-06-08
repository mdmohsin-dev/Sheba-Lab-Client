import { PublicFooter } from "@/components/modules/shared/PublicFooter";
import { PublicNavbar } from "@/components/modules/shared/PublicNavbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <PublicNavbar />
            {children}
            <PublicFooter />
        </div>
    );

};

export default CommonLayout;