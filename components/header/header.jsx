import Link from 'next/link';
import ActiveLink from './activeLink';
import classes from './Header.module.css';

function Header() {
    return (
        <header className="py-5 bg-fuchsia-800 text-white text-sm uppercase">
            <div className={`${classes.container} container flex items-center`}>
                <Link href="/">Strona główna</Link>
                <nav className={`${classes.nav}`}>
                    <ActiveLink activeClassName="bg-fuchsia-500" classes="px-3 py-1.5 mr-5 tracking-wider last:m-0 rounded-lg hover:bg-fuchsia-400 transition-color duration-200" href="/lists">listy</ActiveLink>
                    <ActiveLink activeClassName="bg-fuchsia-500" classes="px-3 py-1.5 mr-5 tracking-wider last:m-0 rounded-lg hover:bg-fuchsia-400 transition-color duration-200" href="/new-list">Dodaj listę</ActiveLink>
                    <ActiveLink activeClassName="bg-fuchsia-500" classes="px-3 py-1.5 mr-5 tracking-wider last:m-0 rounded-lg hover:bg-fuchsia-400 transition-color duration-200" href="/products">produkty</ActiveLink>
                    <ActiveLink activeClassName="bg-fuchsia-500" classes="px-3 py-1.5 mr-5 tracking-wider last:m-0 rounded-lg hover:bg-fuchsia-400 transition-color duration-200" href="/new-product">Dodaj produkt</ActiveLink>
                    <ActiveLink activeClassName="bg-fuchsia-500" classes="px-3 py-1.5 mr-5 tracking-wider last:m-0 rounded-lg hover:bg-fuchsia-400 transition-color duration-200" href="/products/types">typy</ActiveLink>
                </nav>
            </div>
        </header>
    );
}

export default Header;
