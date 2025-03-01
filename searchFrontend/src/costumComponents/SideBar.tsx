// import { Link } from "react-router-dom";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { Home, Search, History } from "lucide-react";
// import { useState } from "react";
// import {ModeToggle} from "@/components/ui/mode-toggle.tsx";
//
// const Sidebar = () => {
//     const [open, setOpen] = useState(false);
//
//     return (
//         <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//                 <Button variant="outline" className="fixed top-4 left-4 cursor-pointer">
//                     ☰
//                 </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="w-64 p-4">
//                 <h2 className="text-lg font-semibold mb-4">Menu</h2>
//                 <Separator className="mb-4"/>
//                 <nav className="space-y-2">
//                     <Link
//                         to="/"
//                         className="flex items-center p-2 rounded cursor-pointer transition-colors hover:bg-muted hover:text-foreground"
//                     >
//                         <Home className="w-5 h-5 mr-2" /> Home
//                     </Link>
//
//                     <Link
//                         to="/search"
//                         className="flex items-center p-2 rounded cursor-pointer transition-colors hover:bg-muted hover:text-foreground"
//                     >
//                         <Search className="w-5 h-5 mr-2" /> Search
//                     </Link>
//
//                     <Link
//                         to="/search-history"
//                         className="flex items-center p-2 rounded cursor-pointer transition-colors hover:bg-muted hover:text-foreground"
//                     >
//                         <History className="w-5 h-5 mr-2" /> Search History
//                     </Link>
//
//                 </nav>
//                 <div className="pt-4 border-t border-muted mt-4">
//                     <ModeToggle/>
//                 </div>
//             </SheetContent>
//         </Sheet>
//     );
// };
//
// export default Sidebar;

import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Home, Search, History } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle.tsx";
import {DialogTitle} from "@radix-ui/react-dialog";

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="fixed top-4 left-4 cursor-pointer">
                    ☰
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
                {/* 🔹 Add DialogTitle for accessibility */}
                <DialogTitle className="sr-only">Menu</DialogTitle>

                {/* 🔥 Flex container for Menu and Toggle */}
                <div className="flex items-center mb-4 gap-4">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <ModeToggle />
                </div>

                <Separator className="mb-4"/>
                <nav className="space-y-2">
                    <Link
                        to="/"
                        className="flex items-center p-2 rounded cursor-pointer transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <Home className="w-5 h-5 mr-2" /> Home
                    </Link>

                    <Link
                        to="/search"
                        className="flex items-center p-2 rounded cursor-pointer transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <Search className="w-5 h-5 mr-2" /> Search
                    </Link>

                    <Link
                        to="/search-history"
                        className="flex items-center p-2 rounded cursor-pointer transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <History className="w-5 h-5 mr-2" /> Search History
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default Sidebar;
