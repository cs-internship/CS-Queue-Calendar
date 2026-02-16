const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <a
            href="https://github.com/cs-internship"
            className={"page-footer"}
            target="_blank"
            rel="noreferrer"
        >
            &copy; CS Internship {currentYear}
        </a>
    );
};

export default Footer;
