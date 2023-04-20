import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function ActiveLink(props) {
    const { asPath, isReady } = useRouter();
    const [computedClassName, setComputedClassName] = useState(props.classes);

    useEffect(() => {
        if (!isReady) return;

        setComputedClassName(`${asPath === props.href ? props.activeClassName : ''} ${props.classes}`);
    }, [asPath, isReady]);

    return (
        <Link href={props.href} className={computedClassName}>{props.children}</Link>
    );
}

export default ActiveLink;
