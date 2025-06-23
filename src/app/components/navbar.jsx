
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export function NavbarDefault({icon}) {
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="/">
        <img src={icon || null} className="mr-3 h-6 h-[6vh]" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button>Login</Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#">Home</NavbarLink>
        <NavbarLink href="#">Courses</NavbarLink>
        <NavbarLink href="#">Compiler</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

