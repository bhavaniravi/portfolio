import React from "react"
import {Navbar, 
        NavbarToggler, 
        NavItem,
        NavbarBrand, 
        Collapse, 
        Nav, 
        NavLink} from "reactstrap"

class MenuItem extends React.Component{
    render(){
        return (
            <NavItem>
                <NavLink target={this.props.target} href={this.props.href}>{this.props.title}</NavLink>
            </NavItem>
        )}
}

class ExtendedNavbar extends React.Component{
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

    render(){
        return (
            <Navbar className="navbar-expand-lg" light={true}>
                <div className="container box_1620">
                    <NavbarBrand href="index.html">
                        {/* <img src="img/preview_icon/favicon.ico" alt=""/> */}
                    </NavbarBrand>
                    <NavbarToggler className="navbar-toggler" onClick={this.toggle}>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>

                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar id="navbarSupportedContent">
                        <Nav className="nav navbar-nav menu_nav ml-auto" navbar>
                            <MenuItem href="/" title="Home"></MenuItem>
                            <MenuItem href="/#about_me" title="About Me"></MenuItem>
                            <MenuItem href="/#experience" title="Experience"></MenuItem>
                            <MenuItem target="_blank" href="https://medium.com/@bhavaniravi" title="Blogs"></MenuItem>
                            <MenuItem href="/resume" title="Resume"></MenuItem>
                            {/* <MenuItem href="#contact_me" title="Contact Me"></MenuItem> */}
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        )
    }
}

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isScroll: false
        };
      }

    listenScrollEvent = e => {
        var scroll = window.scrollY; 
        if (scroll >= 150 ) {
            this.setState({
                isScroll: true
            });
        }
        else{
            this.setState({
                isScroll: false
            });
        }
      }
    
      componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent)
      }

    render(){
        return (
            // <header id="header_area" className='header_area navbar_fixed'></header>
            <header id="header_area" className={this.state.isScroll || this.props.navFixed ? 'header_area navbar_fixed': "header_area"}>
                <div className="main_menu">
                    <ExtendedNavbar></ExtendedNavbar>
                </div>
            </header>
        )
    }
}