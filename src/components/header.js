import React from "react"
import {Navbar, 
        NavbarBrand, 
        NavbarToggler, 
        NavItem, 
        Collapse, 
        Nav, 
        NavLink} from "reactstrap"

class MenuItem extends React.Component{
    render(){
        return (
            <NavItem>
                <NavLink href="${this.props.href}">{this.props.title}</NavLink>
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
                    {/* <img src="img/logo.png" alt=""/> */}
                    <span color="white">Bhavani Ravi</span>
                    </NavbarBrand>
                    <NavbarToggler className="navbar-toggler" onClick={this.toggle}>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar id="navbarSupportedContent">
                        <Nav className="nav navbar-nav menu_nav ml-auto" navbar>
                            <MenuItem href="/" title="Home"></MenuItem>
                            <MenuItem href="#about_me" title="About Me"></MenuItem>
                            <MenuItem href="#experience" title="Experience"></MenuItem>
                            <MenuItem href="#blogs" title="Blogs"></MenuItem>
                            <MenuItem href="#contact_me" title="Contact Me"></MenuItem>
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
            
            <header id="header_area" className={this.state.isScroll ? 'header_area navbar_fixed': "header_area"}>
                <div className="main_menu">
                    <ExtendedNavbar></ExtendedNavbar>
                </div>
            </header>
        )
    }
}