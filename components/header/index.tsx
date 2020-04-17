import React from 'react';
import Link from 'next/link';
import Styled from 'styled-components';

const A = Styled.a`
    display: block;
    padding: 48px 8px;
    color: white;
    font-size: 16px;
    text-decoration: none;
`;

const Header = (): JSX.Element => (
    <header>
        <Link href='/' passHref>
            <A>Stop and Go</A>
        </Link>
    </header>
);

export default Header;
