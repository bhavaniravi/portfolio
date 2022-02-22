import React from "react"
import {
    Navbar,
    NavbarToggler,
    NavItem,
    Collapse,
    Nav,
    NavLink, 
    Dropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
} from "reactstrap"

class MenuItem extends React.Component {
    render() {
        return (
            <NavItem>
                <NavLink target={this.props.target} href={this.props.href} rel={this.props.rel}>
                        {this.props.title}
                </NavLink>
            </NavItem>
        )
    }
}

class ExtendedNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <React.Fragment>
            <Navbar className="navbar-expand-lg" light={true}>
                <div className="container box_1620 menu_bar">
                    <NavbarToggler araia-label="Toggle For Menu" className="navbar-toggler" onClick={this.toggle}>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>

                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar id="navbarSupportedContent">
                        <Nav className="nav navbar-nav menu_nav ml-auto" navbar>
                            {/* <MenuItem href="/" title="Home"></MenuItem> */}
                            <MenuItem target="_blank" rel="noopener noreferrer"  href="https://gumroad.com/l/LaFSj" title="Masterclass"></MenuItem>
                            <MenuItem href="/" title="Home"></MenuItem>
                            <MenuItem href="/services" title="Services"></MenuItem>
                            <MenuItem href="/about-me" title="About Me"></MenuItem>
                            <MenuItem href="/blog" title="Blog"></MenuItem>
                            <MenuItem href="/talks" title="Talks"></MenuItem>
                            <MenuItem href="/projects" title="Projects"></MenuItem>            
                        </Nav>
                    </Collapse>
                </div>
                
            </Navbar>
            <section align="center">
                <a target="_blank" rel="noopener noreferrer"  href="https://gumroad.com/l/LaFSj?utm_source=website-banner&utm_medium=website&utm_campaign=website-banner">
                <marquee behavior="alternate" bgcolor="#bb3434" direction="left" height="" loop="7" scrollamount="2" scrolldelay="1" width="100%">

                <span style={{"font-size": "18px", "color": "#FFFFFF"}}> 
                    Wanna build your own Python Project? - Join 4 week PythonToProject Bootcamp
                </span>
                </marquee>
                </a>
            </section>
            </React.Fragment>
        )
    }
}

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isScroll: false
        };
    }

    // listenScrollEvent = e => {
    //     var scroll = window.scrollY;
    //     if (scroll >= 150) {
    //         this.setState({
    //             isScroll: true
    //         });
    //     }
    //     else {
    //         this.setState({
    //             isScroll: false
    //         });
    //     }
    // }

    // componentDidMount() {
    //     window.addEventListener('scroll', this.listenScrollEvent)
    // }

    render() {
        return (
            <header id="header_area" className= 'header_area navbar_fixed'>
                <div className="main_menu">
                    <ExtendedNavbar></ExtendedNavbar>
                </div>
            </header>
        )
    }
}
