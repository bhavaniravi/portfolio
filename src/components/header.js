import React from "react"
import {
    Navbar,
    NavbarToggler,
    NavItem,
    Collapse,
    Nav,
    NavLink
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
            <Navbar className="navbar-expand-lg" light={true}>
                <div className="container box_1620">
                    <NavbarToggler araia-label="Toggle For Menu" className="navbar-toggler" onClick={this.toggle}>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>

                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar id="navbarSupportedContent">
                        <Nav className="nav navbar-nav menu_nav ml-auto" navbar>
                            {/* <MenuItem href="/" title="Home"></MenuItem> */}
                            <MenuItem target="_blank" rel="noopener noreferrer"  href="https://gumroad.com/l/LaFSj" title="Masterclass"></MenuItem>
                            <MenuItem href="/" title="About Me"></MenuItem>
                            {/* <MenuItem href="/#experience" title="Experience"></MenuItem> */}
                            <MenuItem href="/blog" title="Blogs"></MenuItem>
                            <MenuItem href="/talks" title="Talks"></MenuItem>
                           
                            {/* <MenuItem href="/resume" title="Resume"></MenuItem> */}
                            <MenuItem target="_blank" rel="noopener noreferrer" 
                                href="https://mailchi.mp/e1cea5c7347f/thelearningdev"
                                title="Newsletter"></MenuItem>
                             <MenuItem href="#contact_me" title="Contact Me"></MenuItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
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

    listenScrollEvent = e => {
        var scroll = window.scrollY;
        if (scroll >= 150) {
            this.setState({
                isScroll: true
            });
        }
        else {
            this.setState({
                isScroll: false
            });
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent)
    }

    render() {
        return (
            <header id="header_area" 
                    className={this.state.isScroll || this.props.navFixed ? 'header_area navbar_fixed' : "header_area"}
                    >
                <div className="main_menu">
                    <ExtendedNavbar></ExtendedNavbar>
                </div>
            </header>
        )
    }
}