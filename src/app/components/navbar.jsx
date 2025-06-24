import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export function NavbarDefault({icon}) {
  return (
    <Navbar fluid rounded className="px-4 lg:px-6">
      <NavbarBrand href="/">
        <img src={icon || null} className="mr-3 h-6 lg:h-[6vh] w-auto" alt="Logo" />
        <span className="self-center whitespace-nowrap text-lg lg:text-xl font-semibold dark:text-white"></span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button className="bg-[rgba(65,175,255,1)] text-white text-sm lg:text-base px-3 lg:px-4 py-2" href="/signin">Login</Button>
        <NavbarToggle className="lg:hidden" />
      </div>
      <NavbarCollapse className="text-white px-4 lg:px-20">
        <NavbarLink className="text-black mx-2 lg:mx-7 text-base lg:text-lg font-poppins font-bold" href="/">Home</NavbarLink>
        <NavbarLink className="text-black mx-2 lg:mx-7 text-base lg:text-lg font-poppins font-bold" href="#">Courses</NavbarLink>
        <NavbarLink className="text-black mx-2 lg:mx-7 text-base lg:text-lg font-poppins font-bold" href="#">Compiler</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

