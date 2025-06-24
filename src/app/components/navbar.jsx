
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export function NavbarDefault({icon}) {
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="/">
        <img src={icon || null} className="mr-3 h-6 h-[6vh]" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button className="bg-[rgba(65,175,255,1)] text-white" href="/signin">Login</Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse className="text-white px-20 ">
        <NavbarLink className="text-black mx-7 text-lg font-poppins font-bold" href="/">Home</NavbarLink>
        <NavbarLink className="text-black mx-7 text-lg font-poppins font-bold" href="#">Courses</NavbarLink>
        <NavbarLink className="text-black mx-7 text-lg font-poppins font-bold" href="#">Compiler</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

