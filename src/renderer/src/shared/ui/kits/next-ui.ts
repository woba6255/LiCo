export {
    Switch,
    Divider,
    Button,
    Input,
    NextUIProvider as UIProvider,
    Tabs,
    Tab,
    Listbox,
    ListboxItem,
    ListboxSection,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Tooltip,
    Spinner,
} from '@nextui-org/react'

import {
    Dropdown as DropdownRoot,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react'

const Dropdown = {
    Root: DropdownRoot,
    Item: DropdownItem,
    Menu: DropdownMenu,
    Trigger: DropdownTrigger,
}

import {
    Navbar as NavbarRoot,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from '@nextui-org/react'

const Navbar = Object.assign({
    Brand: NavbarBrand,
    Content: NavbarContent,
    Item: NavbarItem,
    MenuToggle: NavbarMenuToggle,
    Menu: NavbarMenu,
    MenuItem: NavbarMenuItem
}, NavbarRoot)

import {
    Select as SelectRoot,
    SelectItem,
    SelectSection,
} from '@nextui-org/react'

const Select = {
    Root: SelectRoot,
    Item: SelectItem,
    Section: SelectSection,
}

import {
    Modal as ModalRoot,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@nextui-org/react'


const Modal = Object.assign({
    Content: ModalContent,
    Header: ModalHeader,
    Body: ModalBody,
    Footer: ModalFooter,
}, ModalRoot)

export {
    Dropdown,
    Navbar,
    Select,
    Modal,
}
