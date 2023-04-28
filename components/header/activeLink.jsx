import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function ActiveLink(props) {
    const { href, activeClassName, classes } = props;
    const { asPath, isReady } = useRouter();
    const [computedClassName, setComputedClassName] = useState(props.classes);

    useEffect(() => {
        if (!isReady) return;

        setComputedClassName(`${asPath ===href ? activeClassName : ''} ${classes}`);
    }, [asPath, isReady, href, activeClassName, classes]);

    return (
        <Link href={href} className={computedClassName}>{props.children}</Link>
    );
}

export default ActiveLink;
