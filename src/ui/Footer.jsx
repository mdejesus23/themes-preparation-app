function Footer() {
  return (
    <footer className="mt-16 w-full border-t border-borderColor pt-6 text-center text-textSecondary">
      <p className="text-xs">
        &copy; {new Date().getFullYear()} Themes Preparation App. All trademarks
        and content belong to their respective owners.
      </p>
    </footer>
  );
}

export default Footer;
